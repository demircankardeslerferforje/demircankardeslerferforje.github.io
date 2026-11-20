/* =====================================================================
   DEMİRCAN KARDEŞLER — SİTE AYARLARI
   Telefon, e-posta, WhatsApp mesajı ve galeri listesi YALNIZCA bu dosyadan
   değiştirilir. HTML'e dokunmanız gerekmez.
   ===================================================================== */
window.SITE_CONFIG = {
  /* ------------------------------------------------------------------
     E-POSTA  >>> DEĞİŞTİRİLECEK YER <<<
     Yeni Gmail hesabı kesinleşince aşağıdaki adresi güncelleyin.
     (Geçici olarak planlanan adres yazılı.)
     ------------------------------------------------------------------ */
  email: "demircankardeslerferforje@gmail.com",

  /* Telefon: görünen biçim ve uluslararası biçim (boşluksuz, + ile) */
  phoneDisplay: "0531 556 04 44",
  phoneIntl: "+905315560444",

  /* WhatsApp: numara (yalnızca rakam) ve hazır mesaj */
  whatsappNumber: "905315560444",
  whatsappMessage: "Merhaba, web sitenizden ulaşıyorum. Bir iş için bilgi ve fiyat teklifi almak istiyorum.",

  instagram: "https://www.instagram.com/demircankardeslerferforje/",
  instagramHandle: "@demircankardeslerferforje"
};

/* =====================================================================
   GALERİ LİSTESİ
   Fotoğrafları  assets/img/gallery/  klasörüne koyun ve aşağıdaki
   "src" alanına dosya adını yazın (ör. "assets/img/gallery/ferforje-kapi-1.jpg").
   "src" boş ("") bırakılırsa şık bir "fotoğraf yakında" kartı gösterilir.

   category değerleri (filtre düğmeleri bunlardan oluşur):
     ferforje | kapi | sineklik | celik | cati | hayvancilik
   ===================================================================== */
window.GALLERY = [
  { src: "", title: "Ferforje Kapı",              category: "ferforje",    alt: "Ferforje kapı imalatı" },
  { src: "", title: "Balkon Korkuluğu",           category: "ferforje",    alt: "Ferforje balkon korkuluğu" },
  { src: "", title: "Merdiven Korkuluğu",         category: "ferforje",    alt: "Ferforje merdiven korkuluğu" },
  { src: "", title: "Pencere Demiri",             category: "ferforje",    alt: "Ferforje pencere demiri" },
  { src: "", title: "Bahçe Kapısı",               category: "kapi",        alt: "Demir bahçe kapısı" },
  { src: "", title: "Sineklik",                   category: "sineklik",    alt: "Pencere ve kapı sinekliği" },
  { src: "", title: "Çelik Konstrüksiyon",        category: "celik",       alt: "Çelik konstrüksiyon taşıyıcı sistem" },
  { src: "", title: "Sandviç Panel Çatı",         category: "cati",        alt: "Sandviç panel çatı kaplama" },
  { src: "", title: "Trapez Sac Cephe",           category: "cati",        alt: "Trapez sac cephe kaplama" },
  { src: "", title: "Kapalı Besi Tesisi — Kırıkkale", category: "hayvancilik", alt: "Kırıkkale Aşağı Mahmutlar kapalı besi tesisi" },
  { src: "", title: "Kilitli Padok Sistemi",      category: "hayvancilik", alt: "Kilitli padok sistemi" },
  { src: "", title: "Hangar / Depo",              category: "celik",       alt: "Çelik hangar ve depo yapısı" }
];

window.GALLERY_CATEGORIES = {
  ferforje: "Ferforje",
  kapi: "Demir Kapı",
  sineklik: "Sineklik",
  celik: "Çelik Yapı",
  cati: "Çatı & Cephe",
  hayvancilik: "Hayvancılık"
};
