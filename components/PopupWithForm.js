import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, callback) {
    super(popupElement)
    this._popupElement = popupElement;
    this._callback = callback;
  }

  getTriggerElement() {
    return document.querySelector(`#${this._popupElement.id}-trigger`)
  }

  _getInputValue() {
    const formInputs = this._popupElement.querySelectorAll('.form__input');

    const inputsSelector = {
      firstInput: Array.from(formInputs)[0],
      secondInput: Array.from(formInputs)[1]
    }
    return inputsSelector
  }

  close() {
    super.close()
    this._getInputValue().firstInput.value = ''
    this._getInputValue().secondInput.value = ''
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.form__button').addEventListener('click', () => {
      const inputsValue = {
        firstField: this._getInputValue().firstInput.value,
        secondField: this._getInputValue().secondInput.value
      }
      this._callback(inputsValue)
      this.close()
    })
  }
}