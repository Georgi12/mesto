import {initialCards} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from "./validate";

// список элементов картинок
const gallery = document.querySelector(".elements");

// кнопка редактирования профиля
const profileButton = document.querySelector(".profile__edit-button");

// кнопка добавления фото
const placeButton = document.querySelector(".profile__add-button");

// изменяемые поля профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// элкменты попапа профиля
const popupProfile = document.querySelector(".popup_fio");
const profilePopupName = popupProfile.querySelector('.popup__name');
const profilePopupDescription = popupProfile.querySelector('.popup__description');

// элкменты попапа объектов галерии
const popupPlace = document.querySelector(".popup_place");

const popupPhoto = document.querySelector(".popup_photo-position")

// Шаблон фото
const protoElement = document.querySelector("#element-template").content;

// валижация
const formObject = {
    formElement: 'popup__form',
    inputElement: 'popup__input',
    inputsErrorClass: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    buttonElement: 'popup__button',
    buttonElementDisabled: 'popup__button_disabled'
}


const closePopup = popup => {
    popup.classList.remove("popup_display-on")

    removeListeners(popup);
}


const overlayClose = event => {
    if (event.target !== event.currentTarget) return
    const popup = event.target.closest(".popup");
    closePopup(popup);
}

const escHandler = event => {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_display-on');
        closePopup(activePopup);
    }
}

const btnClosePopup = event => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
}

const removeListeners = popup => {
    const close_btn = popup.querySelector('.popup__close')
    popup.removeEventListener('submit', popupHandler)
    popup.removeEventListener('click', overlayClose);
    document.removeEventListener('keydown', escHandler);
    close_btn.removeEventListener('click', btnClosePopup);
}

const addListeners = popup => {
    const close_btn = popup.querySelector('.popup__close')
    popup.addEventListener('submit', popupHandler)
    popup.addEventListener('click', overlayClose)
    document.addEventListener('keydown', escHandler)
    close_btn.addEventListener('click', btnClosePopup)
}


const preparePhoto = (event, popup) => {
    const image = popup.querySelector(".popup__image")
    const title = event.target.closest('.element').querySelector('.element__caption').textContent
    const imageTitle = popup.querySelector(".popup__photo-title")
    image.src = event.target.src;
    image.alt = event.target.alt
    imageTitle.textContent = title
}


const profileDetermineFunction = (popup) => {
    addListeners(popup)
    popupOpen(popup)
}

const popupProfileAction = () => {
    profileDetermineFunction(popupProfile)
}

const popupPlaceAction = () => {
    profileDetermineFunction(popupPlace)
}

const popupPhotoAction = (event) => {
    preparePhoto(event, popupPhoto)
    profileDetermineFunction(popupPhoto)
}

initialCards.forEach(element => {
    const card = new Card(element)
    card.render(gallery, popupPhotoAction)
});

const getPopupValues = (popupInput) => {
    profileName.textContent = popupInput.name;
    profileDescription.textContent = popupInput.description;
}

const determineFunction = (data, popup) => {
    if (popup.classList.contains('popup_fio')) return getPopupValues(data, popup);
    if (popup.classList.contains('popup_place')) {
        const card = new Card(data)
        card.render(gallery, popupPhotoAction)
    }
}

const popupOpen = function (popup) {
    popup.classList.add("popup_display-on");
}


const popupHandler = (event) => {
    event.preventDefault();
    const popup = event.target.closest('.popup')
    const formName = popup.querySelector(".popup__name");
    const formDescription = popup.querySelector(".popup__description");
    determineFunction(({'name' : formName.value, 'description' :formDescription.value}), popup);
    closePopup(popup);
}


const beforeOpen = () => {
    profilePopupName.value = profileName.textContent;
    profilePopupDescription.value = profileDescription.textContent;
}


profileButton.addEventListener('click', () => {
    beforeOpen()
    popupProfileAction()
} );
placeButton.addEventListener('click', popupPlaceAction);


const validator = new FormValidator(formObject)
validator.enableValidation()