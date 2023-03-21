import * as index from './index.js'
import * as utils from './utils.js'

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
  index.gallery.prepend(cardContainerElement);

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

  const cardImage = index.gallery.querySelector('.item__image');
  const cardImageName = index.gallery.querySelector('.item__title');
  const image = index.imageBlock.querySelector('.image-click-open');

  cardImage.addEventListener('click', function () {
    index.imageBlock.style.opacity = 1;
    opacity.classList.add('page-opacity');
    index.imageBlock.classList.remove('image-click_hidden');
    image.setAttribute('src', cardImage.getAttribute('src'));
    index.imageBlock.querySelector('.image-click__name').textContent = cardImageName.textContent;

    // O código a seguir é para aplicar a fução de fechar a imagem com um clique fora dela.

    index.imageBlock.addEventListener('click', utils.closePopup);
  });
  utils.closePopup();
}

export {createCard}