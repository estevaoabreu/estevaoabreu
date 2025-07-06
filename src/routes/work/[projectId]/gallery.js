export function setupGallery() {
  /** @type {NodeListOf<HTMLImageElement>} */
  const galleryImages = document.querySelectorAll('main img');

  /** @type {HTMLElement | null} */
  const lightbox = document.getElementById('lightbox');

  /** @type {HTMLImageElement | null} */
  const lightboxImage = /** @type {HTMLImageElement | null} */ (document.getElementById('lightbox-image'));

  /** @type {HTMLButtonElement | null} */
  const closeButton = document.querySelector('.close-button');

  /** @type {HTMLButtonElement | null} */
  const prevButton = document.querySelector('.prev-button');

  /** @type {HTMLButtonElement | null} */
  const nextButton = document.querySelector('.next-button');

  if (!lightbox || !lightboxImage || !closeButton || !prevButton || !nextButton) {
    return;
  }

  let currentIndex = 0;

  /**
   * @param {number} index
   */
  function showImage(index) {
    const image = galleryImages[index];
    if (!image) return;
    if (!lightboxImage) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    currentIndex = index;
    if (!lightbox) return;
    lightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
  }

  /**
   * @param {number} direction
   */
  function navigate(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  }

  galleryImages.forEach((image, index) => {
    image.addEventListener('click', (e) => {
      e.preventDefault();
      showImage(index);
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  nextButton.addEventListener('click', () => navigate(1));
  prevButton.addEventListener('click', () => navigate(-1));

  /**
   * @param {KeyboardEvent} e
   */
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      navigate(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      navigate(-1);
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}