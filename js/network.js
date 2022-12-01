import {showError} from './networkErrors.js';

const SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';

function receivePostsAsync(receivePostsFun) {
  fetch(SERVER_ADDRESS)
    .catch((reason) => showError(reason))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch((reason) => showError('Ошибка загрузки фотографий', reason))
    .then((posts) => receivePostsFun(posts));
}

export {receivePostsAsync};
