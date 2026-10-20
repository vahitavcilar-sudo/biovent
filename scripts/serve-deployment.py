"""Local HTTP review of an exact exported folder. No PHP or Apache emulation claim."""
import argparse,http.server,os,gzip,io
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('--directory',default='deployment/wordpress-hosting/draft-public_html');parser.add_argument('--port',type=int,default=3100);parser.add_argument('--base-path',default='');args=parser.parse_args();root=Path(args.directory).resolve();base=args.base_path.rstrip('/')
class Handler(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(root),**kwargs)
 def send_head(self):
  path=Path(self.translate_path(self.path))
  if path.is_dir():
   if not self.path.split('?',1)[0].endswith('/'):return super().send_head()
   path=path/'index.html'
  if 'gzip' in self.headers.get('Accept-Encoding','') and path.is_file() and path.suffix in ['.html','.css','.js','.json','.txt','.xml','.svg']:
   data=gzip.compress(path.read_bytes(),mtime=0);self.send_response(200);self.send_header('Content-Type',self.guess_type(str(path)));self.send_header('Content-Encoding','gzip');self.send_header('Vary','Accept-Encoding');self.send_header('Content-Length',str(len(data)));self.end_headers();return io.BytesIO(data)
  return super().send_head()
 def translate_path(self,path):
  path=path.split('?',1)[0]
  if base and (path==base or path.startswith(base+'/')):path=path[len(base):] or '/'
  return super().translate_path(path)
 def do_GET(self):
  if self.path.split('?',1)[0] in [base+'/',base or '/']:
   self.send_response(301);self.send_header('Location',base+'/en/');self.end_headers();return
  super().do_GET()
 def send_error(self,code,message=None,explain=None):
  if code==404 and (root/'404.html').exists():
   data=(root/'404.html').read_bytes();self.send_response(404);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(data)));self.end_headers()
   if self.command!='HEAD':self.wfile.write(data)
  else:super().send_error(code,message,explain)
 def log_message(self,*args):pass
http.server.ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
