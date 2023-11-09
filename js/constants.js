const PHOTOS_COUNT = 25;
const DESCRIPTIONS = [
  'Мороз и солнце; день чудесный!',
  'Еще ты дремлешь, друг прелестный',
  'Пора, красавица, проснись: Открой сомкнуты негой взоры',
  'Навстречу северной Авроры',
  'Звездою севера явись!',
  'Скользя по утреннему снегу',
  'Друг милый, предадимся бегу нетерпеливого коня',
  'И навестим поля пустые, леса, недавно столь густые',
  'И берег, милый для меня.'
];
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const COMMENTS_TO_LOAD = 5;
const MAX_POSTED_COMMENTS = 200;
const AVATARS_COUNT = 6;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];
const NAMES = [
  'Elizabeth',
  'Alex',
  'Артем',
  'Аленка',
  'Дзера',
  'Julia',
  'Uchiyama',
  'Carl'
];
const HASHTAGS_MAX_NUMBER = 5;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const DESCRIPTION_MAX_LENGTH = 140;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

export {
  PHOTOS_COUNT,
  DESCRIPTIONS,
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  COMMENTS_TO_LOAD,
  MAX_POSTED_COMMENTS,
  AVATARS_COUNT,
  MESSAGES,
  NAMES,
  HASHTAGS_MAX_NUMBER,
  HASHTAG_REGEX,
  DESCRIPTION_MAX_LENGTH,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_STEP
};
