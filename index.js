const gallery = document.querySelector('.gallery');
const opacity = document.querySelector('#opacity-block')
const form = document.querySelector('.form');
const formSubmit = document.querySelectorAll('.form__items');
const formImage = document.querySelector('#form-image');
const imageBlock = document.querySelector('.image-click');
const imageExit = document.querySelector('.image-click__exit');
const cardCreate = document.querySelector('#form__items-create');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const exitButtons = document.querySelectorAll('.form__exit');
const editSave = document.querySelector('#form__items-save');

const cardsGallery = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
];

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

function createCard () {
  while (cardsGallery.length > 0) {
    const cardContainerElement = document.createElement('div');
    cardContainerElement.classList.add('item');

    const cardLinkElement = document.createElement('img');
    cardLinkElement.classList.add('item__image');
    cardLinkElement.setAttribute('src', cardsGallery[0].link);

    const cardTrashElement = document.createElement('img');
    cardTrashElement.classList.add('item__trash-icon');
    cardTrashElement.setAttribute('src', 'images/trash-icon.svg')
    cardTrashElement.setAttribute('alt', 'Ícone de lixo, para excluir a foto desejada');

    const cardNewContainerElement = document.createElement('div');

    const cardNameElement = document.createElement('h1');
    cardNameElement.classList.add('item__title');
    cardNameElement.textContent = `${cardsGallery[0].name}`

    const cardLikeElement = document.createElement('img');
    cardLikeElement.classList.add('item__like');
    cardLikeElement.setAttribute('src', 'images/vector__like-button.svg');
    cardLikeElement.setAttribute('alt','Um coração com a função de curtir a imagem');

    cardNewContainerElement.append(cardNameElement, cardLikeElement);

    cardContainerElement.append(cardLinkElement, cardTrashElement, cardNewContainerElement);
    gallery.prepend(cardContainerElement);
    cardsGallery.shift();

    // o código a seguir é para criar a função de like no card.

    const newLikeButton = document.querySelector('.item__like');
    const newDeleteCard = document.querySelector('.item__trash-icon');

    let likedButton = false
    newLikeButton.addEventListener('click', function () {
      if (!likedButton) {
        newLikeButton.setAttribute('src', 'images/vector__liked-button.svg');
        likedButton = true
      }
      else {
        newLikeButton.setAttribute('src', 'images/vector__like-button.svg');
        likedButton = false
      }
    });
      newDeleteCard.addEventListener('click', function () {
        newDeleteCard.closest('.item').remove();
      });

      // O código a seguir é para aplicar a funionalidade de abrir a imagem ao card.

      const cardImage = gallery.querySelector('.item__image');
      const cardImageName = gallery.querySelector('.item__title');
      const image = imageBlock.querySelector('.image-click-open');

      cardImage.addEventListener('click', function () {
        imageBlock.style.opacity = 1;
        setTimeout(() => { opacity.style.pointerEvents = 'none'; }, 500);
        opacity.classList.add('page-opacity');

        imageBlock.classList.remove('image-click_hidden');
        image.setAttribute('src', cardImage.getAttribute('src'));
        imageBlock.querySelector('.image-click__name').textContent = cardImageName.textContent;

        // O código a seguir é para redimensionar a imagem quando aberta.

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
      });

      closePopup();
  };
}

function addCardInputs () {
  const cardInputName = document.querySelector('#form-image__input-title');
  const cardInputLink = document.querySelector('#form-image__input-url');

  if (cardInputName.value.length > 0 && cardInputLink.value.length > 0 && cardInputLink.value.startsWith('http')) {
    cardsGallery.push({name: `${cardInputName.value}`, link: `${cardInputLink.value}`})
    createCard();

    cardInputName.setAttribute('placeholder', 'Título');
    cardInputLink.setAttribute('placeholder', 'Link da Imagem');
  }
  else {
    cardInputName.setAttribute('placeholder', 'Preencha os campos corretamente !');
    cardInputLink.setAttribute('placeholder', 'Preencha os campos corretamente !');
  }
  cardInputName.value = '';
  cardInputLink.value = '';
};

function changeUserInfo () {
  const oldName = document.querySelector('.profile__name');
  const oldAbout = document.querySelector('.profile__about');
  const newName = document.querySelector('#form__input-name');
  const newAbout = document.querySelector('#form__input-about');

  if (newName.value.length > 0 && newAbout.value.length > 0) {
    oldName.textContent = newName.value;
    oldAbout.textContent = newAbout.value;
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

exitButtons.forEach(function (item) {
  item.addEventListener("click", closePopup);
});

function submitForm (event) {
  event.preventDefault();
}

formSubmit.forEach(function (item) {
  item.addEventListener('submit', submitForm);
})

addButton.addEventListener('click', clickAddButton);
editButton.addEventListener('click', clickEditButton);
imageExit.addEventListener('click', closePopup);
editSave.addEventListener('click', changeUserInfo);
cardCreate.addEventListener('click', addCardInputs);

createCard();