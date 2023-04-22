export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    try {
      this._renderedItems.then(obj => {
        obj.forEach((item) => {
          this._renderer(item);
        })
      });
    }
    catch(error) {
      console.log(error)
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    }

  }

  addItem(element) {
    this._container.prepend(element)
  }
}