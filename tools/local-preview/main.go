// A dependency-free local server for reviewing Biovent's exported website.
package main

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"mime"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"time"
)

func main() {
	mime.AddExtensionType(".mp4", "video/mp4")
	mime.AddExtensionType(".webm", "video/webm")
	mime.AddExtensionType(".woff2", "font/woff2")
	mime.AddExtensionType(".vtt", "text/vtt; charset=utf-8")
	executable, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	defaultRoot := filepath.Join(filepath.Dir(executable), "site")
	rootFlag := flag.String("root", defaultRoot, "Exported site directory")
	port := flag.Int("port", 8765, "Local port; 0 selects an available port")
	noBrowser := flag.Bool("no-browser", false, "Do not open the browser")
	flag.Parse()
	root, err := filepath.Abs(*rootFlag)
	if err != nil {
		log.Fatal(err)
	}
	root, err = filepath.EvalSymlinks(root)
	if err != nil {
		log.Fatal("Site folder not found. Extract the entire ZIP first: ", err)
	}
	if _, err = os.Stat(filepath.Join(root, "tr", "index.html")); err != nil {
		log.Fatal("Site files are missing. Extract the entire ZIP before starting.")
	}
	listener, err := net.Listen("tcp4", fmt.Sprintf("127.0.0.1:%d", *port))
	if err != nil && *port == 8765 {
		listener, err = net.Listen("tcp4", "127.0.0.1:0")
	}
	if err != nil {
		log.Fatal(err)
	}
	address := "http://" + listener.Addr().String()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Cache-Control", "no-store")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		if r.URL.Path == "/__preview/status" {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			if r.Method != http.MethodHead {
				json.NewEncoder(w).Encode(map[string]any{"ready": true, "mode": "local-draft", "localOnly": true})
			}
			return
		}
		if r.URL.Path == "/" {
			http.Redirect(w, r, "/tr/", http.StatusFound)
			return
		}
		missing := func() {
			data, readErr := os.ReadFile(filepath.Join(root, "404.html"))
			if readErr != nil {
				http.NotFound(w, r)
				return
			}
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.Header().Set("Content-Length", fmt.Sprint(len(data)))
			w.WriteHeader(http.StatusNotFound)
			if r.Method != http.MethodHead {
				w.Write(data)
			}
		}
		if strings.ContainsRune(r.URL.Path, '\x00') || strings.Contains(r.URL.Path, "\\") {
			http.Error(w, "Invalid path", http.StatusBadRequest)
			return
		}
		for _, part := range strings.Split(r.URL.Path, "/") {
			if part == ".." || strings.HasPrefix(part, ".") {
				missing()
				return
			}
		}
		candidate := filepath.Join(root, filepath.FromSlash(strings.TrimPrefix(r.URL.Path, "/")))
		resolved, err := filepath.EvalSymlinks(candidate)
		if err != nil {
			missing()
			return
		}
		relative, err := filepath.Rel(root, resolved)
		if err != nil || relative == ".." || strings.HasPrefix(relative, ".."+string(os.PathSeparator)) {
			missing()
			return
		}
		info, err := os.Stat(resolved)
		if err != nil {
			missing()
			return
		}
		if info.IsDir() {
			if !strings.HasSuffix(r.URL.Path, "/") {
				target := r.URL.Path + "/"
				if r.URL.RawQuery != "" {
					target += "?" + r.URL.RawQuery
				}
				http.Redirect(w, r, target, http.StatusMovedPermanently)
				return
			}
			resolved = filepath.Join(resolved, "index.html")
			info, err = os.Stat(resolved)
			if err != nil {
				missing()
				return
			}
		}
		if !info.Mode().IsRegular() {
			missing()
			return
		}
		// Match the static host's text compression without transforming images, PDFs or range responses.
		ext := strings.ToLower(filepath.Ext(resolved))
		textFile := ext == ".html" || ext == ".css" || ext == ".js" || ext == ".json" || ext == ".svg" || ext == ".xml" || ext == ".txt"
		if textFile {
			w.Header().Set("Vary", "Accept-Encoding")
		}
		acceptsGzip := false
		for _, value := range strings.Split(r.Header.Get("Accept-Encoding"), ",") {
			parts := strings.Split(strings.TrimSpace(value), ";")
			if parts[0] != "gzip" {
				continue
			}
			quality := 1.0
			for _, part := range parts[1:] {
				part = strings.TrimSpace(part)
				if strings.HasPrefix(part, "q=") {
					parsed, err := strconv.ParseFloat(strings.TrimPrefix(part, "q="), 64)
					if err != nil {
						quality = 0
					} else {
						quality = parsed
					}
				}
			}
			acceptsGzip = quality > 0
		}
		if textFile && acceptsGzip && r.Header.Get("Range") == "" && info.Size() <= 2*1024*1024 {
			data, readErr := os.ReadFile(resolved)
			if readErr == nil {
				var compressed bytes.Buffer
				writer, _ := gzip.NewWriterLevel(&compressed, gzip.DefaultCompression)
				_, writeErr := writer.Write(data)
				closeErr := writer.Close()
				if writeErr == nil && closeErr == nil {
					w.Header().Set("Content-Encoding", "gzip")
					w.Header().Set("Content-Type", mime.TypeByExtension(ext))
					http.ServeContent(w, r, info.Name(), info.ModTime(), bytes.NewReader(compressed.Bytes()))
					return
				}
			}
		}
		file, err := os.Open(resolved)
		if err != nil {
			missing()
			return
		}
		defer file.Close()
		http.ServeContent(w, r, info.Name(), info.ModTime(), file)
	})
	server := &http.Server{Handler: handler, ReadHeaderTimeout: 10 * time.Second, IdleTimeout: 30 * time.Second}
	fmt.Println("BIOVENT V11 - YEREL SITE ONIZLEMESI")
	fmt.Println("Site adresi: " + address + "/tr/")
	fmt.Println("Bu pencereyi acik tutun. Bitirmek icin Ctrl+C basin.")
	fmt.Println("YEREL TEST: Basvuru formu gercek e-posta gondermez.")
	if !*noBrowser {
		go func() {
			target := address + "/tr/"
			var command *exec.Cmd
			switch runtime.GOOS {
			case "windows":
				command = exec.Command("rundll32.exe", "url.dll,FileProtocolHandler", target)
			case "darwin":
				command = exec.Command("open", target)
			default:
				command = exec.Command("xdg-open", target)
			}
			if err := command.Run(); err != nil {
				fmt.Println("Tarayiciyi kendiniz acip yukaridaki adresi kullanin.")
			}
		}()
	}
	if err := server.Serve(listener); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
