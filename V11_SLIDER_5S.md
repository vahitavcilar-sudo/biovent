# BioVent V11 — 5 saniyelik otomatik slider

20 Ekim 2026. Build: `5-nU_CHV3J_5jn5pM5mRd`. Bu davranış önceki `V11_MOTION_FIX.md` sürümünün yerini alır.

## Güncel davranış

- Açılışta Smart ile başlar; her **5000 ms** sonra Smart → ProMX → Monoblock → Zygoma → Smart sırasını izler.
- Fare ürünün üzerindeyken, klavye odağı slider'dayken ve manuel ürün seçiminden sonra otomatik ilerleme devam eder. “İnceleme için duraklatıldı” davranışı ve dört dildeki ilgili metin kaldırıldı.
- Ürün adı veya oka basıldığında seçilen ürünün 5 saniyelik süresi yeniden başlar; aynı ürün yeniden seçilirse de sayaç sıfırlanır.
- Kullanıcının açıkça bastığı duraklat/oynat düğmesi korunur. Menü/sayfa geçişi, gizli sekme, görünmeyen slider veya sayfadaki genel hareket duraklatması sırasında ilerleme askıya alınır; geri dönüldüğünde yeni bir 5 saniyelik süre başlar.
- Cihazın hareket azaltma tercihi veya veri tasarrufu, ürün döngüsünü durdurmaz. Bu durumlarda büyük geçiş hareketi olmadan **anlık ürün değişimi** yapılır. Sayfanın diğer erişilebilirlik tercihleri değiştirilmez.

## Çalıştırılan kontroller

- TypeScript, üretim derlemesi, statik export, draft ve hosting paketleri başarılı.
- Paylaşılan yerel launcher üzerinde gerçek zamanlı tam dört ürün döngüsü izlendi. Art arda ölçülen değişim aralıkları: 5011.6 ms, 5012.3 ms, 5006.3 ms. Fare ve klavye odağı slider üzerinde kaldı.
- Açık duraklatmanın 5 saniyeden uzun süre tuttuğu, tekrar oynatmanın çalıştığı, manuel ürün seçimi ve sonraki klavye odağının otomatik ilerlemeyi durdurmadığı doğrulandı.
- Azaltılmış harekette 5 saniyelik anlık değişim ve büyük hareket animasyonlarının yokluğu; veri tasarrufunda aynı döngü ve sıfır ürün videosu doğrulandı.
- Dört dil, masaüstü/mobil, koyu/açık sahnelerde **16 axe durumu** geçti.
- **192 ürün/dil/ekran kombinasyonu**, hızlı seçim, klavye/RTL, dokunma ve JavaScript kapalı fallback geçti.
- Showroom lifecycle, choreography ve sekiz motion ekranı; görünürlük/menü/sekme, Smart devamlılığı ve sayfa geçişi kontrolleri geçti.
- Launcher HTTP kontrolü 425 export dosyasının birebir içeriğini, dört dil/RTL, gzip/q=0, HEAD ve PDF Range/206 davranışını doğruladı.
- Orijinal logo/PDF/referans kodlarının bütünlüğü doğrulandı. Yardımcı HTML içeriği iki hareket tercihinde kontrol edildi; bu bulut tarayıcısında doğrudan file:// açılışı doğrulanmadı.

Bu kontroller Linux Chromium ve Windows ile aynı launcher kaynağı üzerinde yapıldı; fiziksel Windows çalıştırması burada yapılmadı. Önceki V11 raporlarındaki Lighthouse ve tüm site düzeni sayıları tarihsel sonuçlardır; bu güncellemede yeniden ölçüldüğü iddia edilmez.

## İndirme ve açma

`biovent-v11-slider-5s-windows.zip` dosyasını ayrı bir klasöre tümüyle ayıklayın. Eski önizlemenin siyah penceresini kapatıp yeni klasördeki **SITEYI-AC.bat** dosyasını açın. Slider otomatik başlar; oynat düğmesine basmanız gerekmez. Siyah pencere test boyunca açık kalmalıdır. Node.js/Python ve internet, ayıklanan siteyi gezmek için gerekmez.

Kaynak ve hosting ZIP'leri ayrı sunulur. Formlar önizlemededir; canlı Natro/JetPress yayını yapılmadı. ZIP'ler CRC ve dosya bazında SHA-256 ile doğrulanır. Önceki tarayıcı QA videoları Windows paketine eklenmez.
