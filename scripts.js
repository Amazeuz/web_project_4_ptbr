let form = document.querySelector('.form')
let opacity = document.querySelector('#opacity-block')
let editButton = document.querySelector('.profile__edit');
let addButton = document.querySelector('.profile__add');
let likeButton = document.querySelector('section.gallery div.item .item__like');

function clickLikeButton () {
  likeButton.classList.add('item__like_black');
  console.log('teste');
}

function clickEditButton () {
  opacity.classList.add('page-opacity');
  form.classList.remove('form_hidden')
}

function changeInputs () {
  let name = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__job');
  let newName = document.querySelector('.form__input-name');
  let newJob = document.querySelector('.form__input-job');

  if (newName.value.length > 0 && newJob.value.length > 0) {
    name.textContent = newName.value;
    job.textContent = newJob.value;
    newName.value = '';
    newJob.value = '';
    closeForm();
  }
  else {
    newName.setAttribute('placeholder', 'Preencha os campos !');
    newJob.setAttribute('placeholder', 'Preencha os campos !');
  }
}

function closeForm () {
  opacity.classList.remove('page-opacity');
  form.classList.add('form_hidden');
}

editButton.addEventListener("click", clickEditButton);
likeButton.addEventListener("click", clickLikeButton);