const COMMENTS_PER_LOADING = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsBlock = bigPicture.querySelector('.social__comments');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');
const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsRenderedCount = commentsCountBlock.querySelector('span:nth-child(1)');
const commentsTotalCount = commentsCountBlock.querySelector('span:nth-child(2)');
const exampleComment = document.querySelector('.social__comment');

let currentPhotoComments;

function createComment(commentObj) {
  const comment = exampleComment.cloneNode(true);
  const avatar = comment.querySelector('img');
  const message = comment.querySelector('p');
  avatar.src = commentObj.avatar;
  avatar.alt = commentObj.name;
  message.textContent = commentObj.message;
  return comment;
}

loadCommentsButton.addEventListener('click', (evt) => {
  const alreadyRendered = parseInt(commentsRenderedCount.textContent, 10);
  const newlyRendered = renderBatchOfComments(currentPhotoComments);
  commentsRenderedCount.textContent = (alreadyRendered + newlyRendered).toString();
  evt.preventDefault();
});

function renderBatchOfComments(comments) {
  const alreadyRendered = parseInt(commentsCountBlock.textContent, 10);
  const notRendered = comments.length - alreadyRendered;
  const toRender = Math.min(COMMENTS_PER_LOADING, notRendered);
  for (let i = alreadyRendered; i < alreadyRendered + toRender; i++) {
    const comment = createComment(comments[i]);
    commentsBlock.append(comment);
  }
  return toRender;
}

function renderComments(parent, comments) {
  commentsTotalCount.textContent = comments.length;
  commentsRenderedCount.textContent = '0';
  commentsBlock.innerHTML = '';
  commentsRenderedCount.textContent = renderBatchOfComments(comments).toString();
  currentPhotoComments = comments;
}

export {renderComments};
