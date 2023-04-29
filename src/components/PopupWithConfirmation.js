import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  deleteCard(trashIconElement, deleteServerCard) {
    this._popupElement.querySelector('.form__button').addEventListener('click', () => {
      deleteServerCard()
      trashIconElement.closest('.item').remove();
      this.close()
    })
  }
}