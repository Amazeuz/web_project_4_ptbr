import Popup from '../components/Popup.js'

export class PopupWithImage extends Popup{

  open(name, link) {
    super.open()
    const openImage = this._popupElement.querySelector('.image-click-open');

    this._popupElement.querySelector('.image-click__name').textContent = name;
    openImage.setAttribute('src', link);
  }
}