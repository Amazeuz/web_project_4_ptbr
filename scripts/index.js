const opacity = document.querySelector('#opacity-block');
const gallery = document.querySelector('.gallery');
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

function clickOutsidePopup () {
  setTimeout(() => { opacity.addEventListener('click', closePopup); }, 500);
}

function clickAddButton () {
  formImage.style.opacity = 1;
  opacity.classList.add('page-opacity');
  formImage.classList.remove('form_hidden');
  clickOutsidePopup();
}

function clickEditButton () {
  form.style.opacity = 1;
  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden');
  clickOutsidePopup();
}

function createCard (cardLink, cardName) {
  const cardContainerElement = document.createElement('div');
  cardContainerElement.classList.add('item');

  const cardLinkElement = document.createElement('img');
  cardLinkElement.classList.add('item__image');
  cardLinkElement.setAttribute('src', cardLink);

  const cardTrashElement = document.createElement('img');
  cardTrashElement.classList.add('item__trash-icon');
  cardTrashElement.setAttribute('src', 'images/trash-icon.svg')
  cardTrashElement.setAttribute('alt', 'Ícone de lixo, para excluir a foto desejada');

  const cardNewContainerElement = document.createElement('div');

  const cardNameElement = document.createElement('h1');
  cardNameElement.classList.add('item__title');
  cardNameElement.textContent = `${cardName}`

  const cardLikeElement = document.createElement('img');
  cardLikeElement.classList.add('item__like');
  cardLikeElement.setAttribute('src', 'images/vector__like-button.svg');
  cardLikeElement.setAttribute('alt','Um coração com a função de curtir a imagem');

  cardNewContainerElement.append(cardNameElement, cardLikeElement);

  cardContainerElement.append(cardLinkElement, cardTrashElement, cardNewContainerElement);
  gallery.prepend(cardContainerElement);

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

  // O código a seguir é para aplicar a função de abrir a imagem ao card.

  const cardImage = gallery.querySelector('.item__image');
  const cardImageName = gallery.querySelector('.item__title');
  const image = imageBlock.querySelector('.image-click-open');

  cardImage.addEventListener('click', function () {
    imageBlock.style.opacity = 1;
    opacity.classList.add('page-opacity');
    imageBlock.classList.remove('image-click_hidden');
    image.setAttribute('src', cardImage.getAttribute('src'));
    imageBlock.querySelector('.image-click__name').textContent = cardImageName.textContent;

    // O código a seguir é para aplicar a fução de fechar a imagem com um clique fora dela.

    imageBlock.addEventListener('click', closePopup);
  });
  closePopup();
}

function addCardInputs () {
  const cardInputName = document.querySelector('#form-image__input-title');
  const cardInputLink = document.querySelector('#form-image__input-url');

  if (cardInputName.value.length > 0 && cardInputLink.value.length > 0 && cardInputLink.value.startsWith('http')) {
    createCard(cardInputLink.value, cardInputName.value);

    cardInputName.setAttribute('placeholder', 'Título');
    cardInputLink.setAttribute('placeholder', 'URL da Imagem');
  }
  cardInputName.value = '';
  cardInputLink.value = '';
}

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
}

function closePopup () {
  opacity.classList.remove('page-opacity');

  const blocks = [form, formImage, imageBlock];
  blocks.forEach((block) => {
    block.style.opacity = 0;
  });

  setTimeout(() => { form.classList.add('form_hidden'); }, 500);
  setTimeout(() => { formImage.classList.add('form_hidden'); }, 500);
  setTimeout(() => { imageBlock.classList.add('image-click_hidden') }, 500);
  opacity.removeEventListener('click', closePopup);
}

exitButtons.forEach(function (item) {
  item.addEventListener("click", closePopup);
});

addButton.addEventListener('click', clickAddButton);
editButton.addEventListener('click', clickEditButton);
imageExit.addEventListener('click', closePopup);
editSave.addEventListener('click', changeUserInfo);
cardCreate.addEventListener('click', addCardInputs);

cardsGallery.forEach( function (item) {
  createCard(item.link, item.name);
});