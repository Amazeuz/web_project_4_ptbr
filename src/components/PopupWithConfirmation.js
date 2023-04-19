import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement)
    this._popupElement = popupElement
  }

  deleteCard(trashIconElement) {
    this._popupElement.querySelector('.form__button').addEventListener('click', () => {
      trashIconElement.closest('.item').remove();
      this.close()
    })
  }
}