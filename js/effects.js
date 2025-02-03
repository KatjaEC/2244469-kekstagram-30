import { pictureUploadPreview } from './scale.js';
import { EFFECTS, SLIDER_DEFAULT_MAX, SLIDER_DEFAULT_MIN, SLIDER_DEFAULT_STEP } from './constants.js';

const effectsList = document.querySelector('.effects__list');
const effectIntensityContainer = document.querySelector('.img-upload__effect-level');
const effectIntensityValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

const currentEffect = {
  filter: '',
  unit: '',
};

noUiSlider.create(effectSlider, {
  range: {
    min: SLIDER_DEFAULT_MIN,
    max: SLIDER_DEFAULT_MAX,
  },
  start: SLIDER_DEFAULT_MAX,
  step: SLIDER_DEFAULT_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetToDefault = () => {
  effectIntensityContainer.classList.add('hidden');
  pictureUploadPreview.style.filter = EFFECTS.default.filter;
  effectIntensityValue.value = SLIDER_DEFAULT_MAX;
};

const setEffect = () => {
  effectIntensityValue.value = effectSlider.noUiSlider.get();
  pictureUploadPreview.style.filter = `${currentEffect.filter}(${effectIntensityValue.value}${currentEffect.unit})`;
};

const sliderUpdate = ({ min, max, step }) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });
};

effectsList.addEventListener('change', (evt) => {
  const effectInput = evt.target.closest('.effects__radio');
  if (evt.target.value === EFFECTS.default.filter) {
    resetToDefault();
  } else {
    effectIntensityContainer.classList.remove('hidden');
    currentEffect.filter = EFFECTS[effectInput.value].filter;
    currentEffect.unit = EFFECTS[effectInput.value].unit;
    sliderUpdate(EFFECTS[effectInput.value]);
  }
});

effectSlider.noUiSlider.on('update', setEffect);

export { resetToDefault };
