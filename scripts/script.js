import Section from "./Section.js";
import {initialCards} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from "./validate.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js"


// список элементов картинок
const gallery =".elements";
const popupPhoto =".popup_photo-position";

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

// валидация
const formObject = {
    formElement: 'popup__form',
    inputElement: 'popup__input',
    inputsErrorClass: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    buttonElement: 'popup__button',
    buttonElementDisabled: 'popup__button_disabled'
}


const removeListeners = popup => {
    const closeBtn = popup.querySelector('.popup__close')
    popup.removeEventListener('submit', popupHandler)
    popup.removeEventListener('click', overlayClose);
    document.removeEventListener('keydown', escHandler);
    closeBtn.removeEventListener('click', btnClosePopup);
}



const handleCardClick = (event) => {
    const imagePopup = new PopupWithImage(popupPhoto)
    imagePopup.open(event)
    imagePopup.setEventListeners()
}

const photoRender = (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    galleryArray.addItem(card.getView());
}

const galleryArray = new Section({
        items: initialCards,
        renderer: (item)  => photoRender(item)
    },
    gallery,
);

galleryArray.renderElement()


const userInfo = new UserInfo({
    profileName: ".profile__name",
    profileDescription: ".popup__description"
})

const popupInfoHandler =  (event, data) => {
    event.preventDefault();
    userInfo.setUserInfo(data)
}

const popupPlaceHandler =  (event, data) => {
    event.preventDefault();
    photoRender(data)
}


const beforeOpen = () => {
    profilePopupName.value = profileName.textContent;
    profilePopupDescription.value = profileDescription.textContent;
}

profileButton.addEventListener('click', () => {
    const popupForm = new PopupWithForm('.popup_fio', popupInfoHandler)
    popupForm.open()
    popupForm.setEventListeners()
} );


placeButton.addEventListener('click', () => {
    const placePopup = new PopupWithForm('.popup_place', popupPlaceHandler)
    placePopup.open()
    placePopup.setEventListeners()
});


const validator = new FormValidator(formObject)
validator.enableValidation()