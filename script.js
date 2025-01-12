const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button-left');
const nextButton = document.querySelector('.carousel-button-right');
const indicators = document.querySelectorAll('.carousel-indicator');
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = `${index * 100}%`;
};
slides.forEach(setSlidePosition);

const updateSlide = (currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateIndicators = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove('current-indicator');
  targetIndicator.classList.add('current-indicator');
};

const moveToNextSlide = () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentIndicator = document.querySelector('.current-indicator');
  const targetIndicator =
    currentIndicator.nextElementSibling || indicators[0];

  updateSlide(currentSlide, nextSlide);
  updateIndicators(currentIndicator, targetIndicator);
};

const moveToPrevSlide = () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide =
    currentSlide.previousElementSibling || slides[slides.length - 1];
  const currentIndicator = document.querySelector('.current-indicator');
  const targetIndicator =
    currentIndicator.previousElementSibling ||
    indicators[indicators.length - 1];

  updateSlide(currentSlide, prevSlide);
  updateIndicators(currentIndicator, targetIndicator);
};

nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = slides[index];
    const currentIndicator = document.querySelector('.current-indicator');

    updateSlide(currentSlide, targetSlide);
    updateIndicators(currentIndicator, indicator);
  });
});

// Auto-slide
let autoSlide = setInterval(moveToNextSlide, 5000);
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
  autoSlide = setInterval(moveToNextSlide, 5000);
});
