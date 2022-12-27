import Notiflix from 'notiflix';
import axios from 'axios';
import fetchQuery from './js/fetchQuery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputField: document.querySelector('input[name=searchQuery]'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
};

// console.log(refs.loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearchForm);
// refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearchForm(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value;

  console.log(searchQuery);
  console.log(fetchQuery(searchQuery));

  fetchQuery(searchQuery).then(rendersMarkup).catch(console.error());
}

// function onLoadMoreBtn(e) {
//   e.preventDefault();
// }

function rendersMarkup(queryResurt) {
  console.log(queryResurt.totalHits);

  if (queryResurt.hits.length === 0) {
    return wrongSearchQuery();
  }

  const markup = queryResurt.hits
    .map(result => {
      return `<div class="photo-card">
  <img src="${result.webformatURL}" alt="${result.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item"><b>Likes</b>${result.likes}</p>
    <p class="info-item"><b>Views</b>${result.views}</p>
    <p class="info-item"><b>Comments</b>${result.comments}</p>
    <p class="info-item"><b>Downloads</b>${result.downloads}</p>
  </div>
</div>`;
    })
    .join('');
  refs.gallery.innerHTML = markup;
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
