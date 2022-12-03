import {form, imagePreview} from './common.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const scaleField = form.querySelector('.img-upload__scale');
const scaleValue = scaleField.querySelector('.scale__control--value');
const decreaseScaleButton = scaleField.querySelector('.scale__control--smaller');
const increaseScaleButton = scaleField.querySelector('.scale__control--bigger');

function applyScale(scale) {
  scaleValue.value = `${scale}%`;
  imagePreview.style = `transform: scale(${scale / 100})`;
}

function onScaleChange(scaleLimit, scaleToLimitComparator, scalingFun) {
  const currentScale = parseInt(scaleValue.value.replace('%', ''), 10);
  if (currentScale === scaleLimit) {
    return;
  }
  const newScale = scalingFun(currentScale, SCALE_STEP);
  applyScale(scaleToLimitComparator(newScale, scaleLimit) > 0 ? scaleLimit : newScale);
}

export function resetScale() {
  applyScale(100);
}

increaseScaleButton.addEventListener('click', () => onScaleChange(SCALE_MAX,
  (a, b) => a - b, (curScale, step) => curScale + step));

decreaseScaleButton.addEventListener('click', () => onScaleChange(SCALE_MIN,
  (a, b) => b - a, (curScale, step) => curScale - step));

