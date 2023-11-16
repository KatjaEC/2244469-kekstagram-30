import { isEscKey } from './utils.js';

const uploadErrorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadErrorMessageElement = uploadErrorMessageTemplate.cloneNode('true');
const uploadErrorMessageText = uploadErrorMessageTemplate.querySelector('.error__title');
document.body.appendChild(uploadErrorMessageElement);
uploadErrorMessageElement.classList.add('hidden');

const uploadSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const uploadSuccessMessageElement = uploadSuccessMessageTemplate.cloneNode('true');
const uploadSuccessMessageText = uploadSuccessMessageTemplate.querySelector('.success__title');
document.body.appendChild(uploadSuccessMessageElement);
uploadSuccessMessageElement.classList.add('hidden');

const hideErrorMessage = () => uploadErrorMessageElement.classList.add('hidden');

const showErrorMessage = (message) => {
  uploadErrorMessageElement.classList.remove('hidden');
  uploadErrorMessageText.textContent = message;
};

// uploadSuccessButton.addEventListener('click', () => uploadSuccessMessageElement.classList.add('hidden'));

const closeSuccessMessage = () => {
  uploadSuccessMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// (evt.target === uploadSuccessButton || evt.target.classList.contains('success'))

const showSuccessMessage = (message) => {
  uploadSuccessMessageElement.classList.remove('hidden');
  uploadSuccessMessageText.textContent = message;
  document.addEventListener('keydown', onDocumentKeydown);
};

const onSuccessButtonClick = () => {
  uploadSuccessMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadSuccessMessageElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
    onSuccessButtonClick();
  }
});

const onErrorButtonClick = () => {
  uploadErrorMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadErrorMessageElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('error__title') || evt.target.classList.contains('error')) {
    onErrorButtonClick();
  }
});

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    uploadSuccessMessageElement.classList.add('hidden');
    uploadErrorMessageElement.classList.add('hidden');
  }
}

export { hideErrorMessage, showErrorMessage, showSuccessMessage, closeSuccessMessage };
