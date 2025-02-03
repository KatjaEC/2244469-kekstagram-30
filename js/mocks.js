import { openModalWindow } from './modal-window.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MAX_POSTED_COMMENTS = 500;
const AVATARS_COUNT = 6;

const DESCRIPTIONS = [
  'Мороз и солнце; день чудесный!',
  'Еще ты дремлешь, друг прелестный',
  'Пора, красавица, проснись: Открой сомкнуты негой взоры',
  'Навстречу северной Авроры',
  'Звездою севера явись!'
];

const NAMES = [
  'Elizabeth',
  'Alex',
  'Артем',
  'Аленка',
  'Дзера',
  'Julia',
  'Uchiyama',
  'Carl',
  'Оленька',
  'Фаби',
  'Аврора',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueRandomInteger = (a, b) => {
  const arr = [];
  return function () {
    let flag = true;
    let randomInteger;
    while (flag) {
      randomInteger = getRandomInteger(a, b);
      if (!arr.includes(randomInteger)) {
        arr.push(randomInteger);
        flag = false;
      }
    }
    return randomInteger;
  };
};

const getPhotoId = getUniqueRandomInteger(1, PHOTOS_COUNT);
const getImageId = getUniqueRandomInteger(1, PHOTOS_COUNT);
const getCommentID = getUniqueRandomInteger(0, MAX_POSTED_COMMENTS);

const getComment = () => ({
  id: getCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const getComments = (n) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(getComment());
  }
  return arr;
};

const getPhoto = () => ({
  id: getPhotoId(),
  url: `photos/${getImageId()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: getComments(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)),
});

const getPhotos = (n) => {
  const photos = [];
  for (let i = 0; i < n; i++) {
    photos.push(getPhoto());
  }
  return photos;
};

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

const photosArray = getPhotos(PHOTOS_COUNT);

export { photosArray, getPhotos, renderPictures, picturesArray };
