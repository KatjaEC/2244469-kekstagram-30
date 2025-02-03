import { isEscKey } from './utils.js';
import { onFormEscKeydown, closeImageUploadForm } from './form.js';
import { TIMEOUT } from './constants.js';

const uploadErrorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadErrorMessageElement = uploadErrorMessageTemplate.cloneNode('true');
const uploadErrorMessageText = uploadErrorMessageTemplate.querySelector('.error__title');

const uploadSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const uploadSuccessMessageElement = uploadSuccessMessageTemplate.cloneNode('true');
const uploadSuccessMessageText = uploadSuccessMessageTemplate.querySelector('.success__title');

const dataDownloadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const dataDownloadErrorElement = dataDownloadErrorTemplate.cloneNode('true');
const dataDownloadErrorMessage = dataDownloadErrorTemplate.querySelector('.data-error__title');


const removeErrorMessage = () => document.body.removeChild(dataDownloadErrorElement);

const closeErrorMessage = () => setTimeout(removeErrorMessage, TIMEOUT);

const showErrorMessage = (message) => {
  document.body.appendChild(dataDownloadErrorElement);
  dataDownloadErrorMessage.textContent = message;
  closeErrorMessage();
};

const removeUploadMessage = () => {
  const existingMessageElement = document.querySelector('.success') || document.querySelector('.error');
  existingMessageElement.remove();
};

const showSuccessMessage = (message) => {
  document.body.appendChild(uploadSuccessMessageElement);
  uploadSuccessMessageText.textContent = message;
  document.addEventListener('keydown', onDocumentKeydown);
};

const onSuccessButtonClick = () => {
  removeUploadMessage();
  closeImageUploadForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showUploadErrorMessage = (message) => {
  document.body.appendChild(uploadErrorMessageElement);
  uploadErrorMessageText.textContent = message;
  document.addEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('keydown', onFormEscKeydown);
};

const closeUploadErrorMessage = () => {
  removeUploadMessage();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onFormEscKeydown);
};

const onErrorButtonClick = () => closeUploadErrorMessage();

uploadSuccessMessageElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
    onSuccessButtonClick();
  }
});

uploadErrorMessageElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
    onErrorButtonClick();
  }
});

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    onSuccessButtonClick();
  }
}

function onErrorEscKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    onErrorButtonClick();
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
}

export { showErrorMessage, showUploadErrorMessage, showSuccessMessage };
