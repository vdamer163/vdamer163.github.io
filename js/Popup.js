class Popup {
  constructor(elem, openContainer, closeContainer) {
    this.elem = elem;
    this.openContainer = openContainer;
    this.closeContainer = closeContainer
  }

  init() {
    this.openContainer.addEventListener('click', this.show.bind(this));
    this.closeContainer.addEventListener('click', this.hide.bind(this));
  }


  show() {
    this.elem.classList.add('popup_is-opened')
  }

  hide() {
    this.elem.classList.remove('popup_is-opened')
  }


}