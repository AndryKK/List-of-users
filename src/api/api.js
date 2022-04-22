const BASE_URL = 'https://randomuser.me/api/';

export const usersfromServer = () => {
  return fetch(`${BASE_URL}`)
    .then(r => r.json());
};
