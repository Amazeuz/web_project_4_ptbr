import { PopupWithImage } from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import { gallery, imageBlock } from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const cardsGallery = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
];

function addNewCard({firstField, secondField}) {
  const cardData = [{
    name: firstField,
    link: secondField,
  }];

  const newCard = new Section({
    items: cardData,
    renderer: (item) => {
      const card = new Card(item, ".default-template");
      const cardElement = card.generateCard();
      const newImage = new PopupWithImage(imageBlock, cardElement)
      newImage.setEventListeners()
      newCard.addItem(cardElement);
    }
  }, gallery);

  newCard.renderItems()
}

Array.from(document.querySelectorAll('.form')).forEach((popup) => {
  let popupElement;

  if (popup.id === 'form-edit') {
    popupElement = new PopupWithForm(popup, (data) => {
      const userInfo = new UserInfo(data)
      userInfo.setUserInfo()
    })
    popupElement.setEventListeners();
  }

  else {
    popupElement = new PopupWithForm(popup, addNewCard)
    popupElement.setEventListeners();
  }

  popupElement.getTriggerElement().addEventListener('click', () => {
    popupElement.open()
  })
})

const cardList = new Section({
  items: cardsGallery,
  renderer: (item) => {
    const card = new Card(item, ".default-template");
    const cardElement = card.generateCard();
    const newImage = new PopupWithImage(imageBlock, cardElement)
    newImage.setEventListeners()
    cardList.addItem(cardElement);
  }
}, gallery);

cardList.renderItems()