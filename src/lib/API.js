const PROXY = 'http://cors-anywhere.herokuapp.com/';
const API_URL = 'http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6';

function getData() {
  return fetch(`${PROXY}${API_URL}`).then(response => response.json());
}

export default {
  getData,
};
