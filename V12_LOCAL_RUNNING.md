# BioVent V12 — bilgisayarda açma

## Hazır Windows paketi

1. `biovent-v12-windows-test.zip` dosyasını indirin. Eski önizlemenin siyah penceresini kapatın.
2. ZIP'e sağ tıklayın → **Tümünü ayıkla**. Paketi yeni bir klasöre çıkarın.
3. Çıkan `biovent-v12-test` klasöründeki **SITEYI-AC.bat** dosyasına çift tıklayın.
4. Tarayıcı otomatik açılır. Test boyunca siyah pencereyi açık tutun.
5. Bitirdiğinizde siyah pencereyi kapatın.

Windows 10/11 x64. Node.js/Python kurulumu gerekmez. ZIP içinden veya `site/index.html` dosyasına çift tıklayarak çalıştırmayın: gerçek yerel sunucu, dil yolları ve JavaScript için gereklidir. Tarayıcı açılmazsa siyah pencerede yazan adresi Chrome/Edge/Firefox'a yapıştırın. Eski port kullanılıyorsa program boş bir port seçer. EXE'yi ve `site` klasörünü birbirinden ayırmayın.

Smart ilk üründür. Ana sayfa her beş saniyede Smart → ProMX → Monoblock → Zygoma geçer. Fare veya odak geçişi durdurmaz. Duraklat/Oynat sizin kontrolünüzdedir. Cihazda hareket azaltma açıksa ürünler yine beş saniyede değişir, büyük geçiş hareketi uygulanmaz. Ekrandaki fotoğraf video dosyası değildir.

Dört dili, mobil menüyü, ürünleri, yakınlaştırma/özellik seçimini, katalogları, ölçüleri ve iki farklı başvuru yolunu deneyebilirsiniz. Formlar önizleme modundadır; gerçek başvuru/e-posta gönderilmez. Taslak indirme çalışır.

Başlatıcı yalnızca kendi bilgisayarınızdaki loopback adresinde çalışır, kurulum yapmaz. Windows EXE çapraz derlendi. Aynı kaynak kod Linux'ta HTTP ve Chromium ile kontrol edilir; bu ortamda fiziksel Windows/yerel Edge testi yapılamaz.

## Kaynak koddan çalışma

Node 24 ile, kaynak ZIP'ini çıkarıp `package.json` bulunan klasörde:

```sh
npm ci
npm run typecheck
npm run dev -- --port 3000
```

Statik çıktı için geliştirme sunucusunu kapattıktan sonra:

```sh
npm run export
npm run package:draft
python scripts/serve-deployment.py --port 3100
```

Bunlar geliştirici komutlarıdır; hazır Windows ZIP'i bunları gerektirmez. `BIOVENT_TEST_URL` tarayıcı testlerinin hedefini, `BIOVENT_CHROMIUM` test Chromium yolunu değiştirir. Testler gerçek alıcılara veri göndermez. Alan adı/form alıcısı ve alt klasör yapılandırması için `V12_DEPLOYMENT.md` dosyasına bakın.
