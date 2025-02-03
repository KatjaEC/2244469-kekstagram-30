import { isEscKey } from './utils.js';
import { renderComments, setSocialComments } from './comments.js';

const modalWindow = document.querySelector('.big-picture');
const modalCloseButton = modalWindow.querySelector('.cancel');
const fullPictureImage = document.querySelector('.big-picture__img img');
const fullPictureCaption = document.querySelector('.social__caption');
const fullPictureLikesCount = document.querySelector('.likes-count');
const socialCommentsShown = document.querySelector('.social__comment-shown-count');
const socialCommentsTotal = document.querySelector('.social__comment-total-count');

const renderModalWindow = (picture) => {
  fullPictureImage.src = picture.url;
  fullPictureCaption.textContent = picture.description;
  fullPictureLikesCount.textContent = String(picture.likes);
  socialCommentsShown.textContent = String(picture.comments.length);
  socialCommentsTotal.textContent = String(picture.comments.length);

  renderComments();
};

const showModalWindow = () => {
  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const openModalWindow = (picture) => {
  setSocialComments(picture.comments);
  renderModalWindow(picture);
  showModalWindow();
};

const closeModalWindow = () => {
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

modalCloseButton.addEventListener('click', () => closeModalWindow());

modalWindow.addEventListener('click', (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeModalWindow();
  }
});

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

export { openModalWindow, socialCommentsShown, showModalWindow };
