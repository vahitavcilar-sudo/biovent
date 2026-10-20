# BioVent V11 — oynat ve animasyon düzeltmesi

Bu önceki düzeltmenin raporudur. Güncel 5 saniyelik slider davranışı ve kontroller için `V11_SLIDER_5S.md` dosyasını kullanın.

20 Ekim 2026. Bu düzeltmenin statik build kimliği: `VzRHCDHEYC328Md3xgEVl`.

## Bulunan hata

Doğru `SITEYI-AC.bat` ile açılan önceki pakette, fare açılış alanının üzerindeyken otomatik geçiş ve ortam hareketi duraklatılıyordu. Oynat düğmesine basmak, düğmenin üzerindeki fare ve klavye odağının oluşturduğu duraklamayı kaldıramıyordu. Düğme duraklat simgesi gösterse bile otomatik ilerleme başlamıyordu. Bu davranış önceki paketin paylaşılan yerel sunucusunda gerçek tarayıcı ile yeniden üretildi.

## Değişiklik

- Açıkça oynat seçildiğinde, fare ve klavye odağı oynat düğmesinde kalsa da otomatik ürün geçişi çalışır. Oynat/duraklat simgesi gerçek durumu gösterir.
- Ürün adları ve oklarla manuel seçim, yeni klavye odağı, yeni fare girişi, görünmeyen sekme/alan ve açık menü için güvenli duraklama korunur. Manuel ürün geçişlerinin animasyonu korunur.
- Dört dilde görünen bir durum metni; manuel seçim, duraklama, cihazın hareket azaltma tercihi ve veri tasarrufunu açıklar. Cihazın erişilebilirlik tercihi zorla açılmaz.
- Mobilde oklar, oynat, kaydır bağlantısı ve durum metni birlikte korunur.
- Yeni Windows test paketi eski tarayıcı kayıtlarını içermez. Eski `HAREKET-VIDEOLARI` klasörü QA kayıtlarıdır; siteye gömülü ürün filmleri değildir. Sitede gerçek ürün görselleri üzerinde JavaScript/CSS geçişleri kullanılır.

## Bu düzeltmede çalıştırılan kontroller

- TypeScript, üretim derlemesi, statik export ve iki hosting paketlemesi.
- `tests/playback-v11.cjs`: paylaşılan yerel launcher üzerinden; fare/odak düğmede kalırken gerçek 8,5 saniyelik otomatik Smart → ProMX geçişi ve ürün keyframe animasyonları; duraklat, manuel seçim/tekrar başlat, yeni odakta duraklama; dört dil ve masaüstü/mobil; koyu/açık sahnelerde **16 axe durumu**; hareket azaltma/veri tasarrufu. Cihaz tercihleri zorla değiştirilmez.
- `tests/showroom-v11.cjs`: **192** ürün/dil/ekran kombinasyonu, hızlı seçim, klavye, RTL, dokunma/kaydırma, azaltılmış hareket ve JavaScript kapalı fallback.
- Mevcut showroom lifecycle, choreography ve motion kontrolleri; sekme/menü/görünürlük, geçiş temizliği, Smart devamlılığı, sayfa geçişleri ve sekiz hareket ekranı.
- `tests/launcher-http-v11.py`: yeni export dosyalarının birebir içerik özeti, dört dil/RTL, gzip/q=0, HEAD ve PDF Range/206; Windows ile aynı launcher kaynağı Linux'ta çalıştırıldı.
- Orijinal logo, PDF ve referans kodu bütünlük kontrolü. `HAREKET-KONTROL.html` içeriğinin tarayıcıda iki hareket tercihiyle kontrolü. Bu ortamın tarayıcı yönetim politikası doğrudan `file://` açılışını engelledi; yardımcı dosyanın Windows üzerinde açılması doğrulanmadı.

Ayrıntılı güncel sonuçlar yeni paketin `TEST-SONUCLARI.json` dosyasındadır. Fiziksel Windows çalıştırması bu ortamda yapılmadı. Önceki `V11_QA_REPORT.md`, ilk V11 build'inin raporudur; bu düzeltmede tüm sayfalar için Lighthouse veya 576 düzen kontrolü yeniden çalıştırıldığı iddia edilmez. Bu yama için hedefli hareket/erişilebilirlik kontrolleri kullanıldı.

## Bilgisayarınızda açma

Eski önizlemenin siyah penceresini kapatın. `biovent-v11-motion-fix-windows.zip` dosyasını ayrı bir klasöre **Tümünü ayıkla** ile çıkarıp `SITEYI-AC.bat` dosyasını açın. Açılış alanının altındaki ortadaki **▶** düğmesine basın; ilk otomatik ürün değişimi yaklaşık 8,5 saniye sonra olur. Ürün adları/oklar geçişleri hemen başlatır. Aşağı kaydırarak devam sahnelerini inceleyin.

Hareket azaltma açık yazıyorsa paketteki `HAREKET-KONTROL.html` dosyasını açın. Bu dosya cihaz tercihini ve Windows 10/11 ayar yolunu gösterir. Node.js/Python ve internet, ayıklanmış test sitesini gezmek için gerekli değildir. Formlar önizlemededir. Canlı Natro/JetPress sitesi bu teslimat kapsamında yayımlanmadı.
