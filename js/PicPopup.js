class PicPopup {


    show(event) {

        if (event.target.classList.contains('place-card__image')) {
            document.getElementById('picture').classList.add('popup_is-opened');
            document.querySelector('.popup__image').src = event.target.getAttribute('data-image');

        }
    }

    hide() {

        document.getElementById('picture').classList.remove('popup_is-opened')
    }


}