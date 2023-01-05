import { refs } from './refs';

export function smoothScroll() {
  const { height } = refs.gallery.firstElementChild.getBoundingClientRect();

  console.log({ height });

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

export {};
