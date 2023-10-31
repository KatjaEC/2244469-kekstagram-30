/*
  <!-- Шаблон изображения случайного пользователя -->
  <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template>
  */
import './modal-window.js';
import { PHOTOS_COUNT } from './constants.js';
import { getPhotos } from './data.js';

//Список фото, сюда добавляем
const picturesList = document.querySelector('.pictures');

//Шаблон для добавления фото
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//documentFragment
const picturesListFragment = document.createDocumentFragment();

//Удаление фото
const removePictures = () => {
  document.querySelectorAll('.picture').forEach((card) => {
    card.remove();
  });
};

const picturesArray = getPhotos(PHOTOS_COUNT);

const getPicturePreview = () => {
  picturesArray.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.url = url;
    pictureElement.description = description;
    pictureElement.likes = likes;
    pictureElement.comments = comments;
    picturesListFragment.appendChild(pictureElement);
  });
  removePictures();
  picturesList.appendChild(picturesListFragment);
};

getPicturePreview();

export { getPicturePreview, picturesList, pictureTemplate, removePictures };
