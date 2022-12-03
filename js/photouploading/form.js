import {form, imagePreview} from './common.js';
import {hashtagsInput, imgDescriptionInput, validateForm, validateFile} from './validation.js';
import {resetEffects} from './effects.js';
import {resetScale} from './scaling.js';
import {sendPostAsync} from '../network.js';
import {showError, showSuccess} from '../notification.js';

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';
const UPLOAD_POST_ERROR_MESSAGE = 'Ошибка загрузки фотографии';
const ESC_KEYCODE = 27;

const fileChooser = document.querySelector('#upload-file');
const imgEditBlock = form.querySelector('.img-upload__overlay');
const closeFormButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('#upload-submit');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    return;
  }
  submitButton.setAttribute('disabled', '');
  sendPostAsync(
    SERVER_URL,
    new FormData(evt.target),
    () => {
      closeForm();
      showSuccess();
    },
    (reason) => {
      closeForm(false);
      showError(UPLOAD_POST_ERROR_MESSAGE, reason, showForm);
    },
    () => {
      submitButton.removeAttribute('disabled');
    });
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  if (!validateFile(file.name)) {
    showError('Некорректный формат файла', file.name);
    return;
  }
  imagePreview.src = URL.createObjectURL(file);
  showForm();
});

closeFormButton.addEventListener('click', closeForm);
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESC_KEYCODE && !(evt.target.matches('input') || evt.target.matches('textarea'))) {
    evt.preventDefault();
    closeForm();
  }
});

function showForm() {
  imgEditBlock.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeForm(reset = true) {
  document.body.classList.remove('modal-open');
  imgEditBlock.classList.add('hidden');
  if (!reset) {
    return;
  }
  fileChooser.value = '';
  imgDescriptionInput.value = '';
  hashtagsInput.value = '';
  resetEffects();
  resetScale();
}

