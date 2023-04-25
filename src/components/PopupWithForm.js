import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, callback) {
    super(popupElement)
    this._popupElement = popupElement;
    this._callback = callback;
  }

  _getInputValue() {
    const formInputs = this._popupElement.querySelectorAll('.form__input');

    if (formInputs.length === 2) {
      const inputsSelector = {
        firstInput: Array.from(formInputs)[0],
        secondInput: Array.from(formInputs)[1]
      }
      return inputsSelector
    }
    else if (formInputs.length === 1) {
      return Array.from(formInputs)
    }
  }

  close() {
    super.close()

    for (const input in this._getInputValue()) {
      this._getInputValue()[input].value = ""
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.form__button').addEventListener('click', () => {
      const inputsValue = {}
      for (const input in this._getInputValue()) {
        inputsValue[input] = this._getInputValue()[input].value
      }

      this._callback(inputsValue)
      this.close()
    })
  }
}