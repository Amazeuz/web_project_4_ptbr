import * as index from './index.js'
import * as utils from './utils.js'

let likedButton = false

class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate () {
    const cardTemplate = document.querySelector(this._template).content.querySelector('.item').cloneNode(true);

    return cardTemplate;
  }

  _likeFunction() {
    if (!likedButton) {
      this._element.querySelector('.item__like').setAttribute('src', 'images/vector__liked-button.svg');
      likedButton = true
    }
    else {
      this._element.querySelector('.item__like').setAttribute('src', 'images/vector__like-button.svg');
      likedButton = false
    }
  }

  _deleteFunction() {
    this._element.closest('.item').remove();
  }

  _openImage() {
    const image = index.imageBlock.querySelector('.image-click-open');

    index.imageBlock.style.opacity = 1;
    index.opacity.classList.add('page-opacity');
    index.imageBlock.classList.remove('image-click_hidden');
    image.setAttribute('src', this._link);
    index.imageBlock.querySelector('.image-click__name').textContent = this._name;
    index.imageBlock.addEventListener('click', utils.closePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.item__image').addEventListener('click', () => {
      this._openImage();
    });
    this._element.querySelector('.item__trash-icon').addEventListener('click', () => {
      this._deleteFunction();
    });
    this._element.querySelector('.item__like').addEventListener('click', () => {
      this._likeFunction();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.item__image').setAttribute('src', this._link);
    this._element.querySelector('.item__title').textContent = this._name

    return this._element;
  }
}

export {Card}