const form = document.querySelector('.form');
const opacity = document.querySelector('#opacity-block')
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const likeButton = document.querySelectorAll('.item__like');
const exitButton = document.querySelector('.form__exit');

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "images/Vale-de-Yosemite.png"
  },
  {
    name: "Lago Louise",
    link: "images/Lago-Louise.png"
  },
  {
    name: "Montanhas Carecas",
    link: "images/Montanhas-Care.png"
  },
  {
    name: "Latemar",
    link: "images/Latemar.png"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "images/Vanoise-National.png"
  },
  {
    name: "Lago di Braies",
    link: "images/Lago-di-Braies.png"
  }
];

function addInitialCards () {
  const gallery = document.querySelector('.gallery')

  for (let i = 0; i < initialCards.length; i++) {
    const cardName = initialCards[i].name;
    const cardLink = initialCards[i].link;

    gallery.innerHTML +=
  `<div class="item">
    <img class="item__image" src=${cardLink}>
    <div>
      <h1 class="item__title">${cardName}</h1>
      <img src="images/vector__like-button.svg" class="item__like">
    </div>
   </div>`

  }
}

function clickAddButton () {


  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden');
}

function changeImageInputs () {
  const title = document.querySelector('.item__title');
  const url = document.querySelector('.item__url');
  const newTitle = document.querySelector('#form-image__input-title');
  const newUrl = document.querySelector('#form-image__input-url');

  if (newTitle.value.length > 0 && newUrl.value.length > 0) {
    title.textContent = newTitle.value;
    url.textContent = newUrl.value;
    newTitle.value = '';
    newUrl.value = '';
    closeForm();
  }
}

function clickEditButton () {
  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden');
}

function changeInputs () {
  const name = document.querySelector('.profile__name');
  const about = document.querySelector('.profile__about');
  const newName = document.querySelector('#form__input-name');
  const newAbout = document.querySelector('#form__input-about');

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
    if (likeButton[i].getAttribute('src') != 'images/vector__liked-button.svg') {
      likeButton[i].setAttribute('src', 'images/vector__liked-button.svg');
    }
    else {
      likeButton[i].setAttribute('src', 'images/vector__like-button.svg');
    }
  })
};

addInitialCards();
addButton.addEventListener('click', clickAddButton);
editButton.addEventListener("click", clickEditButton);
exitButton.addEventListener("click", closeForm);

