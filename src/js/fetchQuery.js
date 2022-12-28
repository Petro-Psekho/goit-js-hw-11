const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32395796-06911cceb0b80396a7d5298f8';
const imageType = 'image_type=photo';
const orientation = 'orientation=horizontal';
// const safeSearch = 'safesearch=true';

export default async function fetchQuery(searchQuery) {
  const options = {
    method: 'GET',
  };

  try {
    const searchParams = new URLSearchParams({
      page: 5,
      per_page: 12,
      safesearch: true,
    });

    const response = await fetch(
      `${BASE_URL}?${API_KEY}&q=${searchQuery}&${imageType}&${orientation}&${searchParams}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
