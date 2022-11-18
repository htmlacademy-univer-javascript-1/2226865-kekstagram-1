const ESC_KEYCODE = 27;

const uploadForm = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('#upload-file');
const closeFormButton = document.querySelector('#upload-cancel');

uploadPhotoInput.addEventListener('change', () => {
  uploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const closeForm = () => {
  document.body.classList.remove('modal-open');
  uploadForm.classList.add('hidden');
  uploadPhotoInput.name = '';
};

closeFormButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evnt) => {
  if (evnt.keyCode === ESC_KEYCODE) {
    evnt.preventDefault();
    closeForm();
  }
});
