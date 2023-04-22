export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._authorization = options.headers.authorization;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
    .catch((err) => {
      console.log("Erro. A solicitação falhou: ", err);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
    .catch((err) => {
      console.log("Erro. A solicitação falhou: ", err);
    });
  }

  editProfile() {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist"
      })
    })
  }

  addNewCard() {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Colinas geladas",
        link: "https://images.unsplash.com/photo-1676763132710-44eed05e297f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
      console.log("Erro. A solicitação falhou: ", err);
    });
  }

  getLikesNumber() {

  }

  toggleLike() {
    fetch(`${this._baseUrl}/cards/likes/cardId`, {
      method: 'PUT'
    })

    fetch(`${this._baseUrl}/cards/likes/cardId`, {
      method: 'DELETE'
    })
  }

  changeProfilePicture() {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: {
        avatar: 'teste'
      }
    })
  }
}