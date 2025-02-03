import { COMMENTS_TO_LOAD } from './constants.js';
import { socialCommentsShown } from './modal-window.js';

const socialCommentsContainer = document.querySelector('.social__comments');
const socialCommentsItem = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

const commentsArray = [];
let shownCommentsCount = 0;
let totalCommentsCount = 0;

const renderButton = () => {
  if (totalCommentsCount <= shownCommentsCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderCommentElement = (showComment) => {
  const commentElement = socialCommentsItem.cloneNode(true);
  const commentElementImage = commentElement.querySelector('.social__picture');
  commentElementImage.src = showComment.avatar;
  commentElementImage.alt = showComment.name;
  socialCommentsShown.textContent = String(shownCommentsCount);
  commentElement.querySelector('.social__text').textContent = showComment.message;
  return commentElement;
};

const renderComments = () => {
  const commentsFragment = document.createDocumentFragment();
  commentsArray.splice(0, COMMENTS_TO_LOAD).forEach((item) => {
    shownCommentsCount++;
    commentsFragment.appendChild(renderCommentElement(item));
  });
  socialCommentsContainer.appendChild(commentsFragment);
  renderButton();
};

const setSocialComments = (data) => {
  socialCommentsContainer.innerHTML = '';
  shownCommentsCount = 0;
  commentsArray.length = 0;
  commentsArray.push(...data.slice());
  totalCommentsCount = commentsArray.length;
};

commentsLoader.addEventListener('click', () => {
  renderComments();
});

export { renderComments, setSocialComments };
