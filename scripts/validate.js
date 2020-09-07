// элементы
const formArray = {
    formElement: 'popup__form',
    inputElement: 'popup__input',
    inputsErrorClass: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    buttonElement: '.popup__button',
    buttonElementDisabled: 'popup__button_disabled'
}


// показываем ошибку
function showInputError(formElement, inputElement, elementList){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(elementList.inputsErrorClass);
    errorElement.classList.add(elementList.errorVisible);
    errorElement.textContent = inputElement.validationMessage;
};

// убираем ошибку
function hideInputError(formElement, inputElement, elementList){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(elementList.inputsErrorClass);
    errorElement.classList.remove(elementList.errorVisible);
    errorElement.textContent = '';
};

// проверяем на валидность
function checkValidity(formElement, inputElement, elementList){
    if (!inputElement.validity.valid){
        showInputError(formElement, inputElement, elementList);
    } else {
        hideInputError(formElement, inputElement, elementList);
    }
}

// расставляем слушатели событий
function setEventListeners(formElement, elementList){
    const inputList = Array.from(formElement.querySelectorAll(elementList.inputElement));
    const submitButton = formElement.querySelector(elementList.buttonElement);
    toggleButtonState(inputList, submitButton, elementList);
    inputList.forEach((inputElement) => {
        console.log(inputElement);
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, elementList);
            toggleButtonState(inputList, submitButton, elementList);
        })
    })
}

//включаем валидацию для всех форм
function enableValidation(elementList){
    const formList = Array.from(document.querySelectorAll(elementList.formElement));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement, elementList);
    })
}


//если есть ошибка
function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//переключаем состояние кнопки
function toggleButtonState(inputList, buttonElement, elementList) {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(elementList.buttonElementDisabled);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(elementList.buttonElementDisabled);
        buttonElement.removeAttribute('disabled', 'disabled')
    }
}

enableValidation(formArray);