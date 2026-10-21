# BioVent V13 — Natro / JetPress ve isteğe bağlı PHP alıcı

Bu bir WordPress teması/eklentisi değildir. Statik Next.js çıktısıdır; JetPress tema ZIP yükleyicisine yüklemeyin. Canlı WordPress dosyaları/veritabanı bu çalışma kapsamında değiştirilmedi.

## Statik inceleme / yayın

Önce mevcut WordPress'i yedekleyin ve ayrı bir test alt alan adı / belge kökü oluşturun. Hosting ZIP'inde kökteki `.htaccess`, `_next`, dil, görsel ve belge klasörlerini aynı test belge köküne çıkarın. İsteğe bağlı PHP alıcısı kaynak ZIP'inde ve ayrı backend ZIP'inde bulunur; özel alıcı dizini belge köküne yüklenmez. Hazır çıktı `https://biovent-implant.com` canonical alan adını kullanır; test alanı için `SITE_URL` ile yeniden derleyin. Alt klasör için `NEXT_PUBLIC_BASE_PATH=/test` değeriyle hem dışa aktarma hem paketleme gerekir.

```sh
npm ci
npm run export
npm run package:hosting
```

Çıktı `deployment/wordpress-hosting/public_html`. Apache/LiteSpeed `.htaccess`, HTTPS, kök `/en/` yönlendirmesi, trailing slash, 404, PDF erişimi, sıkıştırma ve önbellek gerçek Natro ortamında doğrulanmalıdır. WordPress catch-all kuralını statik kökle birleştirmeyin. Kaynak/ZIP'i GitHub'a koymak canlı siteyi yayınlamaz.

## Gerçek başvuruların kurulum adımları

Hazır paketler alıcı ayarlanmadan gönderim yapmaz. İki iş akışı ayrı kalır: profesyonel bilgi/fiyat ve distribütör. `deployment/form-backend` PHP 8.1+ içindir; Next API sunucusu gerektirmez.

1. `private/` içeriğini **public_html dışında**, yalnız hosting kullanıcısına açık `biovent-private` dizinine koyun. İki JSON kayıt dosyasını da buraya kopyalayın: `data/product-variants.json`, `data/prosthetic-components.json`. `storage` dizini oluşturun (0700; dosyalar 0600). Özel dizini genel indirilebilir dosya alanına veya GitHub'a canlı verilerle yüklemeyin.
2. `config.example.php` → özel `config.php`. Onaylı iki alıcıyı, aynı alan adından göndereni, tam izinli origin'i, özel dizin yollarını, JSON SHA-256 değerlerini, rastgele HMAC salt'ını ve şirket/hukuk onaylı saklama süresi/gizlilik sürümünü girin. Varsayılan boş değerler 503 verir; hayali e-posta/süre atanmaz. `sha256sum data/product-variants.json data/prosthetic-components.json` ile değerleri alın. Salt'ı sunucuda `php -r 'echo bin2hex(random_bytes(32));'` ile oluşturabilirsiniz; çıktıyı paylaşmayın.
3. Yalnız `public/professional.php` ve `public/distributor.php` dosyalarını `/api/` altına koyun. Hosting PHP ortamında `BIOVENT_FORM_PRIVATE_ROOT` değerini özel dizinin mutlak yoluna tanımlayın; `getenv` ile PHP tarafından görüldüğünü doğrulayın. Panel desteklemiyorsa hosting desteğiyle bu ayarı yapın. Web'den özel dosyalara erişilememeli.
4. `.env.local` içinde `NEXT_PUBLIC_PROFESSIONAL_ENQUIRY_ENDPOINT=/api/professional.php` ve `NEXT_PUBLIC_ENQUIRY_ENDPOINT=/api/distributor.php` tanımlayıp yeniden derleyin. Bu iki değişken genel URL'dir; parola, SMTP anahtarı veya salt değildir. Başka origin için CORS eklenmedi; aynı origin kurulumunu kullanın.
5. Zamanlanmış görev ile **CLI** `BIOVENT_FORM_PRIVATE_ROOT=/absolute/private/path php /absolute/private/path/dispatch.php` komutunu yaklaşık her dakika çalıştırın. PHP `mail()` ve alan adı/SPF/DKIM/hosting posta ayarı ayrıca çalışır olmalı. Worker başarısız iletimi en erken beş dakika sonra tekrar dener; kabul edilmiş iletimi tekrar göndermez, onaylı süreyi aşan özel başvuruları siler. Günlük yalnız referans/işlem bilgisi tutar; e-posta/mesajı yardımcı günlüğe yazmaz. Sunucu yedekleri ve posta kutusunun saklama politikası ayrıca onaylanmalıdır. Uzun süreli günlük rotasyonunu hosting politikasıyla kurun.
6. Şirketçe onaylanmış test adresleriyle iki gerçek gönderim yapın: tarayıcıda BV-P / BV-D referansı, özel JSON kaydı, worker durumu ve **alıcının gerçek posta kutusunda teslim** ayrı ayrı doğrulansın. 202, kalıcı alım makbuzudur; `transport-accepted` de posta kutusuna teslim garantisi değildir. 429/503/ağ hatasında alanlar korunur; aynı gövde tekrarında tarayıcı idempotency anahtarını korur.
7. Hukuki metinleri onaylı gizlilik iletişimi, hukuki dayanak, host, saklama süresi ve sorumlu temsilciyle tamamlayın. Sonra kontrollü yayın ve geri dönüş planını uygulayın.

Yerel PHP testleri 41 gerçek PHP çekirdeği kontrolü ve 7 `php -l` kontrolü içerir. Bu ortamda PHP 8.5.10 WebAssembly çalıştırıldı; native Natro/PHP mail veya gerçek teslim test edilmedi. `npm run test:backend` için PHP 8.1+ CLI ya da `BIOVENT_PHP` ile uyumlu çalıştırıcı gerekir. `tests/configured-forms-v13.cjs` yalnız ayrı yapılandırılmış derleme ve yerel yanıt taklitlerini test eder; canlı teslim değildir.

Slider varsayılanı beş saniye. `NEXT_PUBLIC_SHOWROOM_INTERVAL_MS=8000` okuma süresini artırır (5000–15000 kabul edilir); değişiklik yeniden derlenir. V13 odak/kullanıcı seçimi sırasında durur; Oynat yeniden başlatır.
