import Notiflix from 'notiflix';
import axios from 'axios';
import fetchQuery from './js/fetchQuery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputField: document.querySelector('input[name=searchQuery]'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

refs.searchForm.addEventListener('submit', onSearchForm);

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onInfinityScroll, options);
let nextPage = 1;

function onInfinityScroll(entries, observer) {
  const lastSearchQuery = refs.inputField.value;

  entries.forEach(entry => {
    nextPage += 1;

    if (entry.isIntersecting) {
      fetchQuery(lastSearchQuery, nextPage)
        .then(rendersMarkup)
        .catch(console.error());
    }
  });
}

function onSearchForm(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value;

  console.log(searchQuery);
  console.log(fetchQuery(searchQuery));

  fetchQuery(searchQuery).then(rendersMarkup).catch(console.error());
}

function rendersMarkup(queryResult) {
  console.log(queryResult.totalHits);
  console.log(queryResult.hits);

  if (queryResult.hits.length === 0) {
    return wrongSearchQuery();
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
  refs.gallery.innerHTML = markup;

  observer.observe(refs.guard);
}

function wrongSearchQuery() {
  Notiflix.Report.failure(
    'Sorry',
    'There are no images matching your search query',
    'Please try again'
  );
  refs.inputField.value = '';
  refs.gallery.innerHTML = '';
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
