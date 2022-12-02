import '../../nouislider/nouislider.js';
import {form, imagePreview} from './common.js';

const slider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');

const effectInfos = {
  'chrome': makeEffectInfo('chrome', 'grayscale', '', 0, 1, 0, 0.1),
  'sepia': makeEffectInfo('sepia', 'sepia', '', 0, 1, 0, 0.1),
  'marvin': makeEffectInfo('marvin', 'invert', '%', 0, 100, 0.1, 1),
  'phobos': makeEffectInfo('phobos', 'blur', 'px', 0, 3, 0, 0.1),
  'heat': makeEffectInfo('heat', 'brightness', '', 1, 3, 1, 0.1),
  'none': makeEffectInfo('none', 'none', '', 0, 0, 0, 0)
};

slider.classList.add('hidden');
let currentEffectInfo = effectInfos['none'];
noUiSlider.create(slider, currentEffectInfo.sliderOptions);

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  imgPreview.style.filter = currentEffectInfo.getStyle(value);
  effectLevel.value = value.toString();
});

form.addEventListener('change', (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const newEffect = evt.target.value;
  changeEffect(newEffect);
});

function changeEffect(newEffect) {
  imgPreview.classList.remove(currentEffectInfo.effectClass);
  if (newEffect === 'none') {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
  currentEffectInfo = effectInfos[newEffect];
  imgPreview.classList.add(currentEffectInfo.effectClass);
  slider.noUiSlider.updateOptions(currentEffectInfo.sliderOptions);
  slider.noUiSlider.set(currentEffectInfo.sliderOptions.start);
}

function makeEffectInfo(effectName, styleName, styleValueUnit, sliderMin, sliderMax, sliderStart, sliderStep) {
  return {
    effectClass: `effects__preview--${effectName}`,
    sliderOptions: makeSliderOptions(sliderMin, sliderMax, sliderStart, sliderStep),
    getStyle(value) {
      return `${styleName}(${value}${styleValueUnit}`;
    },
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

export function resetEffects() {
  changeEffect('none');
}

