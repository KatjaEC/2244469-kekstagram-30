import { openModalWindow } from './modal-window.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListFragment = document.createDocumentFragment();

const picturesArray = [];

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
};

const getPicturePreview = (pictures) => {
  pictures.forEach(({ id, url, description, likes, comments }) => {
    removePictures();
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = String(likes);
    pictureElement.querySelector('.picture__comments').textContent = String(comments.length);
    picturesListFragment.appendChild(pictureElement);
  });
  picturesList.appendChild(picturesListFragment);
};

const renderPictures = (data) => {
  picturesArray.length = 0;
  picturesArray.push(...data.slice());
  getPicturePreview(picturesArray);
};

picturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const id = parseInt((evt.target.closest('.picture').dataset.id), 10);
    const picture = picturesArray.find((item) => item.id === id);
    evt.preventDefault();
    openModalWindow(picture);
  }
});

export { renderPictures, getPicturePreview, picturesList, pictureTemplate, removePictures };
