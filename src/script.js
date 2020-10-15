import Section from "./components/Section.js";
import {initialCards} from './components/constants.js';
import {Card} from './components/Card.js';
import {FormValidator} from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js"
import UserInfo from "./components/UserInfo.js"
import "./pages/index.css"


console.log('loooj', location?.href)

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
    inputElement: 'popup__input',
    inputsErrorClass: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    buttonElement: 'popup__button',
    buttonElementDisabled: 'popup__button_disabled'
}

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


const profilePopupForm = new PopupWithForm(popupProfile, popupInfoHandler)
const profileValidator = new FormValidator(formObject, profilePopupForm.get_form())

const profileCloseHandler = () => {
    profileValidator.toggleButtonState()
    profileValidator.hideAllInputErrors()
}

profileButton.addEventListener('click', () => {
    profilePopupForm.setFormValue(beforeOpen())
    profilePopupForm.setCloseHandler(profileCloseHandler)
    profilePopupForm.open()
} );

const placePopup = new PopupWithForm(popupPlace, popupPlaceHandler)
const placeValidator = new FormValidator(formObject, placePopup.get_form())

const placeCloseHandler = () => {
    placeValidator.toggleButtonState()
    placeValidator.hideAllInputErrors()
}

placeButton.addEventListener('click', () => {
    placePopup.setCloseHandler(placeCloseHandler)
    placePopup.open()
});


profileValidator.enableValidation()
placeValidator.enableValidation()


// Спасибо, за ревью, ничего страшного не произошло, я полагаю всегда можно договорится)
