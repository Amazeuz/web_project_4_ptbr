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

const popupConfirmation = new PopupWithConfirmation(confirmationForm);
popupConfirmation.setEventListeners()

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

api.loadUserInfo().then(data => {
  profilePhoto.src = data.avatar
  profileName.textContent = data.name
  profileAbout.textContent = data.about
})

function enableCardDelete(cardElement) {
  const trashIcon = cardElement.querySelector('.item__trash-icon');

  trashIcon.addEventListener('click', () => {
    popupConfirmation.open();
    popupConfirmation.deleteCard(trashIcon, () => {
      api.getServerCards().then(cards => {cards.forEach((card => {
        if (card.name === cardElement.querySelector('.item__title').textContent
        && card.link === cardElement.querySelector('.item__image').src) {
          api.deleteCard(card._id);
        }
      }))});
    });
  });
}

function addNewCard({firstInput, secondInput}) {
  const cardData = [{
    name: firstInput,
    link: secondInput,
  }];

  const newCard = new Section({
    items: cardData,
    renderer: (item) => {
      const card = new Card(item, ".default-template", handleCardClick);
      const cardElement = card.generateCard();

      api.addServerCard(firstInput, secondInput).then(card => {
        const cardLikeButton = cardElement.querySelector('.item__like')
        cardLikeButton.addEventListener('click', () => {
          const cardLikesNumber = cardElement.querySelector('.item__likes')
          if (!cardLikeButton.classList.contains('item__like_type_liked')) {
            api.addLike(card._id)
            cardLikesNumber.textContent = 1;
          }
          else {
            api.removeLike(card._id)
            cardLikesNumber.textContent = 0;
          }
        })
      })
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
  renderer: (item) => {
    const card = new Card(item, ".default-template", handleCardClick);
    const cardElement = card.generateCard();

    cardElement.querySelector('.item__likes').textContent = item.likes.length;
    api.loadUserInfo().then(user => {
      const checkUserLike = (item) => item.likes.some(element => element._id === user._id)
      const cardLikesNumber = cardElement.querySelector('.item__likes');

      cardElement.querySelector('.item__like').addEventListener('click', () => {
        const renderedCard = api.getServerCards()
        renderedCard.then(serverCards => {
          serverCards.forEach(serverCard => {
            if (serverCard._id === item._id) {
              if (!checkUserLike(serverCard)) {
                api.addLike(serverCard._id)
                cardLikesNumber.textContent = serverCard.likes.length + 1
              }
              else {
                api.removeLike(serverCard._id)
                cardLikesNumber.textContent = serverCard.likes.length - 1
              }
            }
          })
        })
      })

      const cardLikeButton = cardElement.querySelector('.item__like')
      if (checkUserLike(item)) {
        cardLikeButton.classList.add('item__like_type_liked')
      }
      else {
        cardLikeButton.classList.remove('item__like_type_liked')
      }
    })

    api.loadUserInfo().then(data => {
      if (data._id !== item.owner._id) {
        cardElement.querySelector('.item__trash-icon').remove()
        cardElement.querySelector('.item__container').style.bottom = "0";
      }
      else {
        enableCardDelete(cardElement);
      }
      cardList.addItem(cardElement);
      }
    )}
}, gallery);

cardList.renderItems();

Array.from(document.querySelectorAll('.form')).forEach((popup) => {
  let popupElement;

  if (popup.id === 'form-edit') {
    popupElement = new PopupWithForm(popup, (inputs) => {
      api.editUserInfo(inputs)

      const userInfo = new UserInfo(inputs)
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

        api.deleteCard()
      })
    })
  }

  if (popup.id === 'form-picture') {
    popupElement = new PopupWithForm(popup, (inputValue) =>  {
      api.changeProfilePicture(inputValue);
      profilePhoto.src = inputValue[0];
    })

    popupElement.setEventListeners();
    popupElement.getTriggerElement().addEventListener('click', () => {
      popupElement.open()
    })
  }
  api.popupsArray.push(popupElement)
})