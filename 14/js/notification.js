const errorTemplate = document.querySelector('#error').content.querySelector('section');
const successfulUploadTemplate = document.querySelector('#success').content.querySelector('section');

const errorBlock = errorTemplate.cloneNode(true);
const successBlock = successfulUploadTemplate.cloneNode(true);

const errorMessage = errorBlock.querySelector('.error__title');
const errorReason = errorBlock.querySelector('.error__reason');

const closeErrorButton = errorBlock.querySelector('.error__button');
const closeSuccessButton = successBlock.querySelector('.success__button');

document.body.append(errorBlock);
document.body.append(successBlock);

closeSuccessButton.addEventListener('click', () => {
  successBlock.classList.add('hidden');
});

closeErrorButton.addEventListener('click', () => {
  errorBlock.classList.add('hidden');
});

export function showError(message, reason, callback) {
  errorBlock.classList.remove('hidden');
  errorMessage.textContent = message;
  errorReason.textContent = reason === undefined ? '' : reason;
  if (callback !== undefined) {
    callback();
  }
}

export function showSuccess() {
  successBlock.classList.remove('hidden');
}
