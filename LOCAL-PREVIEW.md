# Windows local preview delivery

The self-contained Windows x64 test ZIP includes the current exported static site, a Go standard-library-only local server, SITEYI-AC.bat, Turkish instructions, launcher source, test results and SHA-256 manifest. No Node.js/npm/Python installation is required by the user. Extract the entire ZIP before launching. The launcher binds only 127.0.0.1 and opens Turkish automatically; closing its console stops the server.

V7: 44 localized routes / 440 layouts and 47 accessibility checks passed against the exact static export. Motion smoke checks also run against the Go implementation compiled for Linux and packaged folder. Transport checks passed for Turkish root, trailing slash/query preservation, 404, path traversal/hidden file rejection, directory listing rejection, unsupported POST, PDF range and HEAD. Windows EXE was cross-compiled and its PE32+ x64 target checked; it was not executed on Windows in this environment.

The user-provided Smart PNG is imported and used throughout primary Smart placements; no substitute is used. Forms remain preview-only. The ZIP is a working local test package, not an approved final production release. Main/live hosting was not modified.

Build helper: tools/local-preview/main.go. Compile for Windows with CGO_ENABLED=0 GOOS=windows GOARCH=amd64 using Go, then tools/local-preview/package-windows.py creates and checksum-verifies the local test ZIP. Go was downloaded from the official go.dev manifest and its official SHA-256 verified.
