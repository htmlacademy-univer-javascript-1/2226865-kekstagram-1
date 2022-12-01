import {showError} from './networkErrors.js';

const SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const LOAD_POSTS_ERROR_MESSAGE = 'Ошибка загрузки фотографий';


function receivePostsAsync(receivePostsFun) {
  fetch(SERVER_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showError(LOAD_POSTS_ERROR_MESSAGE, `${response.status} ${response.statusText}`);
      return [];
    })
    .then((posts) => receivePostsFun(posts))
    .catch((reason) => showError(LOAD_POSTS_ERROR_MESSAGE, reason));
}

export {receivePostsAsync};
