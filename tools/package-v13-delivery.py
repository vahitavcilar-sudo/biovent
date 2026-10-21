"""Package verified V13 source, Windows review, static hosting and visual evidence."""
from pathlib import Path
import hashlib,json,shutil,subprocess,zipfile
repo=Path(__file__).resolve().parents[1];art=repo/'artifacts/v13';build=(repo/'.next/BUILD_ID').read_text().strip()
reports=['corporate-results','distributor-results','product-data-tests','professional-service','professional-browser','professional-accessibility','viewer-results','viewer-a11y','resources-results','playback-fix','configuration-browser','deep-links','launcher-http','components-results','backend-results','enquiry-results','configured-forms','interval-configuration']
for name in reports:
 d=json.loads((art/(name+'.json')).read_text());assert d.get('passed') is True,name
 if 'buildId'in d and not d.get('separateConfiguredExport'):assert d['buildId']==build,(name,'stale build')
 if name=='backend-results':
  for path,sha in d['sourceSHA256'].items():assert hashlib.sha256((repo/path).read_bytes()).hexdigest()==sha
assert json.loads((art/'after/captures.json').read_text())['buildId']==build
assert all(row['buildId']==build for row in json.loads((art/'lighthouse/summary.json').read_text()))
docs=sorted(repo.glob('V13_*.md'))
assert len(docs)>=11 and all('PLACEHOLDER'not in p.read_text()for p in docs)
head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip()
package=Path('/tmp/biovent-v13-local-test');package.mkdir(exist_ok=True)
shutil.copy2('/tmp/biovent-v13-preview.exe',package/'BIOVENT-ONIZLEME.exe');shutil.copy2(repo/'tools/local-preview/main.go',package/'launcher-source.go')
(package/'SITEYI-AC.bat').write_bytes(b'@echo off\r\ncd /d "%~dp0"\r\n"%~dp0BIOVENT-ONIZLEME.exe"\r\npause\r\n')
if(package/'site').exists():shutil.rmtree(package/'site')
shutil.copytree(repo/'deployment/wordpress-hosting/draft-public_html',package/'site')
assert not list((package/'site').rglob('*.webm'))and not list((package/'site').rglob('*.mp4'))
shutil.copy2(repo/'V13_LOCAL_RUNNING.md',package/'ONCE-BUNU-OKU.txt');shutil.copy2(repo/'V13_TECHNICAL_QA.md',package/'TEST-SONUCLARI.md')
(package/'SURUM.json').write_text(json.dumps({'version':'13.0.0','buildId':build,'sourceCommit':head,'windowsExecuted':False,'forms':'preview; no real enquiry sent'},indent=2))
def archive(path,files,prefix=''):
 names=[n for _,n in files];assert len(names)==len(set(names))and'SHA256-MANIFEST.json'not in names
 hashes={n:hashlib.sha256(p.read_bytes()).hexdigest()for p,n in files}
 with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
  for p,n in files:z.write(p,prefix+n)
  z.writestr(prefix+'SHA256-MANIFEST.json',json.dumps(hashes,indent=2))
 with zipfile.ZipFile(path)as z:
  assert z.testzip()is None
  for n,sha in hashes.items():assert hashlib.sha256(z.read(prefix+n)).hexdigest()==sha,n
 assert path.stat().st_size<100_000_000
 return {'filename':path.name,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'files':len(hashes)+1}
results=[archive(Path('/workspace/biovent-v13-windows-test.zip'),[(p,p.relative_to(package).as_posix())for p in sorted(package.rglob('*'))if p.is_file()and p.name!='SHA256-MANIFEST.json'],'biovent-v13-test/')]
skip={'.git','node_modules','.next','.next-export','out','artifacts','media-source','__pycache__','coverage'};source=[]
for p in sorted(repo.rglob('*')):
 if not p.is_file():continue
 rel=p.relative_to(repo)
 if any(part in skip for part in rel.parts)or p.name.startswith('.env')and p.name!='.env.example'or p.name.endswith('.tsbuildinfo'):continue
 if rel.parts[:2]==('deployment','wordpress-hosting')and len(rel.parts)>2 and rel.parts[2]in{'public_html','draft-public_html','draft-subfolder'}:continue
 source.append((p,rel.as_posix()))
source.extend((p,'qa/'+p.name)for p in sorted(art.glob('*.json')))
source.extend([(art/'lighthouse/summary.json','qa/lighthouse-summary.json'),(art/'lighthouse-before/summary.json','qa/lighthouse-before-summary.json')])
results.append(archive(Path('/workspace/biovent-v13-source.zip'),source,'biovent-v13/'))
host=repo/'deployment/wordpress-hosting/public_html'
results.append(archive(Path('/workspace/biovent-v13-hosting.zip'),[(p,p.relative_to(host).as_posix())for p in sorted(host.rglob('*'))if p.is_file()]+[(repo/'V13_DEPLOYMENT.md','V13-DEPLOYMENT.md')]))
backend=repo/'deployment/form-backend';backendFiles=[(p,p.relative_to(backend).as_posix())for p in sorted(backend.rglob('*'))if p.is_file()]
backendFiles.extend((repo/'data'/n,'private/'+n)for n in ['product-variants.json','prosthetic-components.json']);backendFiles.append((repo/'V13_DEPLOYMENT.md','SETUP.md'))
results.append(archive(Path('/workspace/biovent-v13-form-backend.zip'),backendFiles,'biovent-v13-backend/'))
review=[]
for directory in ['before','after']:
 review.extend((p,p.relative_to(art).as_posix())for p in sorted((art/directory).rglob('*'))if p.is_file()and p.suffix in{'.png','.json'})
review.extend((p,p.name)for p in docs);review.append((art/'review.html','index.html'))
review.extend((p,'performance/'+p.name)for p in sorted((art/'lighthouse').glob('*'))if p.is_file())
review.extend((p,'qa/'+p.name)for p in sorted(art.glob('*.json')))
results.append(archive(Path('/workspace/biovent-v13-visual-review.zip'),review,'biovent-v13-review/'))
(art/'delivery.json').write_text(json.dumps({'buildId':build,'sourceCommit':head,'archives':results,'windowsExecuted':False,'productionVideos':False,'liveDeliveryVerified':False},indent=2))
print(json.dumps(results,indent=2))
