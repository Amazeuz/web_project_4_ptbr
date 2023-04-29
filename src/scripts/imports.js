import '../pages/index.css'
import exitIconSrc from '../images/vector__add.svg'
import trashIconSrc from '../images/trash-icon.svg'
import openEditPopupSrc from '../images/vector__edit.svg'
import openAddPopupSrc from '../images/vector__add.svg'
import likeIconSrc from '../images/vector__like-button.svg'
import lineIconSrc from '../images/logo/Line.svg'
import vectorIconSrc from '../images/logo/Vector.svg'
import photoEditIcon from '../images/profile-photo-edit.svg'
import '../components/FormValidator.js'

const exitIconImages = document.querySelectorAll('img[alt="Botão de fechar o pop-up"]')

Array.from(exitIconImages).forEach((item) => {
  item.src = exitIconSrc
})

const trashIconImages = document.querySelector('.default-template').content.querySelector('.item__trash-icon')
trashIconImages.src = trashIconSrc;

const likeIconImage = document.querySelector('.default-template').content.querySelector('.item__like')
likeIconImage.src = likeIconSrc;

const lineIconImage = document.querySelector('#line-icon')
lineIconImage.src = lineIconSrc;

const vectorIconImage = document.querySelector('#vector-icon')
vectorIconImage.src = vectorIconSrc;

const openEditPopupImage = document.querySelector('.profile__edit')
openEditPopupImage.src = openEditPopupSrc;

const openAddPopupImage = document.querySelector('.profile__add')
openAddPopupImage.src = openAddPopupSrc;

const profilePhotoEdit = document.querySelector('.profile__edit-button')
profilePhotoEdit.src = photoEditIcon;