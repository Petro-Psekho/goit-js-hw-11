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

// <span class="material-symbols-outlined">downloading</span>

function rendersMarkup(queryResurt) {
  console.log(queryResurt.totalHits);

  if (queryResurt.hits.length === 0) {
    return wrongSearchQuery();
  }

  const markup = queryResurt.hits
    .map(result => {
      return `      <div class="photo-card">
        <div class="photo-card__face photo-card__face--up">
          <div class="info">
            <img src="${result.webformatURL}" alt="${result.tags}" loading="lazy" />
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

//   const markup = queryResurt.hits
//     .map(result => {
//       return `<div class="photo-card">
//   <img src="${result.webformatURL}" alt="${result.tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item"><b>Likes</b>${result.likes}</p>
//     <p class="info-item"><b>Views</b>${result.views}</p>
//     <p class="info-item"><b>Comments</b>${result.comments}</p>
//     <p class="info-item"><b>Downloads</b>${result.downloads}</p>
//   </div>
// </div>`;
//     })
//     .join('');
//   refs.gallery.innerHTML = markup;

const markup = queryResurt.hits
  .map(result => {
    return `      <div class="photo-card">
        <div class="photo-card__face photo-card__face--up">
          <div class="info">
            <img src="${result.webformatURL}" alt="${result.tags}" loading="lazy" />
          </div>
        </div>

        <div class="photo-card__face photo-card__face--dwn">
          <div class="info">
            <p class="info-item"><b>Likes_</b>${result.likes}</p>
            <p class="info-item"><b>Views</b>${result.views}</p>
            <p class="info-item"><b>Comments</b>${result.comments}</p>
            <p class="info-item"><b>Downloads</b>${result.downloads}</p>
          </div>
        </div>
      </div>`;
  })
  .join('');
refs.gallery.innerHTML = markup;
