# Biovent V8 — WordPress hosting dağıtım rehberi

Bu uygulama WordPress teması değildir. Next.js ile geliştirilir, hostingde HTML/CSS/JavaScript olarak çalışır. Ziyaretçiler için Node.js, npm, PM2 veya PHP sayfa oluşturma gerekmez. Hiçbir canlı hosting dosyası bu çalışma sırasında değiştirilmemiştir.

## Önce tamamlanması gerekenler

Profesyonel Smart fotoğrafı `smart-foto.zip` içinden alındı. 1320 × 1153 PNG kaynak olarak seçilip orijinali korunarak içe aktarıldı. Şirketin yasal/iletişim bilgileri, canlı başvuru bağlantısı ve gerçek Natro hosting davranışı hâlâ doğrulanmalıdır. Kullanıcının son görsel onayı alınmadan yayına geçmeyin.

## 1. Kaynak projeden statik site oluşturma

Geliştirici bilgisayarında Node.js 20.9+ gerekir. Terminalde proje klasörüne geçin:

```sh
npm ci
npm run export
npm run package:hosting
python tools/archive-hosting.py
```

Mevcut kaynak paketinde Smart fotoğrafı zaten içe aktarılmıştır. Yeni bir kullanıcı fotoğrafı geldiğinde `npm run import:smart -- /dosyanin/tam/yolu/smart-fotograf.png` kullanılabilir. Fotoğraf içe aktarımı orijinali byte-byte korur ve SHA-256 kaydeder. Sadece web formatları/ölçüleri üretilir; ürün geometrisi veya arka plan AI ile değiştirilmez. Boyutlar büyütülmez. Fotoğrafı gönderen kişinin sağladığı **aynı dosya** kullanılmalıdır; katalog veya üretilmiş başka implantla değiştirmeyin.

`out/` Next.js çıktısıdır. Upload edilecek son dosyalar `deployment/wordpress-hosting/public_html/` içindedir. Bu klasörün **içeriğini** hostingin belge köküne yükleyin. `python tools/package-v6-delivery.py` komutu `biovent-v6-static-hosting.zip` dosyasını oluşturur ve her girdiyi SHA-256 ile doğrular. Python yalnız geliştirici bilgisayarında arşivleme içindir; hostingde gerekmez. Üretim ZIP’i yalnız bu içerikten oluşturulur; kaynak, rapor veya ekran görüntüsü içermemelidir.

`npm run package:draft` yalnız geliştirme incelemesi için `draft-public_html/` hazırlar; master fotoğraf yokken çalışabilir. Bu taslağı üretim sitesi sanmayın.

## 2. Senaryo A: Alan adı kökünde WordPress'in yerini alması

1. cPanel/Plesk üzerinden tam dosya yedeği ve WordPress veritabanı yedeği alın. Yedeği hosting dışına da indirin.
2. Mevcut `.htaccess`, `wp-config.php`, yüklemeler, eklentiler ve temalar dâhil dosyaları koruyun. Bu paket hiçbirini otomatik silmez.
3. Mümkünse ilk yüklemeyi ayrı test alan adı veya staging belge kökünde yapın.
4. Görsel onay sonrası mevcut belge kökünün yedeğini alıp statik site için temiz bir kök belirleyin. WordPress `index.php`/catch-all rewrite ile bu sitenin `.htaccess` dosyasını karıştırmayın.
5. `public_html/` klasörünün kendisini değil içindeki `index.html`, `en/`, `de/`, `tr/`, `ar/`, `_next/`, `images/`, `brand/`, `fonts/`, `documents/` ve diğer çıktıları hedefe yükleyin.
6. Gizli `.htaccess` dosyasının da yüklendiğini kontrol edin. Dosya yöneticisinde “gizli dosyaları göster” seçeneğini açmanız gerekebilir.

## 3. Senaryo B: WordPress kalacak

En basit seçenek, ayrı bir alt alan adı ve ayrı belge köküdür. Örneğin staging alan adınızın belge köküne root için üretilmiş paketi yükleyin; `SITE_URL` o alan adı olmalıdır.

Alt klasör gerekiyorsa **yeniden build alın**. Sadece root paketini bir klasöre taşımayın:

```sh
NEXT_PUBLIC_BASE_PATH=/biovent SITE_URL=https://biovent-implant.com npm run export
NEXT_PUBLIC_BASE_PATH=/biovent npm run package:hosting
```

Windows'ta aynı değişkenleri terminal ortamında ayarlayın veya yerel `.env.local` içine yazın; bu dosyayı public hostinge yüklemeyin.

Bu paketin içeriği `public_html/biovent/` altına yüklenir. Son adresler `/biovent/en/`, `/biovent/tr/` vb. olur. `_next`, resimler, fontlar, PDF'ler, canonical ve sitemap de aynı alt klasöre göre üretilir. `NEXT_PUBLIC_BASE_PATH` başında `/` içerir; sonunda `/` içermez. Ayrı `assetPrefix` gerekli değildir.

Üst klasör WordPress rewrite kuralları gerçek dosya/dizinleri atlamalıdır. Özel WordPress, güvenlik eklentisi veya CDN kuralları `/biovent/` isteklerini yakalıyorsa hosting yöneticisine bu dizini dışlatın. WordPress dosyalarını silmeyin.

## 4. Alan adı ve HTTPS

`SITE_URL` canonical alan adıdır. Varsayılan `https://biovent-implant.com`dur. www/non-www seçimi hosting panelinde yapılmalıdır; paket kendiliğinden farklı bir alan adına yönlendirme eklemez.

