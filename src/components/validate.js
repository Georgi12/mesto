class FormValidator {
    constructor(formObject) {
        this._formElement = formObject.formElement;
        this._inputElement = formObject.inputElement;
        this._inputsErrorClass = formObject.inputsErrorClass;
        this._errorVisible = formObject.errorVisible;
        this._buttonElement = formObject.buttonElement;
        this._buttonElementDisabled = formObject.buttonElementDisabled;

    }

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputsErrorClass);
        errorElement.classList.remove(this._errorVisible);
        errorElement.textContent = '';
    };

    hideAllInputErrors(formElement) {
        const currentInputElements = this._get_input_list(formElement);
        currentInputElements.forEach(inputElement => {
            this._hideInputError(formElement, inputElement)
        })
    }


    _hasInvalidInput(formElement) {
        const inputList = this._get_input_list(formElement)
        return inputList.some((inputElement) => {
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

    toggleButtonState(formElement) {

        const buttonElement  =  formElement.querySelector(`.${this._buttonElement}`)
        if(this._hasInvalidInput(formElement)) {
            this.disableButton(buttonElement)
        } else {
            this.showButton(buttonElement)
        }
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputsErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorVisible);
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _get_input_list(formElement) {
        return Array.from(formElement.querySelectorAll(`.${this._inputElement}`))
    }

    _setEventListeners(formElement) {
        const inputList = this._get_input_list(formElement);
        this.toggleButtonState(formElement);
        inputList.forEach((inputField) => {
            inputField.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputField);
                this.toggleButtonState(formElement)
            });
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(`.${this._formElement}`));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });

            this._setEventListeners(formElement)
        });
    };
}

export {FormValidator}