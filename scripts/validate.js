const forms = document.forms;
const inputList = Array.from(document.querySelectorAll(".form__input"));

function checkInputValidity (inputElement) {
  if (!inputElement.validity.valid && inputElement.value.length > 0) {
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
    buttonElement.classList.add("form__buttom_type_inactive");
  }
  else {
    buttonElement.classList.remove("form__buttom_type_inactive");
  }
}

Array.from(forms).forEach((formElement) => {
  formElement.addEventListener('input', () =>  {
    const formInput = formElement.querySelectorAll('.form__input');
    Array.from(formInput).forEach(function (inputElement) {
      checkInputValidity(inputElement);
    })
    const formButton = formElement.querySelector('.form__button');
    toggleButtonState(formInput, formButton);
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })
});