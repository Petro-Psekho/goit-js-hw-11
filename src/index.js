import Notiflix from 'notiflix';
import { curentPage, perPage, fetchQuery, resetPage } from './js/fetchQuery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputField: document.querySelector('input[name=searchQuery]'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSearchForm);

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onInfinityScroll, options);

async function onInfinityScroll(entries, observer) {
  const lastSearchQuery = refs.inputField.value;

  await entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchQuery(lastSearchQuery).then(rendersMarkup).catch(console.error());
    }
  });
}

function onSearchForm(e) {
  e.preventDefault();

  resetPage();

  refs.gallery.innerHTML = '';

  const searchQuery = e.target.elements.searchQuery.value;

  fetchQuery(searchQuery).then(rendersMarkup).catch(console.error());
}

function rendersMarkup(queryResult) {
  // console.log('queryResult.totalHits', queryResult.totalHits);
  // console.log('queryResult.hits.length', queryResult.hits);
  console.log('queryResult', queryResult);

  const totalHits = queryResult.totalHits;

  let totalPagesCount = Math.ceil(queryResult.totalHits / perPage);
  console.log('totalPagesCount', totalPagesCount);

  console.log('perPage', perPage);
  console.log('curentPage', curentPage);

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

  lightbox.refresh();

  observer.observe(refs.guard);
}

function wrongSearchQuery() {
  Notiflix.Report.failure(
    'Sorry',
    'There are no images matching your search query',
    'Please try again',
    {
      width: '500px',
      svgSize: '80px',
      titleFontSize: '20px',
      messageFontSize: '21px',
      buttonFontSize: '16px',
    }
  );
  refs.inputField.value = '';
  refs.gallery.innerHTML = '';
}

function endOfSearchResults() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results.",
    {
      width: '500px',
      position: 'center-center',
      timeout: 3000,
      backOverlay: true,
      clickToClose: true,
      fontSize: '15px',
      closeButton: true,
      useFontAwesome: true,
    }
  );
}

function numberOfImages(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images`, {
    width: '800px',

    position: 'center-bottom',
    timeout: 2000,
    backOverlay: false,
    clickToClose: true,
    fontSize: '15px',
    closeButton: false,
    useFontAwesome: false,
  });
}

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
