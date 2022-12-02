import {form, imagePreview} from './common.js';
import {hashtagsInput, imgDescriptionInput, validateForm, validateFile} from './validation.js';
import {resetEffects} from './effects.js';
import {resetScale} from './scaling.js';
import {sendFormAsync} from '../network.js';
import {showError} from '../notification.js';

const ESC_KEYCODE = 27;

const fileChooser = document.querySelector('#upload-file');
const imgEditBlock = form.querySelector('.img-upload__overlay');
const closeFormButton = form.querySelector('#upload-cancel');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    return;
  }
  sendFormAsync(new FormData(evt.target));
  closeForm();
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  if (!validateFile(file.name)) {
    showError('Некорректный формат файла', file.name);
    return;
  }
  imagePreview.src = URL.createObjectURL(file);
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
  fileChooser.value = '';
  imgDescriptionInput.value = '';
  hashtagsInput.value = '';
  resetEffects();
  resetScale();
}

