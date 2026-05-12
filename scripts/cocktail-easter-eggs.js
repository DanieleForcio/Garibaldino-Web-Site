(function () {
  const triggers = Array.from(document.querySelectorAll('.easter-egg-trigger'));
  if (!triggers.length) return;

  const modal = document.getElementById('easter-egg-modal');
  const modalImage = document.getElementById('easter-egg-image');
  const modalClose = modal ? Array.from(modal.querySelectorAll('[data-modal-close]')) : [];
  let activeAudio = null;
  let activeTrigger = null;

  const stopActiveAudio = () => {
    if (!activeAudio) return;
    activeAudio.pause();
    activeAudio.currentTime = 0;
    if (activeTrigger) activeTrigger.setAttribute('aria-pressed', 'false');
    activeAudio = null;
    activeTrigger = null;
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.removeAttribute('src');
    document.body.classList.remove('modal-open');
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const type = trigger.dataset.easterEgg;
      if (type === 'audio') {
        if (activeTrigger === trigger && activeAudio) {
          stopActiveAudio();
          return;
        }
        stopActiveAudio();
        closeModal();
        const src = trigger.dataset.audioSrc;
        if (!src) return;
        const audio = new Audio(src);
        audio.addEventListener('ended', stopActiveAudio);
        audio.play().then(() => {
          activeAudio = audio;
          activeTrigger = trigger;
          trigger.setAttribute('aria-pressed', 'true');
        }).catch(() => {
          console.warn('Audio easter egg non disponibile:', src);
        });
      }

      if (type === 'image' && modal && modalImage) {
        stopActiveAudio();
        const src = trigger.dataset.imageSrc;
        if (!src) return;
        modalImage.src = src;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      }
    });
  });

  modalClose.forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      stopActiveAudio();
    }
  });
})();
