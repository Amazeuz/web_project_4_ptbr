import { opacity } from '../utils/constants.js'
export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._popupOpen = false
  }

  getTriggerElement() {
    return document.querySelector(`#${this._popupElement.id}-trigger`)
  }

  open() {
    this._popupElement.classList.add('opacity-style');
    this._popupElement.classList.remove('popup_hidden');
    opacity.classList.add('page-opacity');
    setTimeout(() => { this._popupOpen = true }, 0);
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
    if (this._popupElement.classList.contains('image-click')) {
      if (event.target === document.querySelector('.image-click')) {
        this.close()
      }
    }
    else {
      if (event.target.closest('.form') === null) {
        this.close()
      }
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('img[alt="Botão de fechar o pop-up"]').addEventListener("click", () => {
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