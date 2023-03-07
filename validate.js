const forms = document.forms;

function checkInputValidity (input) {
  if (!input.validity.valid && input.value.length > 0) {
    input.classList.add('form__input_type_error')
    input.nextElementSibling.textContent = input.validationMessage;
  }
  else {
    input.classList.remove('form__input_type_error')
    input.nextElementSibling.textContent = ''
  }
}
Array.from(forms).forEach((form) => {
  form.addEventListener('input', () =>  {
    const formInput = form.querySelectorAll('.form__input');
    Array.from(formInput).forEach(checkInputValidity)
  });
});