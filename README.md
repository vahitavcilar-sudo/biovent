# BioVent V11 — indirme ve test

V11, orijinal logo ve Smart görseliyle açılır. İngilizce, Almanca, Türkçe ve Arapça; 48 sayfa, dört ürün sistemi, 84 katalog ölçüsü, teknik görsel inceleme, ürün karşılaştırması ve ayrı profesyonel/dağıtıcı talep akışlarını içerir.

## Bilgisayarınızda siteyi açın

1. [Windows test ZIP — 65,3 MB](biovent-v11-windows-test.zip?raw=true) bağlantısına normal tıklayın.
2. İndirme bitince ZIP'e sağ tıklayıp **Tümünü ayıkla** seçin.
3. Çıkarılan `biovent-v11-test` klasöründeki **SITEYI-AC.bat** dosyasına çift tıklayın. Tarayıcı otomatik açılır; siyah pencereyi test boyunca açık tutun.

Node.js veya Python kurmanız gerekmez. Tarayıcı açılmazsa siyah pencerede yazan adresi kopyalayın. ZIP'in içinden çalıştırmayın; bütün dosyaları ayıklayın. EXE aynı kaynakla Linux'ta HTTP üzerinden kontrol edilmiştir; fiziksel Windows üzerinde bu ortamda çalıştırılmamıştır.

## Kaynak kodu ve hosting dosyaları

- [Tam V11 kaynak ZIP — 76,5 MB](biovent-v11-source.zip?raw=true): proje, lockfile, orijinal varlıklar, raporlar, testler ve önizleme görselleri.
- [GitHub'da açık kaynak dosyaları](https://github.com/vahitavcilar-sudo/biovent/tree/50dfe1da6687b8a08e824cf7ab943831dc4d0257)
- [Statik hosting ZIP — 40,0 MB](biovent-v11-static-hosting.zip?raw=true): derlenmiş web dosyaları ve `.htaccess`. Windows test programı hosting'e yüklenmez.

Natro/JetPress üzerinde mevcut WordPress'in üzerine doğrudan yüklemeyin; [kurulum notlarını](V11_DEPLOYMENT.md) kullanın. Bu teslimat canlı siteyi değiştirmez.

## Kontroller ve sınırlar

576 ekran düzeni kontrolü, 84 ölçü seçimi, dört dil/RTL, teknik görüntüleyici, formlar, kaynaklar ve 124 otomatik erişilebilirlik durumu geçti. Son mobil Lighthouse performansı 95–99; erişilebilirlik/SEO/iyi uygulamalar 100. Bazı sayfalarda laboratuvar LCP değeri 2,5 saniyeyi aşıyor. [QA raporu](V11_QA_REPORT.md) gerçek kapsamı ve ölçümleri açıklar.

Formlar önizleme modundadır: gerçek talep/e-posta göndermez. Canlı alıcı servis, hukuki bilgiler, PHP/hosting ve gerçek cihaz kontrolleri tamamlanmadan gönderim etkinleştirilmez. Katalogda belirsiz ürün kodu, uyumluluk veya doğrulanmamış üretim/sertifika bilgisi eklenmedi. CAD/360° yerine orijinal görsellerle yakınlaştırma ve teknik inceleme sunulur.

ZIP'ler CRC ve her dosyanın SHA-256 özetiyle doğrulanmıştır. [Dosya boyutları ve SHA-256](SHA256-VE-DOSYALAR.json). Windows paketinde 14 gerçek tarayıcı kullanım kaydı bulunur; bunlar ürün videosu değildir.

Kaynak commit: `50dfe1da6687b8a08e824cf7ab943831dc4d0257`. Statik build: `KXldNxO4xHvsHwuHH227N`.
