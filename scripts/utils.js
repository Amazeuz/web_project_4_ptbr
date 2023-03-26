import {opacity, formImage, form, imageBlock, changeUserInfo, addNewCard} from './index.js'

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const imageExit = document.querySelector('.image-click__exit');
const editSave = document.querySelector('#form__items-save');
const exitButtons = document.querySelectorAll('.form__exit');
const cardCreate = document.querySelector('#form__items-create');

function clickOutsidePopup () {
  setTimeout(() => { opacity.addEventListener('click', closePopup); }, 500);
}

function clickAddButton () {
  formImage.classList.add('opacity-style');
  opacity.classList.add('page-opacity');
  formImage.classList.remove('form_hidden');
  clickOutsidePopup();
}

function clickEditButton () {
  form.classList.add('opacity-style');
  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden');
  clickOutsidePopup();
}

function closePopup () {
  opacity.classList.remove('page-opacity');

  const blocks = [form, formImage, imageBlock];
  blocks.forEach((block) => {
    block.classList.remove('opacity-style');
  });

  setTimeout(() => { form.classList.add('form_hidden'); }, 500);
  setTimeout(() => { formImage.classList.add('form_hidden'); }, 500);
  setTimeout(() => { imageBlock.classList.add('image-click_hidden') }, 500);
  opacity.removeEventListener('click', closePopup);
}

exitButtons.forEach(function (item) {
  item.addEventListener("click", closePopup);
});

addButton.addEventListener('click', clickAddButton);
editButton.addEventListener('click', clickEditButton);
imageExit.addEventListener('click', closePopup);
editSave.addEventListener('click', changeUserInfo);
cardCreate.addEventListener('click', addNewCard);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
});

export {exitButtons, closePopup};