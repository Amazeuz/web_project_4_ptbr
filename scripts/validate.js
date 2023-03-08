const forms = document.forms;

function clickOutsidePopup () {
  form.forEach((item) => {
    item.addEventListener('change', closePopup);
  })
}

clickOutsidePopup();

function pressEscKey () {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  });
}

function preventSubmitRefresh (formElement) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault()
  });
}

function checkInputValidity (inputElement) {
  if (!inputElement.validity.valid) {
    inputElement.classList.add('form__input_type_error');
    inputElement.nextElementSibling.textContent = inputElement.validationMessage;
  }
  else {
    inputElement.classList.remove('form__input_type_error');
    inputElement.nextElementSibling.textContent = ''
  }
}

function hasInvalidInput (inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button_type_inactive");
  }
  else {
    buttonElement.classList.remove("form__button_type_inactive");
  }
}

function insertEventListeners (formElement) {
  const formInputs = Array.from(formElement.querySelectorAll('.form__input'));
  const formButton = formElement.querySelector('.form__button');
  toggleButtonState(formInputs, formButton);

  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement);
      toggleButtonState(formInputs, formButton);
    });
  });
}

function enableValidation () {
  const forms = document.forms;
  Array.from(forms).forEach((formElement) => {
    preventSubmitRefresh(formElement);
    const fieldsetList = formElement.querySelectorAll(".form__input-container");
    fieldsetList.forEach((fieldset) => {
      insertEventListeners(fieldset);
    });
  });
  pressEscKey();
}

Array.from(document.querySelectorAll('form__button')).forEach((button) => {
  button.classList.add('form__button_type_inactive');
});

enableValidation();