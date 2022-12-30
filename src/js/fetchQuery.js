const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32395796-06911cceb0b80396a7d5298f8';
let page = 1;

export default async function fetchQuery(searchQuery, page) {
  const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 40,
    safesearch: true,
  });

  console.log(searchParams);

  try {
    const response = await fetch(
      `${BASE_URL}?${API_KEY}&q=${searchQuery}&${searchParams}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
