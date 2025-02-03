import { SCALE_MIN, SCALE_MAX, SCALE_DEFAULT, SCALE_STEP } from './constants.js';

const scaleButtonMinus = document.querySelector('.scale__control--smaller');
const scaleButtonPlus = document.querySelector('.scale__control--bigger');
const scaleInputValue = document.querySelector('.scale__control--value');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');

let scaleCurrent = SCALE_DEFAULT;

const scaleImage = (value) => {
  pictureUploadPreview.style.transform = `scale(${value / SCALE_DEFAULT})`;
  scaleInputValue.value = `${value}%`;
};

const resetScale = () => {
  scaleImage(SCALE_DEFAULT);
  scaleInputValue.value = `${SCALE_DEFAULT}%`;
  scaleCurrent = SCALE_DEFAULT;
};

const onMinusButtonClick = () => {
  if (scaleCurrent > SCALE_MIN) {
    scaleCurrent = scaleCurrent - SCALE_STEP;
    scaleImage(scaleCurrent);
  }
};

const onPlusButtonClick = () => {
  if (scaleCurrent < SCALE_MAX) {
    scaleCurrent = scaleCurrent + SCALE_STEP;
    scaleImage(scaleCurrent);
  }
  if (scaleCurrent === SCALE_MAX) {
    resetScale();
  }
};

scaleButtonMinus.addEventListener('click', onMinusButtonClick);
scaleButtonPlus.addEventListener('click', onPlusButtonClick);

export { resetScale, pictureUploadPreview };
