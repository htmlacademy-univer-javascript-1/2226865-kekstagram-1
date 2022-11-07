import {createPosts} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
const picturesContainer = document.createDocumentFragment();

const renderThumbnails = () => {
  for (const post of createPosts()) {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').setAttribute('src', post.url);
    const pictureInfo = thumbnail.querySelector('.picture__info');
    pictureInfo.querySelector('.picture__comments').textContent = post.comments.length;
    pictureInfo.querySelector('.picture__likes').textContent = post.likes;
    picturesContainer.appendChild(thumbnail);
  }
  picturesBlock.appendChild(picturesContainer);
};

export {renderThumbnails};
