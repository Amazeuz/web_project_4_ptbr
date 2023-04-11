import Popup from '../components/Popup.js'
import { opacity } from '../utils/constants.js';

export class PopupWithImage extends Popup{
  static numInstances = 0;
  constructor(popupElement, cardProperties) {
    super(popupElement);
    this._popupElement = popupElement;
    this._cardProperties = cardProperties;
    this._pageOpacity = opacity;
    this._popupOpen = false;
    PopupWithImage.numInstances++;
  }

  open() {
    const image = this._popupElement.querySelector('.image-click-open');

    super.open();
    image.setAttribute('src', this._cardProperties.querySelector('.item__image').src);
    this._popupElement.querySelector('.image-click__name').textContent = this._cardProperties.querySelector('.item__title').textContent;
  }

  setEventListeners() {
    super.setEventListeners()

    this._cardProperties.querySelector('.item__image').addEventListener('click', () => {
      this.open()
    })
  }
}