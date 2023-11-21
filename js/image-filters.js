import { getUniqueRandomInteger, setDebounce } from './utils.js';
import { getPicturePreview, removePictures } from './previews.js';
import { RANDOM_PHOTOS_COUNT } from './constants';

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersForm = imageFiltersContainer.querySelector('.img-filters__form');

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = imageFiltersContainer.querySelector(`#${Filters.DEFAULT}`);

const filterRandomly = (picturesArray) => {
  const randomPictures = [];
  const getRandomIndex = getUniqueRandomInteger(0, picturesArray.length - 1);
  for (let i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
    randomPictures.push(getRandomIndex());
  }
  // console.log(randomPictures);
  return randomPictures.map((index) => picturesArray[index]);
};

const compareRating = (pictureA, pictureB) => {
  const a = pictureA.comments.length;
  const b = pictureB.comments.length;
  return b - a;
};

const filterMostDiscussed = (picturesArray) => {
  const filteredArray = [...picturesArray].sort(compareRating);
  return filteredArray;
};

const filterOptions = {
  [Filters.DEFAULT]: (picturesArray) => picturesArray,
  [Filters.RANDOM]: filterRandomly,
  [Filters.DISCUSSED]: filterMostDiscussed
};

const renderAnew = (picturesArray, filter) => {
  if (filter !== currentFilter) {
    const filteredPictures = filterOptions[filter.id](picturesArray);
    removePictures();
    getPicturePreview(filteredPictures);
    currentFilter = filter;
  }
};

const switchActiveButton = (chosenFilterButton) => {
  if (chosenFilterButton !== currentFilter) {
    chosenFilterButton.classList.add('img-filters__button--active');
    currentFilter.classList.remove('img-filters__button--active');
    chosenFilterButton = currentFilter;
  }
};

const debouncedRendering = setDebounce(renderAnew);

const setPicturesFilter = (picturesArray) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');

  imageFiltersForm.addEventListener('click', (evt) => {
    const clickedButton = evt.target.closest('.img-filters__button');

    if (clickedButton) {
      switchActiveButton(clickedButton);
      debouncedRendering(picturesArray, clickedButton);
    }
  });
};

export { setPicturesFilter };