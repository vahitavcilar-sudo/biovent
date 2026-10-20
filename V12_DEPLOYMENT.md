# V12 — Natro / JetPress yayınlama notları

GitHub kaynak ve ZIP teslimi mevcut canlı WordPress kurulumunu değiştirmez. Bu sürüm statik Next.js çıktısıdır; WordPress teması/eklentisi olarak paneldeki ZIP yükleme alanına kurulmaz. Hazır Windows ZIP'i de hosting'e yüklenmez.

## İnceleme ve yayın sırası

1. Mevcut WordPress dosyalarını ve veritabanını Natro panelinden yedekleyin.
2. Önce ayrı bir test alt alan adı ve ayrı belge kökü oluşturun. Hosting ZIP'inin **içeriğini**, `.htaccess`, `_next`, dört dil klasörü, görseller ve belgeler dahil, bu köke Dosya Yöneticisi/FTP ile çıkarın. Sunucuda Node gerekmez.
3. Test alan adı için kaynakta `SITE_URL` değerini belirleyip yeniden dışa aktarın; yayına geçerken asıl alan adıyla tekrar derleyin. Hazır kök paketi `https://biovent-implant.com` canonical adresini kullanır. Alt klasör kullanacaksanız yalnızca klasöre taşımayın: `NEXT_PUBLIC_BASE_PATH=/test` ile yeniden derleyin.
4. Gerçek tarayıcıda dört dil, doğrudan ürün URL'si, 404, PDF, mobil menü, beş saniyelik slider, azaltılmış hareket ve formları kontrol edin. HTTPS, sıkıştırma, önbellek ve `.htaccess` desteğini Natro/LiteSpeed üzerinde doğrulayın.
5. Doğrulanmış ticari unvan/adres/iletişim ve gizlilik metinlerini tamamlayın. Üretim yeri, belge, sertifika, IFU ve ürün iddiaları için şirket onaylı kaynakları kullanın.
6. Gerçek form gönderimi gerekiyorsa iki alıcıyı ayrı yapılandırın ve uçtan uca test edin. `PROFESSIONAL-INQUIRY.md`, `.env.example` ve `deployment` içindeki mevcut sözleşme/örnekleri izleyin. Tarayıcıya sır/şifre yazmayın. Önizleme modu alıcı yapılandırılana kadar bilerek gönderim yapmaz; sahte başarı göstermez.
7. Test sonucunu inceleyip canlı belge kökünü kontrollü değiştirin; WordPress catch-all rewrite kuralını statik kökle karıştırmayın. Yedeği geri dönüş için saklayın.

Kaynak üretim komutları:

```sh
npm ci
npm run export
npm run package:hosting
```

Dağıtılacak çıktı: `deployment/wordpress-hosting/public_html`. `.htaccess` kökü `/en/` diline yönlendirir; yerel Windows başlatıcısı kullanıcı kolaylığı için `/tr/` açar. Her iki sürümde de tüm diller mevcuttur.

Bu ortamda canlı Natro/JetPress, Apache/LiteSpeed, PHP posta iletimi veya gerçek e-posta teslimi çalıştırılmadı. Hosting paketi önizleme modunda hazırlanır; ticari içerik ve alıcı yapılandırması tamamlanmadan yayına hazır işletme onayı sayılmaz.
