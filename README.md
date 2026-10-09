# Biovent V4 — Smart fotoğraflı güncel site

## Bilgisayarınızda siteyi açın

[**Smart fotoğraflı Windows test ZIP’i — yaklaşık 42 MB**](https://github.com/vahitavcilar-sudo/biovent/raw/refs/heads/delivery/v4-2026-10-09/biovent-v4-smart-test.zip)

1. ZIP’e sağ tıklayıp **Tümünü ayıkla** seçin.
2. Çıkarılan **biovent-v4-test** klasörünü açın.
3. **SITEYI-AC.bat** dosyasına çift tıklayın.
4. Türkçe ana sayfa tarayıcıda açılır. Siyah pencereyi test boyunca açık tutun.

Node.js, Python, npm veya hosting kurulumu gerekmez. Windows 10/11 64 bit içindir. ZIP içinden çalıştırmayın; önce tüm dosyaları çıkarın. Tarayıcı otomatik açılmazsa konsoldaki adresi tarayıcınıza kopyalayın. Yerel site internet bağlantısı olmadan çalışır; başlatıcı sadece 127.0.0.1 adresinde dinler ve kalıcı kurulum yapmaz.

## Smart fotoğrafı

Kullanıcının smart-foto.zip dosyasındaki iki seçenek de 1320 × 1153 piksel. PNG, kayıpsız kaynak biçimi ve gerçek şeffaflığı nedeniyle seçildi. Ana sayfa, ürün listesi, Smart ürün sayfası, teknik anlatım ve diğer Smart alanları aynı görseli kullanır. Orijinal dosya ve diğer JPEG korunur; web kopyaları yalnızca yeniden boyutlandırılır/kodlanır. İmplant geometrisi, kadrajı veya arka planı yeniden üretilmedi/değiştirilmedi.

## Kontroller ve sınırlar

- 44 sayfa / 440 ekran düzeni; gezinme, diller, teknik seçimler, PDF ve form adımları geçti.
- 47 otomatik erişilebilirlik kontrolü geçti.
- Dört dilde 16 Smart bağlamında 28 görsel doğrulandı; geçici Smart boşlukları kaldırıldı.
- Windows başlatıcısı x64 olarak çapraz derlendi; aynı sunucu kodu Linux’ta test edildi. Bu ortamda Windows üzerinde çalıştırılmadı.
- Form test modundadır; gerçek e-posta göndermez. Şirketin hukuki/iletişim bilgileri ve gerçek hosting davranışı son yayın öncesi doğrulanmalıdır.
- Canlı WordPress sitesi değiştirilmedi veya yayınlanmadı.

ZIP içinde **ONCE-BUNU-OKU.txt**, **SMART-GORSEL-BILGISI.txt**, **TEST-SONUCLARI.json**, başlatıcı kaynak kodu ve **SHA256-MANIFEST.json** bulunur.

## Güncel geliştirme kaynakları

[Kaynak ZIP’i — Smart fotoğrafı dahil](https://github.com/vahitavcilar-sudo/biovent/raw/refs/heads/delivery/v4-2026-10-09/biovent-v4-source.zip)

Bilgisayarda hemen denemek için yukarıdaki **biovent-v4-smart-test.zip** dosyasını kullanın. Önceki biovent-v4-windows-test.zip fotoğraf öncesi sürümdür; güncel paketin adı smart-test.zip’tir.
