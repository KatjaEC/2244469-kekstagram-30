import { isEscKey } from './utils.js';
import { resetScale } from './scale.js';
import { resetToDefault } from './effects.js';
import { isValid, resetValidation } from './validation.js';
import { sendData } from './api.js';
import { showSuccessMessage, showUploadErrorMessage } from './status-messages.js';
import { SubmitButtonStatus, UPLOAD_FILE_TYPES } from './constants.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadContainer = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const imageUploadCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const userHashtagInput = imageUploadContainer.querySelector('.text__hashtags');
const userDescriptionInput = imageUploadContainer.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const effectsPreviewImages = imageUploadForm.querySelectorAll('.effects__preview');

const renderUploadImage = () => {
  const imageUploadFile = imageUploadInput.files[0];
  const imageFile = imageUploadFile.name.toLowerCase();
  const acceptableFileType = UPLOAD_FILE_TYPES.some((it) => imageFile.endsWith(it));
  if (acceptableFileType) {
    imageUploadPreview.src = URL.createObjectURL(imageUploadFile);

    effectsPreviewImages.forEach((image) => {
      image.style.backgroundImage = `url(${imageUploadPreview.src})`;
    });
  }
};

imageUploadInput.addEventListener('change', () => {
  resetToDefault();
  renderUploadImage();
  imageUploadContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
});

const closeImageUploadForm = () => {
  imageUploadForm.reset();
  resetValidation();
  resetScale();
  imageUploadContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

imageUploadCloseButton.addEventListener('click', closeImageUploadForm());

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonStatus.SENDING;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonStatus.IDLE;
};

const setFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValid()) {
      disableSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessMessage();
          closeImageUploadForm();
        })
        .catch(showUploadErrorMessage)
        .finally(() => enableSubmitButton());
    }
  });
};

imageUploadForm.addEventListener('reset', () => {
  closeImageUploadForm();
  resetValidation();
  enableSubmitButton();
});

function onFormEscKeydown(evt) {
  if (isEscKey(evt) && evt.target !== userHashtagInput && evt.target !== userDescriptionInput) {
    evt.preventDefault();
    closeImageUploadForm();
    document.removeEventListener('keydown', onFormEscKeydown);
  }
}

export { setFormSubmit, closeImageUploadForm, onFormEscKeydown };
