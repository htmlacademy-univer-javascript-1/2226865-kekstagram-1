import {form, hashtagsInput, imgDescriptionInput, validateForm, validateFile} from './uploadFormValidation.js';
import {sendFormAsync} from './network.js';
import {showError} from './notification.js';
import './photoEffects.js';
import './photoScaling.js';

const ESC_KEYCODE = 27;

const imgPreview = form.querySelector('.img-upload__preview > img');
const uploadPhotoInput = document.querySelector('#upload-file');
const imgEditBlock = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('#upload-cancel');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    return;
  }
  sendFormAsync(new FormData(evt.target));
  closeForm();
});

uploadPhotoInput.addEventListener('change', () => {
  const file = uploadPhotoInput.files[0];
  if (!validateFile(file.name)) {
    showError('Некорректный формат файла', file.name);
    return;
  }
  imgPreview.src = URL.createObjectURL(file);
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

