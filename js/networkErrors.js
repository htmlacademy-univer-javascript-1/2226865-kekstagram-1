const errorTemplate = document.querySelector('#error').content.querySelector('section');
const errorBlock = errorTemplate.cloneNode(true);
const errorMessage = errorBlock.querySelector('.error__title');
const errorReason = errorBlock.querySelector('.error__reason');
const closeErrorButton = errorBlock.querySelector('button');

document.querySelector('body').append(errorBlock);
errorBlock.classList.add('hidden');
closeErrorButton.addEventListener('click', () => {
  errorBlock.classList.add('hidden');
});

export function showError(message, reason, buttonText) {
  errorBlock.classList.remove('hidden');
  errorMessage.textContent = message;
  errorReason.textContent = reason === undefined ? '' : reason;
  closeErrorButton.textContent = buttonText === undefined ? 'Закрыть' : buttonText;
}
