const gallery = document.querySelector('.gallery')
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

function likeButtonCheck () {
  const likeButton = document.querySelectorAll('.item__like');
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", function () {
      if (likeButton[i].getAttribute('src') === 'images/vector__like-button.svg') {
        likeButton[i].setAttribute('src', 'images/vector__liked-button.svg');
        console.log('PRETO ')
      }
      else if (likeButton[i].getAttribute('src') === 'images/vector__liked-button.svg') {
        likeButton[i].setAttribute('src', 'images/vector__like-button.svg');
        console.log('BRANCO ')
      }
    })
  }
}

function addInitialCards () {
  for (let i = 0; i < initialCards.length; i++) {
    const cardName = initialCards[i].name;
    const cardLink = initialCards[i].link;
    gallery.innerHTML +=
  `<div class="item">
    <img class="item__image" src=${cardLink}>
    <img class="item__trash-icon" src='images/trash-icon.svg' alt="Ícone de lixo, para excluir a foto desejada">
    <div>
      <h1 class="item__title">${cardName}</h1>
      <img src="images/vector__like-button.svg" class="item__like" alt="Um coração com a função de curtir a imagem">
    </div>
   </div>`

  }
}
addInitialCards();

const form = document.querySelector('.form');
const formImage = document.querySelector('#form-image');
const opacity = document.querySelector('#opacity-block')
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const imageBlock = document.querySelector('.image-click');
const cardImage = document.querySelectorAll('.item__image');
const likeButton = document.querySelectorAll('.item__like');
const exitButton = document.querySelectorAll('.form__exit');

function clickAddButton () {
  opacity.classList.add('page-opacity');
  formImage.classList.remove('form_hidden');
}

function clickEditButton () {
  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden');
}

function changeImageInputs () {
  const cardInputName = document.querySelector('#form-image__input-title');
  const cardInputLink = document.querySelector('#form-image__input-url');

  if (cardInputName.value.length > 0 && cardInputLink.value.length > 0) {
    console.log(cardInputLink.value)
    gallery.insertAdjacentHTML("afterend",
    `<div class="item">
      <img class="item__image" src='${cardInputLink.value}'>
      <img class="item__trash-icon" src='images/trash-icon.svg' alt="Ícone de lixo, para excluir a foto desejada">
      <div>
        <h1 class="item__title">${cardInputName.value}</h1>
        <img src="images/vector__like-button.svg" class="item__like" alt="Um coração com a função de curtir a imagem">
      </div>
   </div>`);

    cardInputName.value = '';
    cardInputLink.value = '';

    closeForm();
    likeButtonCheck();
    cardImageCheck();
    deleteCardCheck();
  }
  else {
      cardInputName.setAttribute('placeholder', 'Preencha os campos !');
      cardInputLink.setAttribute('placeholder', 'Preencha os campos !');
  }
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
  formImage.classList.add('form_hidden');
  imageBlock.classList.add('image-click__image-open_hidden')
}

function cardImageCheck () {
  const cardImage = document.querySelectorAll('.item__image');
  const cardImageName = document.querySelectorAll('.item__title');
  const image = imageBlock.querySelector('.image-click__image-open')

  for (let i = 0; i < cardImage.length; i++) {
    cardImage[i].addEventListener('click', function () {
      opacity.classList.add('page-opacity');
      imageBlock.classList.remove('image-click__image-open_hidden');
      image.setAttribute('src', cardImage[i].getAttribute('src'));
      imageBlock.querySelector('.image-click__name').textContent = cardImageName[i].textContent;

      const imageWidthPercentage = (image.naturalWidth * 100) / window.innerWidth
      const imageHeightPercentage = (image.naturalHeight * 100) / window.innerHeight

      // O Código a seguir é usado para implementar o tamanho em width e height
      // da imagem aberta com base no tamanho original da imagem.

      let divisionValue = 0
      imageSizeArray = [100, 100, 150, 200, 300, 400, 500];
      divisionArray = [1, 1.2, 1.9, 2.5, 3.8, 5, 8];

      for (let i = 0; i < imageSizeArray.length; i++) {
        if (imageWidthPercentage > imageSizeArray[i] || imageHeightPercentage > imageSizeArray[i]) {
          continue
        }
        else {
          divisionValue = divisionArray[i]
          break
        }
      }
      imageBlock.style.width = `${imageWidthPercentage / divisionValue}%`;
      imageBlock.style.height = `${imageHeightPercentage / divisionValue}%`;
    })
  }
}

function deleteCardCheck () {
  const trashButton = document.querySelectorAll('.item__trash-icon');
  for (let i = 0; i < trashButton.length; i++) {
    trashButton[i].addEventListener('click', function () {
      const card = trashButton[i].closest('.item');
      card.remove()
    })
  }
}

for (let i = 0; i < exitButton.length; i++) {
  exitButton[i].addEventListener("click", closeForm)
}

addButton.addEventListener('click', clickAddButton);
editButton.addEventListener("click", clickEditButton);

cardImageCheck();
likeButtonCheck();
deleteCardCheck();