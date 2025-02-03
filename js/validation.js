import { HASHTAGS_MAX_NUMBER, HASHTAG_REGEX, DESCRIPTION_MAX_LENGTH } from './constants.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const userHashtagInput = document.querySelector('.text__hashtags');
const userDescriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const ErrorText = {
  INVALID_REPEATED_HASHTAG: 'Хэш-теги не должны повторяться',
  INVALID_HASHTAGS_NUMBER: `Максимальное количество хэш-тегов: ${HASHTAGS_MAX_NUMBER}`,
  INVALID_HASHTAG_SYNTAX: 'Некорректный хэш-тег'
};

const getHashtagsArray = (value) => value.trim().toLowerCase().split(' ').filter(Boolean);

const validateHashtagSyntax = (value) => getHashtagsArray(value).every((hashtag) => HASHTAG_REGEX.test(hashtag));

const validateHashtagUniqueness = (value) => {
  const uniqueHashtags = [];
  const hashtagsArray = getHashtagsArray(value);
  hashtagsArray.forEach((hashtag) => {
    if (!uniqueHashtags.includes(hashtag)) {
      uniqueHashtags.push(hashtag);
    }
  });
  return uniqueHashtags.length === hashtagsArray.length;
};

const validateHashtagsNumber = (value) => getHashtagsArray(value).length <= HASHTAGS_MAX_NUMBER;

const validateComment = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(
  userDescriptionInput,
  validateComment
);

pristine.addValidator(
  userHashtagInput,
  validateHashtagSyntax,
  ErrorText.INVALID_HASHTAG_SYNTAX,
  3,
  true
);

pristine.addValidator(
  userHashtagInput,
  validateHashtagUniqueness,
  ErrorText.INVALID_REPEATED_HASHTAG,
  2,
  true
);

pristine.addValidator(
  userHashtagInput,
  validateHashtagsNumber,
  ErrorText.INVALID_HASHTAGS_NUMBER,
  1,
  true
);

const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { pristine, isValid, resetValidation };
