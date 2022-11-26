import {form, hashtagsInput, imgDescriptionInput, validateForm} from './uploadFormValidation.js';
import './photoEffects.js';

const ESC_KEYCODE = 27;

const uploadPhotoInput = document.querySelector('#upload-file');
const imgEditBlock = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('#upload-cancel');

form.addEventListener('submit', (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
});

uploadPhotoInput.addEventListener('change', () => {
  imgEditBlock.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeFormButton.addEventListener('click', closeForm);
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESC_KEYCODE && !(evt.target.matches('input') || evt.target.matches('textarea'))) {
    evt.preventDefault();
    closeForm();
  }
});

function closeForm() {
  document.body.classList.remove('modal-open');
  imgEditBlock.classList.add('hidden');
  uploadPhotoInput.name = '';
  imgDescriptionInput.value = '';
  hashtagsInput.value = '';
}

