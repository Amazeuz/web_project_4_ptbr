export default class UserInfo {
  constructor({firstField, secondField}) {
    this._name = firstField;
    this._job = secondField;
  }

  getUserInfo() {
    const fieldSelectors = {
      name: document.querySelector('.profile__name'),
      job: document.querySelector('.profile__about')
    }
    return fieldSelectors
  }

  setUserInfo() {
    this.getUserInfo().name.textContent = this._name;
    this.getUserInfo().job.textContent = this._job;
  }
}