//import { PopupWithImage } from './PopupWithImage.js'

export default class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._imageModal = data.imageModal;
    this._pageOpacity = data.pageOpacity;
    this._template = template;
  }

  _getTemplate () {
    const cardTemplate = document.querySelector(this._template).content.querySelector('.item').cloneNode(true);

    return cardTemplate;
  }

  _toggleLike() {
    this._element.querySelector('.item__like').classList.toggle('item__like_type_liked');
  }

  _deleteCard() {
    this._element.closest('.item').remove();
  }

  _handleCardClick(event) {
    const target = event.target;
    if (target.classList.contains('item__trash-icon')) {
      this._deleteCard();
    }
    else if (target.classList.contains('item__like')) {
      this._toggleLike();
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', (event) => {
      this._handleCardClick(event);
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