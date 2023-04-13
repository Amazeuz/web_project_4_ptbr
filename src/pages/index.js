import { PopupWithImage } from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import { gallery, imageBlock, cardsGallery } from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js'
import {} from '../scripts/imports.js'

const popupImage = new PopupWithImage(imageBlock)
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

function addNewCard({firstField, secondField}) {
  const cardData = [{
    name: firstField,
    link: secondField,
  }];

  const newCard = new Section({
    items: cardData,
    renderer: (item) => {
      const card = new Card(item, ".default-template", handleCardClick);
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
    const card = new Card(item, ".default-template", handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, gallery);

cardList.renderItems();