import { Popup } from '../components/Popup.js'
//import { imageBlock } from '../utils/constants.js';
import { opacity, gallery } from '../utils/constants.js';

export class PopupWithImage {
  constructor(popupElement, template) {
    this._popupElement = popupElement;
    this._imageModal = template;
    this._name = popupElement.querySelector('.item__title').textContent;
    this._link = popupElement.querySelector('.item__image').src;
    this._pageOpacity = opacity;
    this._popupOpen = false;
  }

  open() {
    //super.open();
    const image = this._imageModal.querySelector('.image-click-open');

    this._imageModal.classList.add('opacity-style');
    this._imageModal.classList.remove('image-click_hidden');
    this._pageOpacity.classList.add('page-opacity');
    setTimeout(() => { this._popupOpen = true }, 1);

    image.setAttribute('src', this._link);
    this._imageModal.querySelector('.image-click__name').textContent = this._name;

    this._imageModal.querySelector('.image-click__exit').addEventListener('click', () => {
      this.close();
    });
  }

  close() {
    //super.close();
    this._imageModal.classList.remove('opacity-style');
    this._pageOpacity.classList.remove('page-opacity');
    setTimeout(() => { this._imageModal.classList.add('image-click_hidden') }, 500);
    this._popupOpen = false
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _clickOutsidePopup (event) {
    if (event.target.closest('.form') === null) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.item__image').addEventListener('click', () => {
      this.open()
    })

    document.addEventListener('click', (event) => {
      if (this._popupOpen === true) {
        this._clickOutsidePopup(event);
      }
    })

    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event)
    });
  }
}