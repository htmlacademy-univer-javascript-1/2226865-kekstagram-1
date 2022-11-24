import {checkStringLength} from './util.js';
import '../pristine/pristine.min.js';

const ESC_KEYCODE = 27;
const HASHTAG_REGEXP = /#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const form = document.querySelector('.img-upload__form');
const uploadPhotoInput = document.querySelector('#upload-file');
const imgEditBlock = document.querySelector('.img-upload__overlay');
const hashtagsInput = document.querySelector('.text__hashtags');
const imgDescriptionInput = document.querySelector('.text__description');
const closeFormButton = document.querySelector('#upload-cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


uploadPhotoInput.addEventListener('change', () => {
  imgEditBlock.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const closeForm = () => {
  document.body.classList.remove('modal-open');
  form.classList.add('hidden');
  uploadPhotoInput.name = '';
  imgDescriptionInput.value = '';
  hashtagsInput.value = '';
};

function validateHashTag(value) {
  if (!value) {
    return true;
  }
  const hashtags = value.split(/\s+/);
  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEXP.test(hashtag)) {
      return false;
    }
  }
  return true;
}

pristine.addValidator(hashtagsInput, validateHashTag, 'Некорректный ввод хэш-тегов');
pristine.addValidator(imgDescriptionInput, (value) => checkStringLength(value, 140),
  'Длина комментария не должна превышать 140 символов');

closeFormButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    closeForm();
  }
});
