import * as utils from './utils.js'

class FormValidator {
  constructor(/* formList ,*/ formElement) {
    //this._formList = formList
    this._formElement = formElement;
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add('form__input_type_error');
      inputElement.nextElementSibling.textContent = inputElement.validationMessage;
    }
    else {
      inputElement.classList.remove('form__input_type_error');
      inputElement.nextElementSibling.textContent = ''
    }
  }

  _hasInvalidInput (inputList) {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add("form__button_type_inactive");
    }
    else {
      buttonElement.classList.remove("form__button_type_inactive");
    }
  }

  _insertEventListeners(fieldset) {
    const formInputs = fieldset.querySelectorAll('.form__input');
    const buttonElement = fieldset.querySelector('.form__button');
    this._toggleButtonState(formInputs, buttonElement);

    formInputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(formInputs, buttonElement);
      });
    });
  }

  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = this._formElement.querySelectorAll(".form__input-container");

    fieldsetList.forEach((fieldset) => {
      this._insertEventListeners(fieldset);
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        utils.closePopup();
      }
    });
  }
}

const formList = document.forms;

Array.from(formList).forEach((form) => {
  new FormValidator(form).enableValidation();
});