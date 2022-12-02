import {adjustDisplayingAsBigPicture} from './bigpicture.js';
import {adjustRenderFiltering} from './thumbnailsFiltering.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
const picturesContainer = document.createDocumentFragment();

function createThumbnail(post) {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').setAttribute('src', post.url);
  const pictureInfo = thumbnail.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__comments').textContent = post.comments.length;
  pictureInfo.querySelector('.picture__likes').textContent = post.likes;
  return thumbnail;
}

function doRendering(posts) {
  picturesBlock.querySelectorAll('.picture').forEach((picture) => picture.remove());
  for (const post of posts) {
    const thumbnail = createThumbnail(post);
    adjustDisplayingAsBigPicture(thumbnail, post);
    picturesContainer.appendChild(thumbnail);
  }
  picturesBlock.appendChild(picturesContainer);
}

export function renderThumbnails(posts) {
  doRendering(posts);
  adjustRenderFiltering(posts, doRendering);
}


