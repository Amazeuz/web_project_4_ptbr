import * as index from './index.js'

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const imageExit = document.querySelector('.image-click__exit');
const editSave = document.querySelector('#form__items-save');
const exitButtons = document.querySelectorAll('.form__exit');
const cardCreate = document.querySelector('#form__items-create');

function closePopup () {
  index.opacity.classList.remove('page-opacity');

  const blocks = [index.form, index.formImage, index.imageBlock];
  blocks.forEach((block) => {
    block.style.opacity = 0;
  });

  setTimeout(() => { index.form.classList.add('form_hidden'); }, 500);
  setTimeout(() => { index.formImage.classList.add('form_hidden'); }, 500);
  setTimeout(() => { index.imageBlock.classList.add('image-click_hidden') }, 500);
  index.opacity.removeEventListener('click', closePopup);
}

exitButtons.forEach(function (item) {
  item.addEventListener("click", closePopup);
});

addButton.addEventListener('click', index.clickAddButton);
editButton.addEventListener('click', index.clickEditButton);
imageExit.addEventListener('click', closePopup);
editSave.addEventListener('click', index.changeUserInfo);
cardCreate.addEventListener('click', index.addCardInputs);

export {exitButtons, closePopup};