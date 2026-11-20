# Demircan Kardeşler Ferforje Sineklik — Web Sitesi

Tek sayfalık, bağımlılıksız (saf HTML/CSS/JS) tanıtım sitesi. Derleme adımı yoktur; dosyalar olduğu gibi GitHub Pages'te yayınlanır. Yazı tipleri sitenin içinde (`assets/fonts`) durur, dışarıdan hiçbir CDN'e bağlanmaz.

```
index.html               → sayfanın kendisi
assets/css/style.css     → tasarım
assets/js/config.js      → TELEFON, E-POSTA, WHATSAPP MESAJI ve GALERİ LİSTESİ (düzenlenecek tek dosya)
assets/js/main.js        → menü, galeri, animasyonlar
assets/img/gallery/      → iş fotoğrafları buraya
assets/img/og-image.png  → WhatsApp / sosyal medyada paylaşılınca çıkan kapak görseli
assets/img/favicon.svg   → sekme ikonu (DK monogramı)
```

## 1. Fotoğraf eklemek

1. Fotoğrafı `assets/img/gallery/` klasörüne koyun. Dosya adında Türkçe karakter ve boşluk kullanmayın (ör. `ferforje-kapi-1.webp`).
   Önerilen: en fazla ~1600 px, 300 KB altı WebP veya JPG.
2. `assets/js/config.js` dosyasını açın, `window.GALLERY` listesine bir satır ekleyin:
   ```js
   { src: "assets/img/gallery/ferforje-kapi-1.webp", title: "Ferforje Kapı", category: "kapi", alt: "Ferforje kapı imalatı" },
   ```
3. `category` şu değerlerden biri olmalı: `celik` (Çelik Konstrüksiyon), `cati` (Çatı & Panel), `kapi` (Kapı & Çit), `montaj` (Montaj).
   Filtre düğmeleri yalnızca fotoğrafı olan kategorileri gösterir.
4. Galerinin sonunda “Daha fazlası Instagram'da” kartı otomatik görünür; bağlantı `SITE_CONFIG.instagram` adresine gider.

## 2. E-posta adresini değiştirmek

`assets/js/config.js` en üstteki satır:
```js
email: "demircankardeslerferforje@gmail.com",
```
Adresi değiştirip kaydetmeniz yeterli; sayfadaki tüm e-posta bağlantıları buradan güncellenir.
(JavaScript kapalı tarayıcılar için `index.html` içinde "E-posta" yazan satırda da aynı adres yazılıdır; isterseniz orayı da değiştirin.)

Telefon numarası ve WhatsApp hazır mesajı da aynı dosyadadır (`phoneDisplay`, `phoneIntl`, `whatsappNumber`, `whatsappMessage`).

## 3. GitHub Pages'te yayınlamak

1. GitHub'da yeni bir depo oluşturun. Adres `https://KULLANICIADI.github.io/` olsun istiyorsanız depo adı tam olarak `KULLANICIADI.github.io` olmalı.
2. Bu klasörün **içindekileri** (index.html en üstte olacak şekilde) depoya yükleyin: "Add file → Upload files" ile sürükle-bırak veya `git push`.
3. Depoda **Settings → Pages → Build and deployment → Source: Deploy from a branch**, Branch: `main`, klasör: `/ (root)` → **Save**.
4. 1–2 dakika sonra site yayında olur.
5. Yayın adresi `https://demircankardeslerferforje.github.io/` dışında bir şey olursa `index.html` içindeki `canonical`, `og:url`, `og:image` ve JSON-LD içindeki `url` / `image` satırlarını yeni adresle değiştirin (paylaşım önizlemesi için gerekli).

## Yerelde denemek

Klasörde `python3 -m http.server 8000` çalıştırıp tarayıcıda `http://localhost:8000` açın.
(`index.html`'e çift tıklamak da çalışır, ancak bazı tarayıcılar yazı tiplerini dosya modunda yüklemez.)
