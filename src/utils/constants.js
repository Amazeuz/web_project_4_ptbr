import Api from "../components/Api";
export const opacity = document.querySelector('#opacity-block');
export const gallery = document.querySelector('.gallery');
export const imageBlock = document.querySelector('.image-click');
export const profilePhoto = document.querySelector('.profile__photo')
export const profileName = document.querySelector('.profile__name')
export const profileAbout = document.querySelector('.profile__about')
export const confirmationForm = document.querySelector('#form-confirmation')

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_cohort_03",
  headers: {
    authorization: "49a188cf-9e1d-457c-becd-1d6b283140a7",
    "Content-Type": "application/json"
  }
});

export const cardsGallery = api.getServerCards().then(obj => {
  return obj
})