# BioVent V11 — oynat düzeltmesi

Açılıştaki oynat düğmesi düzeltildi: fare ve klavye odağı düğmede kalsa da animasyonlu otomatik ürün geçişi başlar. Dört dilde durum metni; duraklamayı, cihazın hareket azaltma tercihini veya veri tasarrufunu açıklar.

1. [Güncellenmiş Windows ZIP — 45,8 MB](biovent-v11-motion-fix-windows.zip?raw=true) dosyasını indirin.
2. Eski önizlemenin siyah penceresini kapatın. Yeni ZIP'i ayrı bir klasöre **Tümünü ayıkla** ile çıkarın.
3. **SITEYI-AC.bat** dosyasını açın. Açılışın altındaki ortadaki **▶** düğmesine basın. İlk otomatik ürün değişimi yaklaşık **8,5 saniye** sonra olur; ürün adları/oklar geçişleri hemen gösterir.

Hareket azaltma açık yazıyorsa paketteki **HAREKET-KONTROL.html** dosyası cihaz tercihini ve Windows ayar yolunu gösterir. Windows 11: Ayarlar → Erişilebilirlik → Görsel efektler → Animasyon efektleri. Windows 10: Ayarlar → Erişim Kolaylığı → Ekran → Windows'ta animasyonları göster.

Eski HAREKET-VIDEOLARI klasörü tarayıcı test kayıtlarıydı. Siteye gömülü ürün filmi değildir. Yeni Windows paketinde eski kayıtlar bulunmaz; sitede orijinal ürün görselleri üzerinde gerçek kodla çalışan geçişler vardır.

- [Güncel kaynak ZIP — 73,6 MB](biovent-v11-motion-fix-source.zip?raw=true)
- [Hosting ZIP — 40,0 MB](biovent-v11-motion-fix-hosting.zip?raw=true)
- [GitHub kaynak kodu](https://github.com/vahitavcilar-sudo/biovent/tree/d3a7f2bb9887aa27464d5c4dbd2835c21abf46f9)
- [Düzeltme ve test raporu](V11_MOTION_FIX.md)

192 ürün/dil/ekran kontrolü, oynat/gerçek süreli ürün animasyonu testi, 16 axe durumu, motion/lifecycle/choreography ve yerel launcher HTTP kontrolleri geçti. Bu sonuçlar Linux Chromium ve aynı launcher kaynağı içindir; fiziksel Windows burada çalıştırılmadı. Formlar önizlemededir. Canlı Natro/JetPress sitesi değiştirilmedi.

Her ZIP CRC ve dosya bazında SHA-256 ile kontrol edilmiştir. Build: VzRHCDHEYC328Md3xgEVl.
