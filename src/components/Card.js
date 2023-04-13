export default class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick
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

  _cardClick(event) {
    const target = event.target;
    if (target.classList.contains('item__trash-icon')) {
      this._deleteCard();
    }
    else if (target.classList.contains('item__like')) {
      this._toggleLike();
    }
    else if (target.classList.contains('item__image')) {
      this._handleCardClick(this._name, this._link)
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', (event) => {
      this._cardClick(event);
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