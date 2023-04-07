import { opacity } from '../utils/constants.js'
import { addNewCard, changeUserInfo } from '../scripts/index.js';

class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._popupOpen = false
    this._trigger = this._popupElement.id
  }

  getTriggerElement() {
    return document.querySelector(`#${this._trigger}-trigger`)
  }

  open() {
    this._popupElement.classList.add('opacity-style');
    this._popupElement.classList.remove('popup_hidden');
    opacity.classList.add('page-opacity');
    setTimeout(() => { this._popupOpen = true }, 1);
  }

  close() {
    opacity.classList.remove('page-opacity');
    this._popupElement.classList.remove('opacity-style');
    setTimeout(() => { this._popupElement.classList.add('popup_hidden'); }, 500);
    this._popupOpen = false
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _clickOutsidePopup (event) {
    if (event.target.closest('.form') === null) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.form__exit').addEventListener("click", () => {
      this.close()
    });

    document.addEventListener('click', (event) => {
      if (this._popupOpen === true) {
        this._clickOutsidePopup(event);
      }
    })

    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event)
    });
  }
}

Array.from(document.querySelectorAll('.form')).forEach((popup) => {
  const popupElement = new Popup(popup)
  popupElement.setEventListeners();

  const formButton = popup.querySelector('.form__button')
  if (popup.id === 'form-edit') {
    formButton.addEventListener('click', () => {
      changeUserInfo(popupElement);
    })
  }
  else {
    formButton.addEventListener('click', () => {
      addNewCard(popupElement);
    })
  }

  popupElement.getTriggerElement().addEventListener('click', () => {
    popupElement.open()
  })
})