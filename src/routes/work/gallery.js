export function setupSectionInteractions() {
  const galleryImages = document.querySelectorAll('main img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeButton = document.querySelector('.close-button');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  let currentIndex = 0;
  let imagesArray = [];

  galleryImages.forEach((image, index) => {
    imagesArray.push({
      src: image.getAttribute('src'),
      alt: image.getAttribute('alt')
    });

    image.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox(currentIndex);
    });
  });

  function openLightbox(index) {
    lightboxImage.src = imagesArray[index].src;
    lightboxImage.alt = imagesArray[index].alt;
    lightbox.classList.remove('hidden');
  }

  closeButton.addEventListener('click', function () {
    lightbox.classList.add('hidden');
  });

  nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % imagesArray.length;
    openLightbox(currentIndex);
  });

  prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
    openLightbox(currentIndex);
  });
}