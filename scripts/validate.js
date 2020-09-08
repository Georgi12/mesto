// элементы
const formObject = {
    formElement: 'popup__form',
    inputElement: 'popup__input',
    inputsErrorClass: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    buttonElement: 'popup__button',
    buttonElementDisabled: 'popup__button_disabled'
}


const showInputError = (formElement, inputElement, errorMessage, inputsErrorClass, errorVisible) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(inputsErrorClass)
    inputElement.classList.add(inputsErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorVisible);
};

const hideInputError = (formElement, inputElement, inputsErrorClass, errorVisible) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputsErrorClass);
    errorElement.classList.remove(errorVisible);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputsErrorClass, errorVisible) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputsErrorClass, errorVisible);
    } else {
        hideInputError(formElement, inputElement, inputsErrorClass, errorVisible);
    }
};


const setEventListeners = (formElement, {inputElement, buttonElement, inputsErrorClass, errorVisible, buttonElementDisabled}) => {


    const inputList = Array.from(formElement.querySelectorAll(`.${inputElement}`));
    const button  =  formElement.querySelector(`.${buttonElement}`)
    toggleButtonState(inputList, button, buttonElementDisabled)
    inputList.forEach((inputField) => {
        inputField.addEventListener('input', function () {
            checkInputValidity(formElement, inputField, inputsErrorClass, errorVisible);
            toggleButtonState(inputList, button, buttonElementDisabled)
        });
    });

}


const hasInvalidInput = inputList => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const enableValidation = ({formElement, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(`.${formElement}`));
    console.log(formList)
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest)
    });
};


const toggleButtonState = (inputList, buttonElement, buttonElementDisabled) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '')
        buttonElement.classList.add(buttonElementDisabled)
    } else {
        buttonElement.removeAttribute('disabled', '')
        buttonElement.classList.remove(buttonElementDisabled)
    }
}


enableValidation(formObject);
