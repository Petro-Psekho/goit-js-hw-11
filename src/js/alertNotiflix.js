import Notiflix from 'notiflix';
import { refs } from './refs';

export function wrongSearchQuery() {
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

export function endOfSearchResults() {
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

export function numberOfImages(totalHits) {
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

export {};
