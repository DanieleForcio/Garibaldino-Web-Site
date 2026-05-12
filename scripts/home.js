(() => {
  const overlay = document.querySelector(".menu-overlay");
  const trigger = document.querySelector(".menu-trigger");
  const closeBtn = document.querySelector(".menu-overlay__close");

  if (overlay && trigger && closeBtn) {
    const links = Array.from(overlay.querySelectorAll("a"));
    const openMenu = () => {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
    };
    const closeMenu = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeMenu();
    });
    links.forEach((link) => link.addEventListener("click", closeMenu));
  }

  const carousel = document.querySelector(".story-carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".story-carousel__slide"));
  const dots = Array.from(carousel.querySelectorAll(".story-carousel__dot"));
  const buttons = Array.from(carousel.querySelectorAll(".story-carousel__btn"));
  let index = 0;

  const setActive = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const dir = Number(button.dataset.dir || 1);
      setActive(index + dir);
    });
  });

  setInterval(() => setActive(index + 1), 5000);
})();
