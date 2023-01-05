import { refs } from './refs';
import { curentPage, perPage } from './fetchQuery';
import {
  wrongSearchQuery,
  endOfSearchResults,
  numberOfImages,
} from './alertNotiflix';
import { lightbox } from './simpleLightbox';
import { observer } from './infinityScroll';

import { smoothScroll } from './smoothPageScrolling';

export function rendersMarkup(queryResult) {
  const totalHits = queryResult.totalHits;

  let totalPagesCount = Math.ceil(queryResult.totalHits / perPage);

  if (curentPage === 2 && queryResult.hits.length > 1) {
    numberOfImages(totalHits);
  }

  if (queryResult.hits.length === 0) {
    return wrongSearchQuery();
  }

  if (curentPage >= totalPagesCount) {
    observer.unobserve(refs.guard);
    return endOfSearchResults();
  }

  const markup = queryResult.hits
    .map(result => {
      return `      <div class="photo-card">
        <div class="photo-card__face photo-card__face--up">
          <div class="info">
            <a href="${result.webformatURL}"><img src="${result.largeImageURL}" alt="${result.tags}" loading="lazy" /></a>
          </div>
        </div>

        <div class="photo-card__face photo-card__face--dwn">
          <div class="info">
            <p class="info-item"><b class="material-symbols-outlined">mode_heat</b>${result.likes}</p>
            <p class="info-item"><b class="material-symbols-outlined">visibility</b>${result.views}</p>
            <p class="info-item"><b class="material-symbols-outlined">comment</b>${result.comments}</p>
            <p class="info-item"><b class="material-symbols-outlined">downloading</b>${result.downloads}</p>
          </div>

        </div>
        </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  smoothScroll();

  lightbox.refresh();

  observer.observe(refs.guard);
}

export {};
