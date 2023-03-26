class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._input = config.inputSelector;
    this._button = config.submitButtonSelector;
    this._inputError = config.inputErrorClass;
    this._inactiveButton = config.inactiveButtonClass;
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputError);
      inputElement.nextElementSibling.textContent = inputElement.validationMessage;
    }
    else {
      inputElement.classList.remove(this._inputError);
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
      buttonElement.classList.add(this._inactiveButton);
    }
    else {
      buttonElement.classList.remove(this._inactiveButton);
    }
  }

  _insertEventListeners(fieldset) {
    const formInputs = Array.from(fieldset.querySelectorAll(this._input));
    const buttonElement = fieldset.querySelector(this._button)

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

    const fieldsets = this._formElement.querySelectorAll('.form__input-container')
    fieldsets.forEach((fieldset) => {
      this._insertEventListeners(fieldset);
    });

  }
}

const formConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_type_inactive",
  inputErrorClass: "form__input_type_error",
}

Array.from(document.forms).forEach((formElement) => {
  new FormValidator(formConfig, formElement).enableValidation();
});