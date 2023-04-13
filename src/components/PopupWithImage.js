import Popup from '../components/Popup.js'

export class PopupWithImage extends Popup{
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }

  open(name, link) {
    const openImage = this._popupElement.querySelector('.image-click-open');

    super.open()
    this._popupElement.querySelector('.image-click__name').textContent = name;
    openImage.setAttribute('src', link);
  }
}