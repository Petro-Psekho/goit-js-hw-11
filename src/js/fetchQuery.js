const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32395796-06911cceb0b80396a7d5298f8';
const IMAGE_TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const SAFESEARCH = 'safesearch=true';

export default async function fetchQuery(searchQuery) {
  const options = {
    method: 'GET',
  };

  try {
    const response = await fetch(
      `${BASE_URL}?${API_KEY}&q=${searchQuery}&${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}&page=2&per_page=5 `,
      options
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
