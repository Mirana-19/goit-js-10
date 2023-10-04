const BASE_URL = 'https://api.thecatapi.com/v1';
const BREEDS_ENDPOINT = '/breeds';
const CAT_ENDPOINT = '/images/search';

const OPTIONS = {
  method: 'GET',
  headers: {
    'x-api-key':
      'live_ug92vhAAFLlJ5lhazyZqtvna0I4Zjhicwtql3c7Cio9ekedqQNwOntcnp8MpIap8',
  },
};

export function fetchBreeds() {
  const url = `${BASE_URL}${BREEDS_ENDPOINT}`;

  return fetch(`${url}`, OPTIONS).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  const PARAMS = new URLSearchParams({
    breed_ids: breedId,
  });

  const url = `${BASE_URL}${CAT_ENDPOINT}?${PARAMS}`;

  return fetch(url, OPTIONS).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
}
