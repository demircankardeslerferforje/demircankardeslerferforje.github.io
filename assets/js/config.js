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
   "src" alanına dosya adını yazın (ör. "assets/img/gallery/ferforje-kapi-1.webp").

   category değerleri (filtre düğmeleri, yalnızca fotoğrafı olanlar görünür):
     celik  → Çelik Konstrüksiyon
     cati   → Çatı & Panel
     kapi   → Kapı & Çit
     montaj → Montaj
   ===================================================================== */
window.GALLERY = [
  {
    src: "assets/img/gallery/celik-konstruksiyon-montaj.webp",
    title: "Çelik iskelet montajı",
    category: "celik",
    alt: "Açık alanda çelik konstrüksiyon iskeleti kurulurken, işçi platform üzerinde çalışıyor"
  },
  {
    src: "assets/img/gallery/sandvic-panel-cati-kaplama.webp",
    title: "Sandviç panel çatı",
    category: "cati",
    alt: "Çelik çatı makasına sandviç panel yerleştiren usta"
  },
  {
    src: "assets/img/gallery/metal-bahce-kapi.webp",
    title: "Metal bahçe kapısı",
    category: "kapi",
    alt: "Bordo çerçeveli, panelli metal bahçe kapısı"
  },
  {
    src: "assets/img/gallery/celik-yapi-sandvic-panel.webp",
    title: "Çelik yapı ve sandviç panel",
    category: "cati",
    alt: "Çelik konstrüksiyon içinde sıralanmış sandviç paneller"
  },
  {
    src: "assets/img/gallery/kapali-tesis-ic.webp",
    title: "Kapalı tesis içi",
    category: "celik",
    alt: "Tamamlanmış çelik salonun içi: çatı panelleri, kolonlar ve yan kaplama"
  }
];

window.GALLERY_CATEGORIES = {
  celik: "Çelik Konstrüksiyon",
  cati: "Çatı & Panel",
  kapi: "Kapı & Çit",
  montaj: "Montaj"
};
