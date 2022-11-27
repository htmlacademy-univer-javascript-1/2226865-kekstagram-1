import '../../nouislider/nouislider.js';
import {form, imagePreview} from './common.js';

const slider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');

const effectInfos = {
  'chrome': makeEffectInfo('grayscale', '', 0, 1, 0, 0.1),
  'sepia': makeEffectInfo('sepia', '', 0, 1, 0, 0.1),
  'marvin': makeEffectInfo('invert', '%', 0, 100, 0.1, 1),
  'phobos': makeEffectInfo('blur', 'px', 0, 3, 0, 0.1),
  'heat': makeEffectInfo('brightness', '', 1, 3, 1, 0.1)
};

slider.classList.add('hidden');
let currentEffectClass = 'effects__preview--none';
let currentEffectInfo = effectInfos['chrome']; //does not matter, slider is hidden
noUiSlider.create(slider, currentEffectInfo.sliderOptions);

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  const filterInfo = currentEffectInfo.filterInfo;
  imagePreview.style.filter = styleForFilter(filterInfo, value);
  effectLevel.value = value.toString();
});

form.addEventListener('change', (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const newEffect = evt.target.value;
  changeEffectClass(newEffect);
  if (newEffect === 'none') {
    imagePreview.style.filter = 'none';
    slider.classList.add('hidden');
    return;
  }
  currentEffectInfo = effectInfos[newEffect];
  slider.noUiSlider.updateOptions(effectInfos[newEffect].sliderOptions);
  if (slider.classList.contains('hidden')) {
    slider.classList.remove('hidden');
  }
});

function styleForFilter(filterInfo, value) {
  return `${filterInfo.filterName}(${value}${filterInfo.valueUnit})`;
}

function changeEffectClass(newEffectName) {
  const newEffectClass = `effects__preview--${newEffectName}`;
  imagePreview.classList.remove(currentEffectClass);
  imagePreview.classList.add(newEffectClass);
  currentEffectClass = newEffectClass;
}

function makeEffectInfo(filterName, filterValueUnit, sliderMin, sliderMax, sliderStart, sliderStep) {
  return {
    filterInfo: makeFilterInfo(filterName, filterValueUnit),
    sliderOptions: makeSliderOptions(sliderMin, sliderMax, sliderStart, sliderStep)
  };
}

function makeFilterInfo(filterName, valueUnit) {
  return {
    filterName: filterName,
    valueUnit: valueUnit,
  };
}

function makeSliderOptions(min, max, start, step) {
  return {
    range: {min, max},
    start: start,
    step: step,
    connect: 'lower'
  };
}


