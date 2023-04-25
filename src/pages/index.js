import Card from '../components/Card.js';
import { gallery, imageBlock, cardsGallery, profilePhoto, profileName, profileAbout, confirmationForm } from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { api } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js'
import {} from '../scripts/imports.js'

const popupImage = new PopupWithImage(imageBlock)
popupImage.setEventListeners();

api.getServerCards().then(obj => {
  obj.forEach(item => {
    if (item.name.toLowerCase().includes('dddd')) {
      api.deleteCard(item._id)
    }
  })
})

const popupConfirmation = new PopupWithConfirmation(confirmationForm);
popupConfirmation.setEventListeners()

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

function renderData(data) {
  profilePhoto.src = data.avatar
  profileName.textContent = data.name
  profileAbout.textContent = data.about
}

function renderProfilePhoto(avatar) {
  profilePhoto.src = avatar
}

api.loadUserInfo().then(obj => {
  renderData(obj)
})

async function enableCardDelete(cardElement) {
  const trashIcon = cardElement.querySelector('.item__trash-icon');
  const serverCards = await api.getServerCards()

  trashIcon.addEventListener('click', () => {
    popupConfirmation.open();
    popupConfirmation.deleteCard(trashIcon, () => {
      serverCards.forEach((card => {
        if (card.name === cardElement.querySelector('.item__title').textContent
        && card.link === cardElement.querySelector('.item__image').src) {
          api.deleteCard(card._id);
        }
      }));
    });
  });
}

function addNewCard({firstInput, secondInput}) {
  const cardData = [{
    name: firstInput,
    link: secondInput,
  }];
  api.addNewCard(firstInput, secondInput).then(obj => {
    return obj
  })

  const newCard = new Section({
    items: cardData,
    renderer: (item) => {
      const card = new Card(item, ".default-template", handleCardClick);
      const cardElement = card.generateCard();
      const newImage = new PopupWithImage(imageBlock, cardElement);
      newImage.setEventListeners();

      enableCardDelete(cardElement);
      newCard.addItem(cardElement);
    }
  }, gallery);

  newCard.renderItems();
}

const cardList = new Section({
  items: cardsGallery,
  renderer: async (item) => {
    const card = new Card(item, ".default-template", handleCardClick);
    const cardElement = card.generateCard();
    const userData = await api.loadUserInfo()

    if (item.owner._id !== userData._id) {
        cardElement.querySelector('.item__trash-icon').remove()
        cardElement.querySelector('.item__container').style.bottom = "0";
      }
    else {
      enableCardDelete(cardElement);
    }
    cardList.addItem(cardElement);
  }
}, gallery);

cardList.renderItems();

Array.from(document.querySelectorAll('.form')).forEach((popup) => {
  let popupElement;

  if (popup.id === 'form-edit') {
    popupElement = new PopupWithForm(popup, (inputs) => {
      const data = api.editUserInfo(inputs.firstField, inputs.secondField).then(obj => {
        renderData(obj)
      })
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

    setTimeout(() => {
      const trashIcons = Array.from(document.querySelectorAll('.item__trash-icon'))
      trashIcons.forEach((trashIcon) => {
        trashIcon.addEventListener('click', () => {
          popupConfirmation.open()
          popupConfirmation.deleteCard(trashIcon)

          api.deleteCard()
        })
      })
    }, 2000)
  }
  if (popup.id === 'form-picture') {
    popupElement = new PopupWithForm(popup, () => {
      const avatar = popup.querySelector('.form__input')

      api.changeProfilePicture(avatar.value)
      renderProfilePhoto(avatar.value)
    })
    popupElement.setEventListeners();
    popupElement.getTriggerElement().addEventListener('click', () => {
      popupElement.open()
    })
  }
})