import { PopupWithImage } from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import { gallery, imageBlock, opacity } from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

function addNewCard({firstField, secondField}) {
  const cardData = {
    name: firstField,
    link: secondField,
    imageModal: imageBlock,
    pageOpacity: opacity
  }
  const card = new Card(cardData, '.default-template')
  const cardElement = card.generateCard();
  const newImage = new PopupWithImage(imageBlock, cardElement)
  newImage.setEventListeners()

  gallery.prepend(cardElement);
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

const cardsAdded = Array.from(gallery.querySelectorAll('.item'))
cardsAdded.forEach( (cardElement) => {

  const newImage = new PopupWithImage(imageBlock, cardElement)
  newImage.setEventListeners()
});