import { refs } from './refs';
import { curentPage, perPage, fetchQuery, resetPage } from './fetchQuery';
import { rendersMarkup } from './rendersMarkup';

refs.searchForm.addEventListener('submit', onSearchForm);

export function onSearchForm(e) {
  e.preventDefault();

  resetPage();

  refs.gallery.innerHTML = '';

  const searchQuery = e.target.elements.searchQuery.value;

  fetchQuery(searchQuery).then(rendersMarkup).catch(console.error());
}

export {};
