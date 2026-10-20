"""Archive the audited V12 export, original source and real review captures."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import zipfile

repo=Path(__file__).resolve().parents[1]
art=repo/'artifacts/v12'
build=(repo/'.next/BUILD_ID').read_text().strip()
report_names=['corporate-results','distributor-results','product-data-tests','professional-service','professional-browser','professional-accessibility','viewer-results','viewer-a11y','resources-results','playback-fix','configuration-results','deep-links-results','launcher-http']
reports={}
for name in ['V12_VISUAL_AUDIT.md','V12_DESIGN_SYSTEM.md','V12_IMPLEMENTATION_REPORT.md','V12_ASSET_AUDIT.md','V12_QA_REPORT.md']:
    assert (repo/name).is_file() and 'PERFORMANCE_TABLE_PLACEHOLDER' not in (repo/name).read_text()
for name in report_names:
    path=art/(name+'.json')
    # Configuration and deep-link file names are discovered explicitly below.
    if not path.exists():
        alternatives={'configuration-results':'configuration-browser','deep-links-results':'deep-links'}
        path=art/(alternatives.get(name,name)+'.json')
    data=json.loads(path.read_text())
    assert data.get('passed') is True,name
    if 'buildId' in data:assert data['buildId']==build,(name,'stale build')
    reports[name]=data
assert json.loads((art/'after/captures.json').read_text())['buildId']==build
assert all(r['buildId']==build for r in json.loads((art/'lighthouse/summary.json').read_text()))
package=Path('/tmp/biovent-v12-local-test')
package.mkdir(exist_ok=True)
shutil.copy2('/tmp/biovent-v12-preview.exe',package/'BIOVENT-ONIZLEME.exe')
shutil.copy2(repo/'tools/local-preview/main.go',package/'launcher-source.go')
(package/'SITEYI-AC.bat').write_bytes(b'@echo off\r\ncd /d "%~dp0"\r\n"%~dp0BIOVENT-ONIZLEME.exe"\r\npause\r\n')
if (package/'site').exists():shutil.rmtree(package/'site')
shutil.copytree(repo/'deployment/wordpress-hosting/draft-public_html',package/'site')
assert not list((package/'site').rglob('*.webm')) and not list((package/'site').rglob('*.mp4'))
shutil.copy2(repo/'V12_LOCAL_RUNNING.md',package/'ONCE-BUNU-OKU.txt')
shutil.copy2(repo/'V12_QA_REPORT.md',package/'TEST-SONUCLARI.md')
(package/'SURUM.json').write_text(json.dumps({'version':'12.0.0','buildId':build,'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip(),'windowsExecuted':False,'forms':'preview; no real enquiry sent'},indent=2))

def archive(path,files,prefix=''):
    names=[name for _,name in files]
    assert len(names)==len(set(names)) and 'SHA256-MANIFEST.json' not in names
    hashes={name:hashlib.sha256(p.read_bytes()).hexdigest() for p,name in files}
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
        for p,name in files:z.write(p,prefix+name)
        z.writestr(prefix+'SHA256-MANIFEST.json',json.dumps(hashes,indent=2))
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        for name,digest in hashes.items():assert hashlib.sha256(z.read(prefix+name)).hexdigest()==digest,name
    assert path.stat().st_size<100_000_000
    return {'filename':path.name,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'files':len(hashes)+1}

results=[archive(Path('/workspace/biovent-v12-windows-test.zip'),[(p,p.relative_to(package).as_posix()) for p in sorted(package.rglob('*')) if p.is_file() and p.name!='SHA256-MANIFEST.json'],'biovent-v12-test/')]
skip={'.git','node_modules','.next','.next-export','out','artifacts','media-source','__pycache__','coverage'}
source=[]
for p in sorted(repo.rglob('*')):
    if not p.is_file():continue
    rel=p.relative_to(repo)
    if any(part in skip for part in rel.parts) or p.name.startswith('.env') and p.name!='.env.example' or p.name.endswith('.tsbuildinfo'):continue
    if rel.parts[:2]==('deployment','wordpress-hosting') and len(rel.parts)>2 and rel.parts[2] in {'public_html','draft-public_html','draft-subfolder'}:continue
    source.append((p,rel.as_posix()))
for p in sorted(art.glob('*.json')):source.append((p,'qa/'+p.name))
source.append((art/'lighthouse/summary.json','qa/lighthouse-summary.json'))
source.append((art/'lighthouse-initial/summary.json','qa/lighthouse-initial-summary.json'))
results.append(archive(Path('/workspace/biovent-v12-source.zip'),source,'biovent-v12/'))
host=repo/'deployment/wordpress-hosting/public_html'
host_files=[(p,p.relative_to(host).as_posix()) for p in sorted(host.rglob('*')) if p.is_file()]
host_files.append((repo/'V12_DEPLOYMENT.md','V12-DEPLOYMENT.md'))
results.append(archive(Path('/workspace/biovent-v12-hosting.zip'),host_files))
review=[]
for directory in ['before','after']:
    review.extend((p,p.relative_to(art).as_posix()) for p in sorted((art/directory).rglob('*')) if p.is_file() and p.suffix in {'.png','.json'})
review.extend((repo/name,name) for name in ['V12_VISUAL_AUDIT.md','V12_DESIGN_SYSTEM.md','V12_IMPLEMENTATION_REPORT.md','V12_ASSET_AUDIT.md','V12_QA_REPORT.md'])
review.append((art/'review.html','index.html'))
review.extend((p,'performance/'+p.name) for p in sorted((art/'lighthouse').glob('*')) if p.is_file())
results.append(archive(Path('/workspace/biovent-v12-visual-review.zip'),review,'biovent-v12-review/'))
(art/'delivery.json').write_text(json.dumps({'buildId':build,'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip(),'archives':results,'windowsExecuted':False,'productionVideos':False},indent=2))
print(json.dumps(results,indent=2))
