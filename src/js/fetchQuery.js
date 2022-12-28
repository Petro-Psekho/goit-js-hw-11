const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32395796-06911cceb0b80396a7d5298f8';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  page: 1,
  per_page: 40,
  safesearch: true,
});

export default async function fetchQuery(searchQuery) {
  const options = {
    method: 'GET',
  };

  try {
    const response = await fetch(
      `${BASE_URL}?${API_KEY}&q=${searchQuery}&${searchParams}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
