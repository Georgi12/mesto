import Section from "./Section.js";
import {initialCards} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from "./validate.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js"


// селектор галереи
const gallery =".elements";

// селектор размещения фото
const popupPhoto =".popup_photo-position";

// селекторы профиля
const profileName = ".profile__name";
const profileDescription = ".profile__description";

// селектор попапа профиля
const popupProfile = ".popup_fio";

// селектор попапа галерии
const popupPlace = ".popup_place";

// кнопка редактирования профиля
const profileButton = document.querySelector(".profile__edit-button");

// кнопка добавления фото
const placeButton = document.querySelector(".profile__add-button");

// валидация
const formObject = {
    formElement: 'popup__form',
    inputElement: 'popup__input',
    inputsErrorClass: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    buttonElement: 'popup__button',
    buttonElementDisabled: 'popup__button_disabled'
}
const validator = new FormValidator(formObject)


const imagePopup = new PopupWithImage(popupPhoto)

const handleCardClick = (event) => {

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
    profileName: profileName,
    profileDescription: profileDescription,
})

const beforeOpen = () => {
    return userInfo.getUserInfo()
}

const popupInfoHandler =  (event, data) => {
    event.preventDefault();
    userInfo.setUserInfo(data)
}

const popupPlaceHandler =  (event, data) => {
    event.preventDefault();
    photoRender(data)
}

const closeHandler = (form) => {
    validator.toggleButtonState(form)
    validator.hideAllInputErrors(form)
}


const popupForm = new PopupWithForm(popupProfile, popupInfoHandler, closeHandler)

profileButton.addEventListener('click', () => {
    popupForm.setFormValue(beforeOpen())
    popupForm.open()
} );

const placePopup = new PopupWithForm(popupPlace, popupPlaceHandler, closeHandler)

placeButton.addEventListener('click', () => {
    placePopup.open()
});


validator.enableValidation()



