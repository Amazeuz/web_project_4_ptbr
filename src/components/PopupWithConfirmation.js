import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement)
    this._popupElement = popupElement
  }

  deleteCard(trashIconElement, deleteServerCard) {
    this._popupElement.querySelector('.form__button').addEventListener('click', async () => {
      deleteServerCard()
      trashIconElement.closest('.item').remove();
      this.close()
    })
  }
}