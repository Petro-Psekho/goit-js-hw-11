import { refs } from './refs';
import { rendersMarkup } from './rendersMarkup';
import { curentPage, perPage, fetchQuery, resetPage } from './fetchQuery';
import { lightbox } from './simpleLightbox';

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

export let observer = new IntersectionObserver(onInfinityScroll, options);

async function onInfinityScroll(entries, observer) {
  const lastSearchQuery = refs.inputField.value;

  await entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchQuery(lastSearchQuery).then(rendersMarkup).catch(console.error());
    }
  });
  lightbox.refresh();
}

export {};
