/* Demircan Kardeşler — site betiği (bağımlılıksız) */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Ayarları bağla (telefon, WhatsApp, e-posta, Instagram) ---- */
  if (C.phoneIntl) $$(".js-tel").forEach(function (a) { a.href = "tel:" + C.phoneIntl; });
  if (C.phoneDisplay) $$(".js-phone").forEach(function (el) { el.textContent = C.phoneDisplay; });
  if (C.whatsappNumber) {
    var wa = "https://wa.me/" + C.whatsappNumber + (C.whatsappMessage ? "?text=" + encodeURIComponent(C.whatsappMessage) : "");
    $$(".js-wa").forEach(function (a) { a.href = wa; });
  }
  if (C.email) $$(".js-email").forEach(function (a) { a.href = "mailto:" + C.email; a.textContent = C.email; });
  if (C.instagram) $$(".js-ig").forEach(function (a) { a.href = C.instagram; });
  if (C.instagramHandle) $$(".js-ig-handle").forEach(function (a) { a.textContent = C.instagramHandle; });
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Üst menü ---- */
  var hdr = $(".hdr"), burger = $("#burger"), nav = $("#nav");
  function onScroll() {
    hdr.classList.toggle("is-solid", window.scrollY > 20);
    if (window.scrollY < 300) $$("#nav a").forEach(function (a) { a.classList.remove("is-active"); });
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function closeNav() { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Menüyü aç"); }
  burger.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    hdr.classList.add("is-solid");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* Aktif bölüm vurgusu */
  if ("IntersectionObserver" in window) {
    var links = {};
    $$("a", nav).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          $$("a", nav).forEach(function (a) { a.classList.remove("is-active"); });
          links[e.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { so.observe(s); });
  }

  /* ---- Galeri ---- */
  var CATS = window.GALLERY_CATEGORIES || {};
  var ITEMS = window.GALLERY || [];
  var gal = $("#gallery"), filters = $("#filters");

  var PATTERNS = {
    ferforje: '<path d="M0 20L20 0L40 20L20 40Z" stroke-width="1.4"/><circle cx="20" cy="20" r="5" stroke-width="1.4"/><circle cx="0" cy="0" r="3"/><circle cx="40" cy="0" r="3"/><circle cx="0" cy="40" r="3"/><circle cx="40" cy="40" r="3"/>',
    kapi: '<path d="M4 0v40M12 0v40M20 0v40M28 0v40M36 0v40M0 10h40" stroke-width="1.6"/><circle cx="20" cy="30" r="3"/>',
    sineklik: '<path d="M0 5h40M0 15h40M0 25h40M0 35h40M5 0v40M15 0v40M25 0v40M35 0v40" stroke-width=".8"/>',
    celik: '<path d="M0 40L20 0L40 40M0 40h40M10 20h20" stroke-width="1.6"/>',
    cati: '<path d="M0 30h6l4-12h8l4 12h8l4-12h6" stroke-width="1.6"/><path d="M0 10h40" stroke-width=".8"/>',
    hayvancilik: '<path d="M0 12h40M0 28h40M6 0v40M34 0v40" stroke-width="1.6"/><rect x="16" y="16" width="8" height="8" rx="1"/>'
  };
  var ICONS = {
    ferforje: '<path d="M8 28V12a8 8 0 0 1 16 0v16M16 28V6M4 28h24"/>',
    kapi: '<path d="M4 28V6M28 28V6M7 27V10h8v17M17 27V10h8v17"/>',
    sineklik: '<rect x="5" y="4" width="22" height="24" rx="1.5"/><path d="M5 12h22M5 20h22M13 4v24M21 4v24"/>',
    celik: '<path d="M3 16 16 7l13 9M6 16h20M6 16v12M26 16v12M11 16l5-6 5 6"/>',
    cati: '<path d="M3 17 16 8l13 9M7 17v11h18V17"/>',
    hayvancilik: '<path d="M3 10h26M3 20h26M7 6v22M25 6v22"/><rect x="13" y="12" width="6" height="6" rx="1"/>'
  };
  function placeholder(cat) {
    var id = "p" + Math.random().toString(36).slice(2, 8);
    var pat = PATTERNS[cat] || PATTERNS.celik;
    return '<div class="ph" aria-hidden="true"><svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">' +
      '<defs><pattern id="' + id + '" width="40" height="40" patternUnits="userSpaceOnUse"><g fill="none" stroke="#3a4049">' + pat + '</g></pattern>' +
      '<radialGradient id="' + id + 'g" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#ff7a1a" stop-opacity=".18"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22262c"/><stop offset="1" stop-color="#16191d"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#' + id + 'b)"/><rect width="400" height="300" fill="url(#' + id + ')"/><rect width="400" height="300" fill="url(#' + id + 'g)"/></svg>' +
      '<span class="ph__ic"><svg viewBox="0 0 32 32">' + (ICONS[cat] || ICONS.celik) + '</svg></span></div>';
  }
  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function render(cat) {
    if (!gal) return;
    var list = ITEMS.filter(function (it) { return cat === "all" || it.category === cat; });
    gal.innerHTML = list.map(function (it, i) {
      var label = CATS[it.category] || "";
      if (it.src) {
        return '<figure class="gal__item" style="animation-delay:' + (i * 40) + 'ms">' +
          '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '" loading="lazy" decoding="async">' +
          '<button type="button" data-src="' + esc(it.src) + '" data-cap="' + esc(it.title) + '" aria-label="' + esc(it.title) + ' — büyüt"></button>' +
          '<figcaption class="gal__cap"><b>' + esc(it.title) + '</b><small>' + esc(label) + '</small></figcaption></figure>';
      }
      return '<figure class="gal__item gal__item--ph" style="animation-delay:' + (i * 40) + 'ms">' + placeholder(it.category) +
        '<figcaption class="gal__cap"><b>' + esc(it.title) + '</b><small class="soon">Fotoğraf yakında</small></figcaption></figure>';
    }).join("");
    /* Yüklenemeyen fotoğraf olursa yer tutucuya dön */
    $$("img", gal).forEach(function (img) {
      img.addEventListener("error", function () {
        var fig = img.closest(".gal__item"), it = ITEMS.filter(function (x) { return x.src === img.getAttribute("src"); })[0] || {};
        var btn = fig.querySelector("button"); if (btn) btn.remove();
        img.outerHTML = placeholder(it.category);
      });
    });
  }
  if (filters) {
    var used = {}; ITEMS.forEach(function (it) { used[it.category] = 1; });
    var keys = ["all"].concat(Object.keys(CATS).filter(function (k) { return used[k]; }));
    filters.innerHTML = keys.map(function (k, i) {
      return '<button type="button" data-cat="' + k + '" aria-pressed="' + (i === 0) + '">' + (k === "all" ? "Tümü" : esc(CATS[k])) + "</button>";
    }).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render(b.getAttribute("data-cat"));
    });
  }
  render("all");

  /* Lightbox */
  var lb = $("#lightbox");
  if (lb && gal) {
    gal.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-src]"); if (!b) return;
      $("#lbImg").src = b.getAttribute("data-src");
      $("#lbImg").alt = b.getAttribute("data-cap");
      $("#lbCap").textContent = b.getAttribute("data-cap");
      if (lb.showModal) lb.showModal();
    });
    $("#lbClose").addEventListener("click", function () { lb.close(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---- Görünür olunca beliren öğeler ---- */
  var rv = $$(".card, .why__list li, .step, .proj__draw, .proj__info, .contact__list li, .sec__head");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    rv.forEach(function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) {
          var sib = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
          e.target.style.transitionDelay = Math.min(sib, 6) * 60 + "ms";
          e.target.classList.add("in"); io.unobserve(e.target);
          setTimeout(function (t) { t.style.transitionDelay = ""; }, 1300, e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  }
})();
