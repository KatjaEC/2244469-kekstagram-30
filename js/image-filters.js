import { getUniqueRandomInteger, setDebounce } from './utils.js';
import { getPicturePreview } from './previews.js';
import { RANDOM_PHOTOS_COUNT } from './constants.js';

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersForm = imageFiltersContainer.querySelector('.img-filters__form');

let currentFilter = imageFiltersContainer.querySelector(`#${Filters.DEFAULT}`);
let activeButton = currentFilter;

const filterRandomly = (picturesArray) => {
  const randomPictures = [];
  const getRandomIndex = getUniqueRandomInteger(0, picturesArray.length - 1);
  const max = Math.min(RANDOM_PHOTOS_COUNT, picturesArray.length);
  while (randomPictures.length < max) {
    randomPictures.push(getRandomIndex());
  }
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

const switchActiveButton = (chosenFilterButton) => {
  if (chosenFilterButton !== activeButton) {
    chosenFilterButton.classList.add('img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    activeButton = chosenFilterButton;
  }
};

const renderAnew = (picturesArray, filter) => {
  if (filter !== currentFilter) {
    const filteredPictures = filterOptions[filter.id](picturesArray);
    getPicturePreview(filteredPictures);
    currentFilter = filter;
  }
};

const debouncedRendering = setDebounce(renderAnew);

const setPicturesFilter = (picturesArray) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  imageFiltersForm.addEventListener('click', (evt) => {
    const chosenFilter = evt.target.closest('.img-filters__button');
    if (chosenFilter) {
      switchActiveButton(chosenFilter);
      debouncedRendering(picturesArray, chosenFilter);
    }
  });
};

export { setPicturesFilter };
