"""Package an already-exported site and its dependency-free Windows launcher."""
from pathlib import Path
import hashlib
import json
import shutil
import zipfile

repo = Path(__file__).resolve().parents[2]
package = Path('/tmp/biovent-v8-local-test')
source = repo / 'deployment/wordpress-hosting/draft-public_html'
exe = package / 'BIOVENT-ONIZLEME.exe'
if not exe.is_file():
    raise SystemExit('Build the Windows executable first.')
if not (source / 'tr/index.html').is_file():
    raise SystemExit('Export and package the site first.')
if (package / 'site').exists():
    shutil.rmtree(package / 'site')
shutil.copytree(source, package / 'site')
(package / 'SITEYI-AC.bat').write_bytes(b'@echo off\r\ncd /d "%~dp0"\r\n"%~dp0BIOVENT-ONIZLEME.exe"\r\npause\r\n')
readme = '''BIOVENT V8 - BILGISAYARINIZDA GERCEK SITE TESTI

WINDOWS 10/11, 64 BIT
Node.js, Python veya npm kurmaniz gerekmez. Dosyalar acildiktan sonra
siteyi gezmek icin internet baglantisi gerekmez.

1. ZIP dosyasina sag tiklayin ve "Tumunu ayikla" secin.
2. Cikarilan biovent-v8-test klasorunu acin.
3. SITEYI-AC.bat dosyasina cift tiklayin.
4. Tarayiciniz otomatik acilir. Siyah pencereyi test boyunca acik tutun.
5. Bitirdiginizde siyah pencereyi kapatin. Site sunucusu da kapanir.

Tarayici otomatik acilmazsa siyah penceredeki Site adresini kopyalayip
Chrome, Edge veya Firefox'a yapistirin. Baska bir uygulama varsayilan
portu kullaniyorsa baslatici baska bir bos portu otomatik secer.

ZIP'in icinden calistirmayin; once tum dosyalari ayiklayin.
site klasorunu veya BIOVENT-ONIZLEME.exe dosyasini tasimayin/silmeyin.

TEST EDEBILECEGINIZ ISLEVLER
- Gercek, tiklanabilir site; ekran goruntusu onizlemesi degildir.
- Turkce, Ingilizce, Almanca ve Arapca; 44 yerellestirilmis sayfa.
- Mobil menu, urun sahneleri, Smart muhendislik bolumleri, teknik secimler.
- Kesintisiz Smart acilis/devam sahnesi ve tek sinematik imza sahnesi ve etkilesimli inceleme.
- PDF kataloglar ve HAREKET-VIDEOLARI klasorunde gercek tarayici kayitlari.
- Distributor basvuru adimlari ve basvuru taslagi indirme.
- Tarayici boyutunu daraltarak mobil/tablet gorunumunu test edebilirsiniz.

TASLAK SINIRLARI
- Kullanici tarafindan saglanan profesyonel Smart fotografi kullanilir.
  Orijinal PNG korunur; WebP/AVIF kopyalari sadece web icin kodlanmistir.
- Form gercek e-posta gondermez. Onizleme/test modundadir.
- Sirketin dogrulanmamis iletisim/hukuki alanlari tamamlanmamistir.
- Bu paket uretim/yayin onayi degildir; canli WordPress sitesi degismedi.
- Program sadece kendi bilgisayarinizin 127.0.0.1 adresinde dinler;
  aginizdaki baska bilgisayarlara acilmaz. Sisteme kalici kurulum yapmaz.
- Ayni sunucu kodu Linux'ta tarayici kontrolleriyle test edilir. Windows
  EXE'si capraz derlenmistir; bu ortamda Windows uzerinde calistirilmaz.

site klasoru hazir HTML/CSS/JavaScript, gorseller ve PDF'leri icerir.
Windows EXE ve launcher-source.go yerel test icindir; hosting'e yuklenmez.
Otomatik tarayici acma, yerel sunucu baslatma ve statik dosya okuma
haricinde programin kurulum, guncelleme veya e-posta gonderme islevi yoktur.
'''
(package / 'ONCE-BUNU-OKU.txt').write_text(readme, encoding='utf-8')
shutil.copy2(repo / 'tools/local-preview/main.go', package / 'launcher-source.go')
manifest = {str(p.relative_to(package)).replace('\\', '/'): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(package.rglob('*')) if p.is_file() and p.name != 'SHA256-MANIFEST.json'}
(package / 'SHA256-MANIFEST.json').write_text(json.dumps(manifest, indent=2) + '\n')
archive = Path('/workspace/biovent-v8-windows-test.zip')
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for p in sorted(package.rglob('*')):
        if p.is_file():
            z.write(p, 'biovent-v8-test/' + p.relative_to(package).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    for name, digest in manifest.items():
        assert hashlib.sha256(z.read('biovent-v8-test/' + name)).hexdigest() == digest, name
print(json.dumps({'archive': str(archive), 'bytes': archive.stat().st_size,
                  'files': len(manifest) + 1, 'sha256': hashlib.sha256(archive.read_bytes()).hexdigest()}))
