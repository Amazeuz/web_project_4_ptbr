export default class UserInfo {
  constructor({firstInput, secondInput}) {
    this._name = firstInput;
    this._job = secondInput;
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