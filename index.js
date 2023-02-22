const gallery = document.querySelector('.gallery');
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
const addButton = document.querySelector('.profile__add');
const imageBlock = document.querySelector('.image-click');
const cardImages = document.querySelectorAll('.item__image');
const editButton = document.querySelector('.profile__edit');
const exitButtons = document.querySelectorAll('.form__exit');
const imageExit = document.querySelector('.image-click__exit');

function clickAddButton () {
  formImage.style.opacity = 1;
  opacity.classList.add('page-opacity');
  setTimeout(() => { opacity.style.pointerEvents = 'none'; }, 500);
  formImage.classList.remove('form_hidden');
}

function clickEditButton () {
  form.style.opacity = 1;
  opacity.classList.add('page-opacity');
  setTimeout(() => { opacity.style.pointerEvents = 'none'; }, 500);
  form.classList.remove('form_hidden');
}

function changeImageInputs () {
  const cardInputName = document.querySelector('#form-image__input-title');
  const cardInputLink = document.querySelector('#form-image__input-url');

  if (cardInputName.value.length > 0 && cardInputLink.value.length > 0 && cardInputLink.value.startsWith('https://')) {
    gallery.insertAdjacentHTML("afterbegin",
    `<div class="item">
      <img class="item__image" src=${cardInputLink.value}>
      <img class="item__trash-icon" src='images/trash-icon.svg' alt="Ícone de lixo, para excluir a foto desejada">
      <div>
        <h1 class="item__title">${cardInputName.value}</h1>
        <img src="images/vector__like-button.svg" class="item__like" alt="Um coração com a função de curtir a imagem">
      </div>
   </div>`);
   cardInputName.value = '';
   cardInputLink.value = '';

    // O Código a seguir é para aplicar as funcionalidades de curtir e excluir ao recém criado card,
    // e para evitar um bug que criava várias funções funcionando ao mesmo tempo com cada card adicionado.

    const newLikeButton = document.querySelector('.item__like');
    const newDeleteCard = document.querySelector('.item__trash-icon');

    newLikeButton.addEventListener('click', function () {
      if (newLikeButton.getAttribute('src') === 'images/vector__like-button.svg') {
        newLikeButton.setAttribute('src', 'images/vector__liked-button.svg');
      }
      else {
        newLikeButton.setAttribute('src', 'images/vector__like-button.svg');
      }
    });

    newDeleteCard.addEventListener('click', function () {
      const card = newDeleteCard.closest('.item');
      card.remove();
    });

    closePopup();
    checkCardImages();

    cardInputName.setAttribute('placeholder', 'Título');
    cardInputLink.setAttribute('placeholder', 'Link da Imagem');
  }
  else {
    cardInputName.value = '';
    cardInputLink.value = 'https://';
    cardInputName.setAttribute('placeholder', 'Preencha os campos corretamente !');
    cardInputLink.setAttribute('placeholder', 'Preencha os campos corretamente !');
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
    closePopup();
  }
  else {
    newName.setAttribute('placeholder', 'Preencha os campos !');
    newAbout.setAttribute('placeholder', 'Preencha os campos !');
  }
}

function closePopup () {

  opacity.classList.remove('page-opacity');
  setTimeout(() => { opacity.style.pointerEvents = 'all'; }, 500);

  form.style.opacity = 0;
  setTimeout(() => { form.classList.add('form_hidden'); }, 500);
  formImage.style.opacity = 0;
  setTimeout(() => { formImage.classList.add('form_hidden'); }, 500);

  imageBlock.style.opacity = 0;
  setTimeout(() => { imageBlock.classList.add('image-click_hidden') }, 500);
}

function checkCardImages () {
  const cardImages = document.querySelectorAll('.item__image');
  const cardImagesNames = document.querySelectorAll('.item__title');
  const image = imageBlock.querySelector('.image-click-open');

  for (let i = 0; i < cardImages.length; i++) {
    cardImages[i].addEventListener('click', function () {
      imageBlock.style.opacity = 1;
      setTimeout(() => { opacity.style.pointerEvents = 'none'; }, 500);
      opacity.classList.add('page-opacity');
      imageBlock.classList.remove('image-click_hidden');
      image.setAttribute('src', cardImages[i].getAttribute('src'));
      imageBlock.querySelector('.image-click__name').textContent = cardImagesNames[i].textContent;

      function resizeOpennedImage () {
        const imageWidthPercentage = (image.naturalWidth * 100) / window.innerWidth;
        const imageHeightPercentage = (image.naturalHeight * 100) / window.innerHeight;

        let divisionValue = 0
        imageSizeArray = [0, 50, 100, 150, 200, 300, 400, 500];
        divisionArray = [0.5, 1, 1.2, 1.7, 2.5, 3.8, 5, 8];

        for (let i = 0; i < imageSizeArray.length; i++) {
          if (imageWidthPercentage > imageSizeArray[i] || imageHeightPercentage > imageSizeArray[i]) {
            continue;
          }
          else {
            divisionValue = divisionArray[i];
            break;
          }
        }
        imageBlock.style.width = `${imageWidthPercentage / divisionValue}%`;
        imageBlock.style.height = `${imageHeightPercentage / divisionValue}%`;
      }
      resizeOpennedImage();
    })
  }
}

function checkLikeButton () {
  const likeButtons = document.querySelectorAll('.item__like');
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", function checkButton () {
      if (likeButtons[i].getAttribute('src') === 'images/vector__like-button.svg') {
        likeButtons[i].setAttribute('src', 'images/vector__liked-button.svg');
      }
      else {
        likeButtons[i].setAttribute('src', 'images/vector__like-button.svg');
      }
    })
  }
}

function checkDeleteCard () {
  const trashButton = document.querySelectorAll('.item__trash-icon');
  for (let i = 0; i < trashButton.length; i++) {
    trashButton[i].addEventListener('click', function () {
      const card = trashButton[i].closest('.item');
      card.remove();
    })
  }
}

for (let i = 0; i < exitButtons.length; i++) {
  exitButtons[i].addEventListener("click", closePopup);
}

addButton.addEventListener('click', clickAddButton);
editButton.addEventListener('click', clickEditButton);
imageExit.addEventListener('click', closePopup);

checkCardImages();
checkLikeButton();
checkDeleteCard();