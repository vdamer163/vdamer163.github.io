class Card {
    constructor(data) {
        this.data = data;

    }

    init() {
        this.create();
        this.likeButton = this.element.querySelector('.place-card__like-icon');
        this.setLikeListeners();
        this.removeButton = this.element.querySelector('.place-card__delete-icon');
        this.setRemoveListeners()

    }

    create() {
        this.element = document.createElement('div');
        this.element.classList.add('place-card');
        this.element.insertAdjacentHTML('beforeend', `<div class="place-card__image"
style="background-image: url(${this.data.link})" data-image="${this.data.link}">
                                       <button class="place-card__delete-icon"></button>
                                   </div>
                                   <div class="place-card__description">
                                       <h3 class="place-card__name">${this.data.name}</h3>
                                       <button class="place-card__like-icon"></button>
                                   </div>`)

    }

    // Можно лучше -- геттер
    // https://learn.javascript.ru/private-protected-properties-methods
    getElement() {
        return this.element
    }

    setLikeListeners() {
        this.likeButton.addEventListener('click', this.like.bind(this))
    }

    like() {
        this.element
            .querySelector('.place-card__like-icon').classList
            .toggle('place-card__like-icon_liked');

    }

    setRemoveListeners() {
        this.removeButton.addEventListener('click', this.remove.bind(this))
    }

    remove() {
        this.element.remove();
    }


}