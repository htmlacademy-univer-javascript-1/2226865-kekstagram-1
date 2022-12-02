import {checkStringLength} from './util.js';
import '../pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const imgDescriptionInput = document.querySelector('.text__description');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const HASHTAG_REGEXP = '#[A-Za-zА-Яа-яЁё0-9]{1,19}';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

pristine.addValidator(hashtagsInput, validateHashtags, 'Некорректный ввод хэш-тегов');
pristine.addValidator(imgDescriptionInput, (value) => checkStringLength(value, 140),
  'Длина комментария не должна превышать 140 символов');

function validateHashtags(hashtagsString) {
  if (hashtagsString.length === 0) {
    return true;
  }
  const hashtagsRegexp = new RegExp(`^${HASHTAG_REGEXP}( ${HASHTAG_REGEXP})*$`);
  if (!hashtagsRegexp.test(hashtagsString)) {
    return false;
  }
  const hashtagsSet = new Set();
  const hashtags = hashtagsString.split(/ /);
  for (const hashtag of hashtags) {
    const loweredCase = hashtag.toLowerCase();
    if (hashtagsSet.has(loweredCase)) {
      return false;
    }
    hashtagsSet.add(loweredCase);
  }
  return hashtagsSet.size <= 5;
}

function validateFile(filename) {
  return FILE_TYPES.some((filetype) => filename.endsWith(`.${filetype}`));
}

function validateForm() {
  return pristine.validate();
}

export {form, hashtagsInput, imgDescriptionInput, validateForm, validateFile};
