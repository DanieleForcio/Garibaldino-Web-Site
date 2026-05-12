(() => {
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
