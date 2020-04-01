class FormValidator {
    constructor(form) {
        this.form = form;
        this.hasError = false;
    }

    validateLink(link) {
        const regex = new RegExp("(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?");
        const errorElement = document.querySelector(`#error-${link.name}`);

        if (regex.test(link.value)) {
            errorElement.textContent = '';
        } else {
            errorElement.textContent = 'Здесь должна быть ссылка вида "https://"';
            this.hasError = true;
        }

    }

    validateInput(input) {
        const errorElement = this.form.querySelector(`#error-${input.name}`);
        // можно лучше: Для валидации используйте кастомный метод validation
        // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
        // на русском https: //msiter.ru/tutorials/javascript/js_validation 
        // на русском https://htmlacademy.ru/blog/useful/html/form-validation-techniques 
        // на английском очень хорошая статья с примерами https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/ 
        // 
        // как пример, если вы установите  <input type="text" min="10" max="100" >
        // то сразу сможете определить что текст слишком короткий, например так: 
        //  
        // if (validity.tooShort) { 
        // // Значение слишком короткое 
        // }
        // if (validity.tooLong) { 
        // // Значение слишком длинное 
        // }
        if (input.value.length < 1) {
            errorElement.textContent = 'Это обязательное поле'
            this.hasError = true;
        }
        if (input.value.length === 1 || input.value.length > 30) {
            this.hasError = true;
            errorElement.textContent = 'Должно быть от 2 до 30 символов'
        }
        if (input.value.length === 2 && input.value.length < 30) {
            this.hasError = true;
            errorElement.textContent = '';
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', this.checkInputValidity.bind(this));
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    }

    checkInputValidity() {
        this.hasError = false;
    }

    setSubmitButtonState() {
        const saveButton = this.form.querySelector('.popup__button');

        if (this.hasError) {
            saveButton.setAttribute('disabled', true);
            saveButton.classList.remove('popup__button_active')
        } else {
            saveButton.removeAttribute('disabled');
            saveButton.classList.add('popup__button_active');
        }
    }
}



