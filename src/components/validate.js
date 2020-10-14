class FormValidator {
    constructor(formObject, form) {
        this._inputElement = formObject.inputElement;
        this._inputsErrorClass = formObject.inputsErrorClass;
        this._errorVisible = formObject.errorVisible;
        this._buttonElement = formObject.buttonElement;
        this._buttonElementDisabled = formObject.buttonElementDisabled;
        this._form = form
        this._inputList = Array.from(this._form.querySelectorAll(`.${this._inputElement}`))

    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputsErrorClass);
        errorElement.classList.remove(this._errorVisible);
        errorElement.textContent = '';
    };

    hideAllInputErrors() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
    }


    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
    })}

    disableButton(buttonElement) {
        buttonElement.setAttribute('disabled', '')
        buttonElement.classList.add(this._buttonElementDisabled)
    }

    showButton(buttonElement) {
        buttonElement.removeAttribute('disabled', '')
        buttonElement.classList.remove(this._buttonElementDisabled)
    }

    toggleButtonState() {

        const buttonElement  =  this._form.querySelector(`.${this._buttonElement}`)
        if(this._hasInvalidInput()) {
            this.disableButton(buttonElement)
        } else {
            this.showButton(buttonElement)
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputsErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorVisible);
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputField) => {
            inputField.addEventListener('input', () => {
                this._checkInputValidity(inputField);
                this.toggleButtonState()
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners()

    };
}

export {FormValidator}