import {closePopup} from './utils.js';
import { Card } from './card.js';

const opacity = document.querySelector('#opacity-block');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const formImage = document.querySelector('#form-image');
const imageBlock = document.querySelector('.image-click');

const cardsGallery = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

function addNewCard () {
  const cardInputName = document.querySelector('#form-image__input-title');
  const cardInputLink = document.querySelector('#form-image__input-url');

  const cardData = {
    name: cardInputName.value,
    link: cardInputLink.value,
    imageModal: imageBlock,
    pageOpacity: opacity
  }

  const card = new Card(cardData, '.default-template')
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);

  cardInputName.setAttribute('placeholder', 'Título');
  cardInputLink.setAttribute('placeholder', 'URL da Imagem');
  closePopup();
  cardInputName.value = '';
  cardInputLink.value = '';
}

function changeUserInfo () {
  const oldName = document.querySelector('.profile__name');
  const oldAbout = document.querySelector('.profile__about');
  const newName = document.querySelector('#form__input-name');
  const newAbout = document.querySelector('#form__input-about');

  if (newName.value.length > 0 && newAbout.value.length > 0) {
    oldName.textContent = newName.value;
    oldAbout.textContent = newAbout.value;
    newName.value = '';
    newAbout.value = '';
    closePopup();
  }
}

cardsGallery.forEach( function (item) {
  const cardData = {
    name: item.name,
    link: item.link,
    imageModal: imageBlock,
    pageOpacity: opacity
  }

  const card = new Card(cardData,'.default-template');
  const cardElement = card.generateCard();
  gallery.append(cardElement)
});

export {opacity, form, formImage, imageBlock, changeUserInfo, addNewCard, gallery}