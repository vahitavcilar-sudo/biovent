"""Build an upload-only archive after the verified Smart original is available. Python is build-time only."""
from pathlib import Path
import json,hashlib,zipfile
root=Path(__file__).resolve().parents[1]
master=json.loads((root/'data/smart-asset.json').read_text())
if not master['ready']:raise SystemExit('Production archive blocked: original professional Smart photograph is missing.')
source=root/master['originalPath']
if hashlib.sha256(source.read_bytes()).hexdigest()!=master['sha256']:raise SystemExit('Original Smart checksum mismatch.')
folder=root/'deployment/wordpress-hosting/public_html'
if not (folder/'index.html').is_file():raise SystemExit('Run npm run package:hosting first.')
if not (folder/master['image'].lstrip('/')).is_file():raise SystemExit('Exported master image is missing.')
output=root.parent/'biovent-production-wordpress-hosting.zip'
expected={}
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for p in sorted(folder.rglob('*')):
  if p.is_file():
   name=p.relative_to(folder).as_posix()
   if any(part in ['node_modules','tests','artifacts','.next'] for part in p.relative_to(folder).parts):raise SystemExit('Non-production files found.')
   z.write(p,name);expected[name]=hashlib.sha256(p.read_bytes()).digest()
with zipfile.ZipFile(output) as z:
 for name,digest in expected.items():assert hashlib.sha256(z.read(name)).digest()==digest
print(output,len(expected),'verified production files')
