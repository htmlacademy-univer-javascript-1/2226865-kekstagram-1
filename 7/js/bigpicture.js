const ESC_KEYCODE = 27;

const bigPicture = document.querySelector('.big-picture');
const pictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const pictureLikesCount = bigPicture.querySelector('.likes-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureCommentsCount = bigPicture.querySelector('.comments-count');
const pictureCommentsBlock = bigPicture.querySelector('.social__comments');

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evnt) => {
  if (evnt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
});

const layoutForComment = (comment) =>
  '<li class="social__comment">\n' +
  '    <img\n' +
  '        class="social__picture"\n' +
  `        src="${comment.avatar}"` +
  `        alt="${comment.name}"` +
  '        width="35" height="35">\n' +
  `    <p class="social__text">${comment.message}}</p>\n` +
  '</li>';

const displayComments = (comments) => {
  pictureCommentsBlock.innerHTML = '';
  comments.forEach((comment) => {
    const commentLayout = layoutForComment(comment);
    pictureCommentsBlock.insertAdjacentHTML('afterbegin', commentLayout);
  });
};

const adjustDisplayingAsBigPicture = (picture, post) =>
  picture.addEventListener('click', () => {
    pictureImg.setAttribute('src', post.url);
    pictureLikesCount.textContent = post.likes;
    pictureCommentsCount.textContent = post.comments.length;
    pictureDescription.textContent = post.description;
    displayComments(post.comments);
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

export {adjustDisplayingAsBigPicture};

