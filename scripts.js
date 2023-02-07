let form = document.querySelector('.form');
let opacity = document.querySelector('#opacity-block')
let editButton = document.querySelector('.profile__edit');
let addButton = document.querySelector('.profile__add');
let likeButton = document.querySelectorAll('.item__like');
let exitButton = document.querySelector('.form__exit');

function clickEditButton () {
  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden');
}

function changeInputs () {
  let name = document.querySelector('.profile__name');
  let about = document.querySelector('.profile__about');
  let newName = document.querySelector('#form__input-name');
  let newAbout = document.querySelector('#form__input-about');

  if (newName.value.length > 0 && newAbout.value.length > 0) {
    name.textContent = newName.value;
    about.textContent = newAbout.value;
    newName.value = '';
    newAbout.value = '';
    closeForm();
  }
  else {
    newName.setAttribute('placeholder', 'Preencha os campos !');
    newAbout.setAttribute('placeholder', 'Preencha os campos !');
  }
}

function closeForm () {
  opacity.classList.remove('page-opacity');
  form.classList.add('form_hidden');
}

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener("click", function clickLikeButton () {
    if (likeButton[i].getAttribute('src') != '/images/vector__liked-button.svg') {
      likeButton[i].setAttribute('src', '/images/vector__liked-button.svg');
    }
    else {
      likeButton[i].setAttribute('src', '/images/vector__like-button.svg');
    }
  })
};

editButton.addEventListener("click", clickEditButton);
exitButton.addEventListener("click", closeForm);

