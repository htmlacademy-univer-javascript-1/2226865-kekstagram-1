import {renderComments} from './comments.js';

const ESC_KEYCODE = 27;

const bigPicture = document.querySelector('.big-picture');
const closePictureButton = document.querySelector('.big-picture__cancel');
const pictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const pictureLikesCount = bigPicture.querySelector('.likes-count');
const pictureDescription = bigPicture.querySelector('.social__caption');

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

closePictureButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
});

//TODO fix creating listener for every photo
const adjustDisplayingAsBigPicture = (picture, post) =>
  picture.addEventListener('click', () => {
    pictureImg.setAttribute('src', post.url);
    pictureLikesCount.textContent = post.likes;
    pictureDescription.textContent = post.description;
    renderComments(bigPicture, post.comments);
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

export {adjustDisplayingAsBigPicture};

