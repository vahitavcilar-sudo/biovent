"""Package exact validated V10 export; does not publish or modify live hosting."""
from pathlib import Path
import json,hashlib,shutil,subprocess,zipfile
r=Path(__file__).resolve().parents[1];art=r/'artifacts/v10';package=Path('/tmp/biovent-v10-local-test');build=(r/'.next/BUILD_ID').read_text().strip()
reports={}
for name in ['browser-results','showroom-results','showroom-lifecycle','choreography-results','motion-results','accessibility-results','showroom-accessibility','launcher-http']:
 d=json.loads((art/(name+'.json')).read_text());assert d['passed'],name
 if 'buildId' in d:assert d['buildId']==build,name
 reports[name]=d
records=json.loads((art/'video-records.json').read_text());assert len(records['records'])==12;assert all(x['buildId']==build for x in records['records']);reports['video-records']=records
perf=json.loads((art/'lighthouse/summary.json').read_text());assert len(perf)==5;assert all(x['buildId']==build for x in perf)
for x in perf:
 assert x['scores']['accessibility']>=98 and x['scores']['seo']>=98,x
 if x['page'] in ['home','smart','products']:assert x['scores']['performance']>=95,x
reports.update(buildId=build,lighthouse=perf,frameAndTransfer=json.loads((art/'frame-and-transfer.json').read_text()),windowsExecuted=False,livePublished=False,newPromxOriginalImported=False)
(package/'TEST-SONUCLARI.json').write_text(json.dumps(reports,indent=2,ensure_ascii=False))
shutil.copy2(r/'VALIDATION-V10.md',package/'TEST-ACIKLAMASI.md');shutil.copy2(r/'EXPERIENCE-V10.md',package/'V10-DEGISIKLIKLER.md')
video=package/'HAREKET-VIDEOLARI';video.mkdir(exist_ok=True)
clips=sorted((art/'videos').glob('*.webm'));assert len(clips)==12
for c in clips:shutil.copy2(c,video/c.name)
(video/'VIDEOLARI-AC.html').write_text('<!doctype html><html lang="tr"><meta charset="utf-8"><title>BioVent V10 hareket kayıtları</title><style>body{font:18px sans-serif;background:#101214;color:white;max-width:1100px;margin:40px auto;padding:20px}video{width:100%;max-height:700px}section{margin:40px 0}</style><h1>BioVent V10 — tarayıcı hareket kayıtları</h1><p>Siteyi gezmek için ana klasördeki SITEYI-AC.bat dosyasını açın. Kayıtlar gerçek zamanlı tarayıcı incelemesidir, ürün videosu değildir.</p>'+''.join(f'<section><h2>{c.stem}</h2><video controls preload="metadata" src="{c.name}"></video></section>' for c in clips))
subprocess.run(['python',str(r/'tools/local-preview/package-windows-v10.py')],cwd=r,check=True)
def archive(dest,files,prefix=''):
 manifest={name:hashlib.sha256(path.read_bytes()).hexdigest() for path,name in files}
 with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for path,name in files:z.write(path,prefix+name)
  z.writestr(prefix+'SHA256-MANIFEST.json',json.dumps(manifest,indent=2))
 with zipfile.ZipFile(dest) as z:
  assert z.testzip() is None
  for name,sha in manifest.items():assert hashlib.sha256(z.read(prefix+name)).hexdigest()==sha
 assert dest.stat().st_size<100_000_000,'GitHub file size budget exceeded'
 return {'path':str(dest),'bytes':dest.stat().st_size,'files':len(manifest)+1,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
skip={'.git','node_modules','.next','.next-export','out','artifacts','media-source','__pycache__'};files=[]
for p in sorted(r.rglob('*')):
 if not p.is_file():continue
 rel=p.relative_to(r)
 if any(x in skip for x in rel.parts) or p.name.startswith('.env') or p.name.endswith('.tsbuildinfo'):continue
 if rel.parts[:2]==('deployment','wordpress-hosting') and len(rel.parts)>2 and rel.parts[2] in {'public_html','draft-public_html','draft-subfolder'}:continue
 files.append((p,rel.as_posix()))
files.extend((p,'preview/'+p.name) for p in sorted(art.glob('*-screen.png')))
results=[archive(Path('/workspace/biovent-v10-source.zip'),files,'biovent-v10/')]
host=r/'deployment/wordpress-hosting/public_html';assert (host/'.htaccess').is_file();assert not list(host.rglob('*.mp4')) and not list(host.rglob('*.webm'))
results.append(archive(Path('/workspace/biovent-v10-static-hosting.zip'),[(p,p.relative_to(host).as_posix()) for p in sorted(host.rglob('*')) if p.is_file()]))
p=Path('/workspace/biovent-v10-windows-test.zip');assert p.stat().st_size<100_000_000;results.append({'path':str(p),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(art/'delivery-archives.json').write_text(json.dumps({'buildId':build,'archives':results,'originalVideoMastersIncluded':False,'newPromxOriginalImported':False},indent=2));print(json.dumps(results,indent=2))
