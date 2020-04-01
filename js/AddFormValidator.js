class AddFormValidator extends FormValidator {
    checkInputValidity() {
        super.checkInputValidity();
        this.validateInput(this.form.elements.name);
        this.validateLink(this.form.elements.link);
    }
}