import '../pages/index.css'
import exitIconSrc from '../images/vector__add.svg'
import trashIconSrc from '../images/trash-icon.svg'
import openEditPopupSrc from '../images/vector__edit.svg'
import openAddPopupSrc from '../images/vector__add.svg'
import likeIconSrc from '../images/vector__like-button.svg'
import photoIconSrc from '../images/photo_image.png'
import lineIconSrc from '../images/logo/Line.svg'
import vectorIconSrc from '../images/logo/Vector.svg'

const exitIconImages = document.querySelectorAll('#popup-exit')

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

const photoIconImage = document.querySelector('.profile__photo')
photoIconImage.src = photoIconSrc;

const openEditPopupImage = document.querySelector('.profile__edit')
openEditPopupImage.src = openEditPopupSrc;

const openAddPopupImage = document.querySelector('.profile__add')
openAddPopupImage.src = openAddPopupSrc;