# BioVent V10 — indirilebilir site test paketi

Windows 10/11 x64 için `biovent-v10-windows-test.zip` dosyasını indirin, tümünü ayıklayın, `biovent-v10-test/SITEYI-AC.bat` dosyasını açın. Tarayıcı otomatik açılır; siyah pencereyi test boyunca açık tutun. Node.js veya Python gerekmez. ZIP'in içinden çalıştırmayın.

- Windows test: gerçek tıklanabilir site, dört dil, PDF kataloglar ve 12 tarayıcı hareket kaydı.
- Source: Next.js/React/TypeScript proje dosyaları ve özgün Smart görseli; video masterları dahil değildir.
- Static hosting: Apache/LiteSpeed için HTML/CSS/JS, görseller, kataloglar ve .htaccess. Otomatik yayın yapılmadı.

V10 ürünlere ayrı sahne hareketleri, fiziksel giriş/çıkışlar, sürekli Smart incelemesi, mobil/RTL göstergeler, gerçek görselle ürün sayfası geçişi ve sakin mikroetkileşimler ekler. Ürün filmi kullanılmaz.

Form önizleme modundadır; gerçek e-posta göndermez. Yeni Promx PNG özgün dosyası ZIP'te bulunmadığı için henüz içe aktarılmadı. Mobil Lighthouse EN ana sayfa 96, Smart 96, Products 97; AR ana sayfa 92. Erişilebilirlik ve SEO 100. Ayrıntılar ve test sınırları VALIDATION-V10.md içinde.

Windows EXE çapraz derlenmiştir; aynı kaynak Linux'ta HTTP ve dosya kontrolleriyle test edilmiştir. Fiziksel Windows/Safari/Firefox/Edge/iOS/Android testleri ve canlı Natro/JetPress yayını yapılmamıştır.

Her arşivin SHA-256 özeti ARCHIVE-CHECKSUMS.json içinde; arşiv içindeki manifestler ve ZIP CRC kontrol edilmiştir.
