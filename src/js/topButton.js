import { refs } from './refs';

refs.toTopBtn.addEventListener('click', onTopScroll);
window.addEventListener('scroll', onScrollToTopBtn);

export function onScrollToTopBtn() {
  const offsetTrigger = 1000;
  const pageOffset = window.pageYOffset;

  pageOffset > offsetTrigger
    ? refs.toTopBtn.classList.remove('is-hidden')
    : refs.toTopBtn.classList.add('is-hidden');
}

export function onTopScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export {};
