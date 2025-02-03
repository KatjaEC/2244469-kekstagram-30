import { DEBOUNCE_DELAY } from './constants.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueRandomInteger = (min, max) => {
  const indexNumbers = [];
  return () => {
    let currentIndex = getRandomInteger(min, max);
    if (indexNumbers.length === Math.floor(Math.max(min, max))) {
      return '';
    }
    while (indexNumbers.includes(currentIndex)) {
      currentIndex = getRandomInteger(min, max);
    }
    indexNumbers.push(currentIndex);
    return currentIndex;
  };
};

const isEscKey = (evt) => evt.key === 'Escape';

const setDebounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getUniqueRandomInteger, isEscKey, setDebounce };
