import Card from '../components/Card.js';
import { gallery, imageBlock, cardsGallery } from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import photoIconSrc from '../images/photo_image.png'
import FormValidator from '../components/FormValidator.js'
import {} from '../scripts/imports.js'

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_cohort_03",
  headers: {
    authorization: "49a188cf-9e1d-457c-becd-1d6b283140a7",
    "Content-Type": "application/json"
  }
});

const profilePhoto = document.querySelector('.profile__photo')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

function renderData(data) {
  profilePhoto.src = data.avatar
  profileName.textContent = data.name
  profileAbout.textContent = data.about
}

api.loadUserInfo().then(obj => {
  renderData(obj)
})


const popupImage = new PopupWithImage(imageBlock)
popupImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(document.querySelector('#form-confirmation'));
popupConfirmation.setEventListeners()

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

      const trashIcon = cardElement.querySelector('.item__trash-icon')
      trashIcon.addEventListener('click', () => {
        popupConfirmation.open()
        popupConfirmation.deleteCard(trashIcon)
      })
    }
  }, gallery);

  newCard.renderItems()
}

const cardList = new Section({
  items: cardsGallery,
  renderer: (item) => {
    const card = new Card(item, ".default-template", handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, gallery);

cardList.renderItems();

Array.from(document.querySelectorAll('.form')).forEach((popup) => {
  let popupElement;

  if (popup.id === 'form-edit') {
    popupElement = new PopupWithForm(popup, (data) => {
      const userInfo = new UserInfo(data)
      userInfo.setUserInfo()
    })
    popupElement.setEventListeners();
    popupElement.getTriggerElement().addEventListener('click', () => {
      popupElement.open()
    })
  }

  if (popup.id ==='form-image') {
    popupElement = new PopupWithForm(popup, addNewCard)
    popupElement.setEventListeners();
    popupElement.getTriggerElement().addEventListener('click', () => {
      popupElement.open()
    })
  }

  if (popup.id === 'form-confirmation') {
    popupElement = new PopupWithConfirmation(popup);
    popupElement.setEventListeners();

    const trashIcons = Array.from(document.querySelectorAll('.item__trash-icon'))
    trashIcons.forEach((trashIcon) => {
      trashIcon.addEventListener('click', () => {
        popupConfirmation.open()
        popupConfirmation.deleteCard(trashIcon)
      })
    })
  }
  /*if (popup.id === 'form-picture') {
    popupElement = new PopupWithForm(popup, api.changeProfilePicture)
    popupElement.setEventListeners();
    popupElement.getTriggerElement().addEventListener('click', () => {
      popupElement.open()
    })
  }*/
})