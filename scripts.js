let page = document.querySelector('.page')
let editButton = document.querySelector('.profile__edit');
let addButton = document.querySelector('.profile__add');
let likeButton = document.querySelectorAll('item__like');

function clickEditButton () {
  page.classList.add('page-opacity');
  document.body.innerHTML +=
  `<form class="form">
    <h1>Editar Perfil</h1>
    <fieldset>
      <input class="teste3" type="text" placeholder="Nome">
      <input class="teste3 type="text" placeholder="Trabalho">
      <button>Salvar</button>
    </fieldset>
  </form>`
  ;
}

editButton.addEventListener("click", clickEditButton)
