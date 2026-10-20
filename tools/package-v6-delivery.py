"""Create verified V6 test, source and static-hosting archives; never publishes."""
from pathlib import Path
import hashlib,json,shutil,subprocess,zipfile
root=Path(__file__).resolve().parents[1]
art=root/'artifacts/v6';package=Path('/tmp/biovent-v6-local-test')
build=(root/'.next/BUILD_ID').read_text().strip()
reports={p.stem:json.loads(p.read_text()) for p in [art/'browser-results.json',art/'accessibility-results.json',art/'motion-results.json',art/'video-records.json',art/'launcher-http.json']}
assert all(reports[n]['passed'] for n in ['browser-results','accessibility-results','motion-results','launcher-http'])
assert len(reports['video-records']['records'])==11
assert all(x['buildId']==build for x in reports['video-records']['records'])
perf=json.loads((art/'lighthouse/summary.json').read_text());assert all(x['buildId']==build for x in perf)
reports.update(buildId=build,lighthouse=perf,windowsExecuted=False,livePublished=False)
package.mkdir(exist_ok=True)
(package/'TEST-SONUCLARI.json').write_text(json.dumps(reports,indent=2,ensure_ascii=False))
shutil.copy2(root/'VALIDATION.md',package/'TEST-ACIKLAMASI.md')
video=package/'HAREKET-VIDEOLARI';video.mkdir(exist_ok=True)
clips=sorted((art/'videos').glob('*.webm'));assert len(clips)==11
for c in clips:shutil.copy2(c,video/c.name)
(video/'VIDEOLARI-AC.html').write_text('<!doctype html><html lang="tr"><meta charset="utf-8"><title>Biovent V6 hareket kayıtları</title><style>body{font:18px sans-serif;background:#101214;color:white;max-width:1100px;margin:40px auto;padding:20px}video{width:100%;max-height:700px}section{margin:40px 0}</style><h1>Biovent V6 — gerçek tarayıcı kayıtları</h1><p>Siteyi gezmek için ana klasördeki SITEYI-AC.bat dosyasını açın.</p>'+''.join(f'<section><h2>{c.stem}</h2><video controls preload="metadata" src="{c.name}"></video></section>' for c in clips))
subprocess.run(['python',str(root/'tools/local-preview/package-windows.py')],cwd=root,check=True)

def archive(dest,files,prefix='',extras=None):
 manifest={name:hashlib.sha256(path.read_bytes()).hexdigest() for path,name in files}
 with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for path,name in files:z.write(path,prefix+name)
  z.writestr(prefix+'SHA256-MANIFEST.json',json.dumps(manifest,indent=2))
  for name,data in (extras or {}).items():z.writestr(prefix+name,data)
 with zipfile.ZipFile(dest) as z:
  assert z.testzip() is None
  for k,v in manifest.items():assert hashlib.sha256(z.read(prefix+k)).hexdigest()==v,k
 print(json.dumps({'archive':str(dest),'bytes':dest.stat().st_size,'files':len(manifest),'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}))

skip={'.git','node_modules','.next','.next-export','out','artifacts','__pycache__'};files=[]
for p in root.rglob('*'):
 if not p.is_file():continue
 rel=p.relative_to(root)
 if any(x in skip for x in rel.parts) or p.name.startswith('.env') or p.name.endswith('.tsbuildinfo'):continue
 if len(rel.parts)>2 and rel.parts[:2]==('deployment','wordpress-hosting') and rel.parts[2] in {'public_html','draft-public_html','draft-subfolder'}:continue
 files.append((p,rel.as_posix()))
shots=sorted(art.glob('*-screen.png'))
files.extend((p,'preview/'+p.name) for p in shots)
html='<!doctype html><meta charset="utf-8"><title>Biovent V6</title><style>body{font:18px sans-serif;margin:30px;background:#111;color:white}img{max-width:100%;display:block;margin:30px 0}</style><h1>Biovent V6</h1><p>Bu ekran görüntüsü galerisidir. Tıklanabilir site için Windows test ZIP dosyasını çıkarın ve SITEYI-AC.bat dosyasını açın.</p>'+''.join(f'<h2>{p.stem}</h2><img src="preview/{p.name}">' for p in shots)
archive(Path('/workspace/biovent-v6-source.zip'),files,'biovent-v6/',{'ONIZLEME.html':html})
host=root/'deployment/wordpress-hosting/public_html'
assert (host/'.htaccess').is_file()
archive(Path('/workspace/biovent-v6-static-hosting.zip'),[(p,p.relative_to(host).as_posix()) for p in sorted(host.rglob('*')) if p.is_file()])
