# BioVent V13 — bilgisayarda açma

Hazır Windows paketi: **biovent-v13-windows-test.zip**.

1. ZIP indirme bağlantısını normal sol tıklamayla açın. GitHub dosya sayfası açılırsa **Download raw file** düğmesini kullanın.
2. İndirme tamamlanınca Windows İndirilenler klasöründe ZIP'e sağ tıklayıp **Tümünü ayıkla** seçin. ZIP'in içinde çalıştırmayın.
3. Ayıklanan **biovent-v13-test** klasöründe **SITEYI-AC.bat** dosyasını çift tıklayın.
4. Açılan terminali açık bırakın; tarayıcı Türkçe ana sayfayı açar. Node.js/Python kurulumu gerekmez. İngilizce, Almanca ve Arapça sağ üstteki dil menüsündedir.
5. Smart ilk açılır; normal durumda beş saniyede ürün değişir. V13 talebine göre bir ürüne tıklamak veya ürün bağlantısına klavyeyle odaklanmak inceleme için duraklatır. Alttaki **Oynat** ile devam eder. Fareyi yalnızca üstüne getirmek durdurmaz. Hareket azaltma açıksa ürünler yine beş saniyede, kayma animasyonu olmadan değişir.

`index.html` dosyasını çift tıklamak yerine başlatıcıyı kullanın. Klasör taşırsanız `site`, EXE ve BAT birlikte kalmalı. Varsayılan yerel port doluysa başlatıcı başka boş port seçer. Bu önizleme yalnız kendi bilgisayarınıza bağlanır. Formlar bu pakette önizlemedir; indirilen başvuru metni e-posta olarak gönderilmez.

EXE Windows x64 için Go 1.27.3 ile çapraz derlendi. Ortak sunucu kodu ve tüm çıktı dosyaları Linux'ta HTTP/tarayıcı ile kontrol edildi; bu ortamda fiziksel Windows çalıştırılmadı. Dosyalar bilgisayarınıza ancak siz indirdiğinizde kaydolur; bu çalışma alanının yolu sizin C: diskiniz değildir.

Kaynak geliştiriciler için Node 24 önerilir (en az 20.9). `npm ci`, `npm run typecheck`, `npm run dev -- --port 3000`. Statik çıktı için `npm run export`, `npm run package:draft`, `python scripts/serve-deployment.py --port 3100`. Bu yerel adresi paylaşılabilir internet önizlemesi saymayın. Detaylar `README.md` ve `V13_DEPLOYMENT.md` içindedir.
