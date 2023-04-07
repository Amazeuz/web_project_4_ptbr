//import {closePopup} from './utils.js'

class Card {
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

  _openImageModal() {
    const image = this._imageModal.querySelector('.image-click-open');

    this._imageModal.classList.add('opacity-style');
    this._pageOpacity.classList.add('page-opacity');
    this._imageModal.classList.remove('image-click_hidden');
    image.setAttribute('src', this._link);
    this._imageModal.querySelector('.image-click__name').textContent = this._name;

    this._imageModal.querySelector('.image-click__exit').addEventListener('click', () => {
      this._closeImageModal();
    });
  }

  _closeImageModal() {
    this._imageModal.classList.remove('opacity-style');
    this._pageOpacity.classList.remove('page-opacity');
    setTimeout(() => { this._imageModal.classList.add('image-click_hidden') }, 500);
  }

  _handleCardClick(event) {
    const target = event.target;
    if (target.classList.contains('item__image')) {
      this._openImageModal();
    }
    else if (target.classList.contains('item__trash-icon')) {
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

export {Card}