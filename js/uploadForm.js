const uploadForm = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('#upload-file');

uploadPhotoInput.addEventListener('change', () => {
  uploadForm.classList.remove('hidden');
});
