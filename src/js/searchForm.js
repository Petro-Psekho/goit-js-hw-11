import { refs } from './refs';
import { fetchQuery, resetPage } from './fetchQuery';
import { rendersMarkup } from './rendersMarkup';
import { wrongSearchQuery } from './alertNotiflix';

refs.searchForm.addEventListener('submit', onSearchForm);

export function onSearchForm(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';

  resetPage();

  const searchQuery = e.target.elements.searchQuery.value;

  // if (searchQuery === '') {
  //   return wrongSearchQuery();
  // }

  fetchQuery(searchQuery).then(rendersMarkup).catch(console.error());
}

export {};