SSL sertifikasını önce hosting panelinde etkinleştirin. HTTPS zorlamayı panelden açmak genellikle daha güvenlidir. Doğrudan Apache/LiteSpeed TLS kullanıyorsanız üretim paketini `BIOVENT_FORCE_HTTPS=1 npm run package:hosting` ile hazırlayabilirsiniz. TLS sonlandıran proxy/CDN arkasında bu seçenek yönlendirme döngüsü yaratabilir; onun yerine hosting panelinin proxy uyumlu HTTPS ayarını kullanın.

`.htaccess` kökü sunucu düzeyinde `/en/`ye yönlendirir; varsayılan dil için yalnız JavaScript'e bağımlılık yoktur. Gerçek dizinlerde son `/` tutarlıdır. Hatalı adresler `404.html` üzerinden gerçek HTTP 404 olarak sunulur.

## 5. cPanel dosya yöneticisi veya FTP/SFTP

- cPanel: hedef belge kökünü açın, yalnız üretim ZIP’ini yükleyin, Extract ile aynı köke çıkarın. Dosyalar fazladan bir `public_html/public_html` katmanı içine düşmemelidir.
- FTP/SFTP: üretim klasörünün içeriğini aktarın. `.htaccess` dâhil gizli dosyaları atlamayın. Kaynak projeyi veya `node_modules` klasörünü yüklemeyin.
- Genel izinler hosting varsayılanlarına uygun olmalıdır; dosyalara herkese yazma izni vermeyin. Hosting paneli kullanıcı/grup izinlerini yönetir.

## 6. Önbellek

HTML/XML/TXT için kısa cache, sürümlü JS/CSS için bir yıl immutable, görsel/font/PDF için bir hafta hazırlanmıştır. Responsive görseller içerik hash’iyle adlandırılır. Yeni sürüm sonrası LiteSpeed/CDN önbelleğini temizleyin. HTML’i sonsuza kadar cache'lemeyin. Orijinal PDF dosyaları değişmeden korunur.

Header ve compression modülleri `.htaccess` içinde koşulludur. Güvenlik/önbellek direktifleri hosting sağlayıcısına göre sınırlandırılabilir. 500 hatası varsa hosting error log’una bakın; mevcut WordPress kurallarını körlemesine eklemeyin. Yerel kontroller statik HTTP sunucuda yapılır; sağlayıcınızdaki Apache/LiteSpeed modülleri ayrıca doğrulanmalıdır.

## 7. Başvuru formu

Endpoint ayarlanmadan form açıkça önizleme modundadır ve **talep göndermez**. SMTP şifresini veya API anahtarını frontend koduna koymayın.

Hazır ayrık adapter `lib/enquiry-service.ts` içindedir. İsteğe bağlı PHP örneği `deployment/server/enquiry.php.example` içinde ve public ZIP’in dışındadır. PHP 8.1+, doğrulanmış gönderen/alıcı, izin verilen HTTPS origin ve public kökün dışında yazılabilir rate-limit dizini gerekir. Örnek varsayılan olarak devre dışıdır.

Server konfigürasyon adları: `BIOVENT_ALLOWED_ORIGIN`, `BIOVENT_ENQUIRY_TO`, `BIOVENT_ENQUIRY_FROM`, `BIOVENT_RATE_DIRECTORY`. Bunları hostingin güvenli sunucu ortamında ayarlayın. Ham SMTP parolası hiçbir proje dosyasına yazılmaz. Origin koruması, JSON zorunluluğu, server-side validation, honeypot ve sınırlama vardır. Proxy IP header'ı körlemesine güvenilmez.

Hosting mail servisini doğruladıktan sonra örneği ayrı server endpoint olarak kurabilirsiniz. Build öncesinde `NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://alanadiniz/enquiry.php` ayarlayıp yeniden export edin. `accepted:true` ancak yerel mail transport mesajı kabul ederse döner; gerçek inbox teslimini ayrıca test edin. Endpoint üzerinden gerçek test talebinin alıcıya geldiğini doğrulamadan canlı gönderim çalışıyor demeyin. PHP örneği yerel PHP runtime bulunmadığından burada yürütülmedi.

## 8. Yayın sonrası kontrol listesi

- Kök adres `/en/`ye gider; `/en/`, `/tr/`, `/de/`, `/ar/` açılır.
- Her dilde dört ürün sayfası, resources, about, distributors açılır.
- Smart her yerde aynı orijinal master fotoğrafıdır; katalog çizimi yalnız doküman bağlamındadır.
- Dil değişimi sayfayı ve seçilen ürünü korur; Arapça sağdan sola görünür.
- Promx çap/uzunluk referansları ve Zygoma 35–55 mm seçimleri çalışır.
- Her iki PDF indirilir; dosya boyutları ve içerikleri orijinallerle aynıdır.
- Geçersiz bir adres gerçek 404 döndürür.
- Mobil menü/klavye/Escape, form hata mesajları, önizleme veya gerçek doğrulanmış gönderim çalışır.
- Tarayıcı ağ panelinde 404/500, localhost, workspace veya geçici dosya adresleri yoktur.
- Sitemap/canonical/hreflang doğru alan adı ve alt klasörü gösterir. Taslak noindex'i fotoğraf sonrası üretim build'inde kaldırılır.

## 9. Geri dönüş

Sorun varsa önceki dosya kökünü ve `.htaccess` yedeğini geri alın; WordPress veritabanını yalnız değiştirdiyseniz uygun yedekten geri yükleyin. CDN/LiteSpeed cache temizleyin. Bu çalışma canlı WordPress’i değiştirmediği için burada yapılmış bir silme/yükleme işlemi yoktur.
