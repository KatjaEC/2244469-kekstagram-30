const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные с сервера',
  POST_DATA: 'Не удалось отправить форму',
};

const SubmitButtonStatus = {
  SENDING: 'Публикую...',
  IDLE: 'Опубликовать',
};

const UPLOAD_FILE_TYPES = ['png', 'jpeg', 'jpg'];

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const TIMEOUT = 5000;
const COMMENTS_TO_LOAD = 5;
const HASHTAGS_MAX_NUMBER = 5;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const DESCRIPTION_MAX_LENGTH = 140;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;

const EFFECTS = {
  default: {
    filter: 'none',
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
};

const SLIDER_DEFAULT_MAX = 100;
const SLIDER_DEFAULT_MIN = 100;
const SLIDER_DEFAULT_STEP = 1;

export {
  BASE_URL,
  Route,
  ErrorText,
  RANDOM_PHOTOS_COUNT,
  DEBOUNCE_DELAY,
  TIMEOUT,
  SubmitButtonStatus,
  UPLOAD_FILE_TYPES,
  COMMENTS_TO_LOAD,
  HASHTAGS_MAX_NUMBER,
  HASHTAG_REGEX,
  DESCRIPTION_MAX_LENGTH,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_DEFAULT,
  SCALE_STEP,
  EFFECTS,
  SLIDER_DEFAULT_MAX,
  SLIDER_DEFAULT_MIN,
  SLIDER_DEFAULT_STEP
};
