import {showError, showSuccess} from './notification.js';

const SERVER_LOAD_FROM = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER_UPLOAD_TO = 'https://26.javascript.pages.academy/kekstagram';
const LOAD_POSTS_ERROR_MESSAGE = 'Ошибка загрузки фотографий';
const UPLOAD_POST_ERROR_MESSAGE = 'Ошибка загрузки фотографии';


function receivePostsAsync(receivePostsFun) {
  fetch(SERVER_LOAD_FROM)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showError(LOAD_POSTS_ERROR_MESSAGE, reasonFromResponse(response));
      return [];
    })
    .then((posts) => receivePostsFun(posts))
    .catch((reason) => showError(LOAD_POSTS_ERROR_MESSAGE, reason));
}

function sendFormAsync(formData) {
  fetch(SERVER_UPLOAD_TO,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        showSuccess();
      } else {
        showError(UPLOAD_POST_ERROR_MESSAGE, reasonFromResponse(response));
      }
    })
    .catch((reason) => showError(UPLOAD_POST_ERROR_MESSAGE, reason));
}

function reasonFromResponse(response) {
  return `${response.status} ${response.statusText}`;
}

export {receivePostsAsync, sendFormAsync};
