import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32395796-06911cceb0b80396a7d5298f8';
export let curentPage = 1;
export const perPage = 40;

export async function fetchQuery(searchQuery) {
  const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    page: curentPage,
    per_page: perPage,
    safesearch: true,
  });

  // searchParams.forEach(element => {
  //   console.log(element);
  // });

  // console.log(searchParams);

  try {
    const response = await axios.get(
      `${BASE_URL}?${API_KEY}&q=${searchQuery}&${searchParams}`
    );
    console.log('response__axios__response', response);
    console.log('response__axios__data', response.data);
    console.log('response__axios__hits', response.data.hits);
    console.log('response__axios__totalHits', response.data.totalHits);
    // console.log('до incrementPage', curentPage);
    incrementPage();
    // console.log('после incrementPage', curentPage);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function incrementPage() {
  curentPage += 1;
}

export {};
