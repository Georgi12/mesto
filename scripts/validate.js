class FormValidator {
    constructor(formObject) {
        this._formElement = formObject.formElement;
        this._inputElement = formObject.inputElement;
        this._inputsErrorClass = formObject.inputsErrorClass;
        this._errorVisible = formObject.errorVisible;
        this._buttonElement = formObject.buttonElement;
        this._buttonElementDisabled = formObject.buttonElementDisabled;

    }

    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputsErrorClass);
        errorElement.classList.remove(this._errorVisible);
        errorElement.textContent = '';
    };


    _hasInvalidInput = inputList => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

    _toggleButtonState = (inputList, buttonElement) => {
        if(this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', '')
            buttonElement.classList.add(this._buttonElementDisabled)
        } else {
            buttonElement.removeAttribute('disabled', '')
            buttonElement.classList.remove(this._buttonElementDisabled)
        }
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputsErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorVisible);
    };

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(`.${this._inputElement}`));
        const button  =  formElement.querySelector(`.${this._buttonElement}`);
        this._toggleButtonState(inputList, button);
        inputList.forEach((inputField) => {
            inputField.addEventListener('input', function () {
                this._checkInputValidity(formElement, inputField);
                this._toggleButtonState(inputList, button)
            });
        });
    }

    enableValidation = () => {
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