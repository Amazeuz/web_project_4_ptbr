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

  getServerCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
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

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
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

  getLikesNumber(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      headers: {
        authorization: this._authorization,
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

  toggleLike() {
    return fetch(`${this._baseUrl}/cards/likes/cardId`, {
      method: 'PUT'
    })

    .then((res) => {
      if (res.ok) {
        return res.json();
      }

        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
    .then(data => {
      console.log(data)
    })

    .catch((err) => {
      console.log("Erro. A solicitação falhou: ", err);
    })
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
    .catch(err => {
      console.log("Erro. A solicitação falhou: ", err);
    })
  }

  changeProfilePicture(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: data
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

        return Promise.reject(`Algo deu errado: ${res.status}`);
    })
    .catch(err => {
      console.log("Erro. A solicitação falhou: ", err);
    })
  }
}