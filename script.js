// Mobile navigatie, jaartal in footer, knop 'omhoog'

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");

if (toggle && nav && menu) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  // Zakryt' menu po kliku na ssylku
  menu.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });

  // ESC zakryvaet menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });

  // Klik vne menu zakryvaet ego
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

// God v futere
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Knopka «naverh»
const toTop = document.querySelector(".to-top");
if (toTop) {
  const onScroll = () => {
    const show = window.scrollY > 600;
    toTop.style.opacity = show ? 1 : 0;
    toTop.style.transform = show ? "translateY(0)" : "translateY(8px)";
    toTop.setAttribute("aria-hidden", show ? "false" : "true");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  onScroll();
}

// ===== VIDEO MODAL =====
const videoItems = document.querySelectorAll(".gallery__video");
const modal = document.getElementById("videoModal");
const modalVideo = modal?.querySelector("video");
const modalSource = modalVideo?.querySelector("source");
const closeBtn = modal?.querySelector(".video-modal__close");
const overlay = modal?.querySelector(".video-modal__overlay");

videoItems.forEach((item) => {
  item.addEventListener("click", () => {
    const src = item.dataset.video;
    modalSource.src = src;
    modalVideo.load();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modalVideo.play();
  });
});

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modalVideo.pause();
  modalSource.src = "";
}

closeBtn?.addEventListener("click", closeModal);
overlay?.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
