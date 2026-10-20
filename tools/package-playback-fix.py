"""Build a self-contained V11 playback-correction delivery, excluding old QA movies."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import zipfile

repo=Path(__file__).resolve().parents[1]
art=repo/'artifacts/v11'
build=(repo/'.next/BUILD_ID').read_text().strip()
reports={}
for name in ['playback-fix','showroom-results','showroom-lifecycle','choreography-results','motion-results','launcher-http','playback-helper']:
    report=json.loads((art/(name+'.json')).read_text())
    assert report['passed'],name
    if 'buildId' in report:assert report['buildId']==build,name
    reports[name]=report
package=Path('/tmp/biovent-v11-playback-test')
package.mkdir(exist_ok=True)
original=Path('/tmp/biovent-v11-local-test')
manifest=json.loads((original/'SHA256-MANIFEST.json').read_text())
for name in ['BIOVENT-ONIZLEME.exe','launcher-source.go']:
    assert hashlib.sha256((original/name).read_bytes()).hexdigest()==manifest[name]
    shutil.copy2(original/name,package/name)
assert hashlib.sha256((repo/'tools/local-preview/main.go').read_bytes()).hexdigest()==manifest['launcher-source.go']
shutil.copy2(original/'SITEYI-AC.bat',package/'SITEYI-AC.bat')
if (package/'site').exists():shutil.rmtree(package/'site')
shutil.copytree(repo/'deployment/wordpress-hosting/draft-public_html',package/'site')
assert not list((package/'site').rglob('*.webm')) and not list((package/'site').rglob('*.mp4'))
assert not (package/'HAREKET-VIDEOLARI').exists()
shutil.copy2(repo/'tools/local-preview/motion-check.html',package/'HAREKET-KONTROL.html')
shutil.copy2(repo/'V11_MOTION_FIX.md',package/'DUZELTME-VE-TESTLER.md')
(package/'TEST-SONUCLARI.json').write_text(json.dumps({'buildId':build,'reports':reports,'windowsExecuted':False},indent=2,ensure_ascii=False))
(package/'ONCE-BUNU-OKU.txt').write_text('''BIOVENT V11 — HAREKET / OYNAT DUZELTMESI

Eski onizlemenin siyah penceresini once kapatin.
1. ZIP'i yeni bir klasore TUMUNU AYIKLA ile cikarin.
2. SITEYI-AC.bat dosyasini acin. Tarayici otomatik acilir.
3. Siyah pencereyi acik tutun. Node.js/Python kurulumu gerekmez.
4. Acilis alaninin altindaki ortadaki OYNAT dugmesine basin.
   Fare ve klavye odagi dugmede kalsa da otomatik gecis baslar.
   Ilk urun degisimi yaklasik 8,5 saniye sonra olur.
5. Urun isimlerine veya oklara basarak gecisleri hemen inceleyin.
   Asagi kaydirarak Smart inceleme ve urun sahnelerini gezin.

Hareket azaltma acik yaziyorsa HAREKET-KONTROL.html dosyasini acin.
Bu dosya cihazinizin hareket tercihini ve Windows ayar yolunu gosterir.
Cihazinizin erisilebilirlik tercihi site tarafindan zorla degistirilmez.

Eski paketteki HAREKET-VIDEOLARI dosyalari tarayici TEST KAYITLARIDIR.
Siteye gomulu urun videosu degildir. Bu yeni test paketine eklenmediler.
Sitenin gercek gecisleri JavaScript/CSS ile orijinal urun gorsellerinde
calisir; video klasoru veya internet gerektirmez.

Formlar onizleme modundadir; gercek talep gonderilmez.
Baslatici yalnizca kendi bilgisayarinizda 127.0.0.1 uzerinde calisir.
Windows EXE ayni kaynakla Linux'ta HTTP/tarayici testlerinden gecirildi;
fiziksel Windows uzerinde bu ortamda calistirilmadi.
''',encoding='utf-8')

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

results=[archive(Path('/workspace/biovent-v11-motion-fix-windows.zip'),[(p,p.relative_to(package).as_posix()) for p in sorted(package.rglob('*')) if p.is_file() and p.name!='SHA256-MANIFEST.json'],'biovent-v11-test/')]
skip={'.git','node_modules','.next','.next-export','out','artifacts','media-source','__pycache__','coverage'}
source=[]
for p in sorted(repo.rglob('*')):
    if not p.is_file():continue
    rel=p.relative_to(repo)
    if any(part in skip for part in rel.parts) or p.name.startswith('.env') or p.name.endswith('.tsbuildinfo'):continue
    if rel.parts[:2]==('deployment','wordpress-hosting') and len(rel.parts)>2 and rel.parts[2] in {'public_html','draft-public_html','draft-subfolder'}:continue
    source.append((p,rel.as_posix()))
source.append((art/'playback-fix.json','qa/playback-fix.json'))
results.append(archive(Path('/workspace/biovent-v11-motion-fix-source.zip'),source,'biovent-v11/'))
host=repo/'deployment/wordpress-hosting/public_html'
results.append(archive(Path('/workspace/biovent-v11-motion-fix-hosting.zip'),[(p,p.relative_to(host).as_posix()) for p in sorted(host.rglob('*')) if p.is_file()]))
(art/'playback-delivery.json').write_text(json.dumps({'buildId':build,'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip(),'archives':results,'windowsExecuted':False,'productionVideos':False},indent=2))
print(json.dumps(results,indent=2))
