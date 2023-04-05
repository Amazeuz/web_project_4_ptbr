import { form, formImage, addButton, editButton, exitButtons, opacity } from '../utils/constants.js'

class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  open() {
    this._popupElement.classList.add('opacity-style');
    this._popupElement.classList.remove('popup_hidden');
    opacity.classList.add('page-opacity');
  }

  close() {
    opacity.classList.remove('page-opacity');
    this._popupElement.classList.remove('opacity-style');
    setTimeout(() => { this._popupElement.classList.add('popup_hidden'); }, 500);
    // opacity.removeEventListener('click', this.close);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popupElement.this.close();
    }
  }

  _clickOutsidePopup () {
    setTimeout(() => { this.close() }, 500);
    //this.close();
  }

  setEventListeners() {
    exitButtons.forEach((item) => {
      item.addEventListener("click", this.close());
    });


    //imageExit.addEventListener('click', this.close);
    opacity.addEventListener('click', this._clickOutsidePopup())

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }
}

const popups = [form, formImage]

//popups.forEach((popup) => {
//  const popupElement = new Popup(popup);
//  popupElement.setEventListeners();
//})

const formElement = new Popup(form)
//formElement.setEventListeners()
//const formImageElement = new Popup(formImage)
//formImageElement.setEventListeners()

//addButton.addEventListener('click', formImageElement.open());