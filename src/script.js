import "./pages/index.css"
import Section from "./components/Section.js";
import {initialCards, group, token, baseUrl} from './components/constants.js';
import {Card} from './components/Card.js';
import {FormValidator} from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js"
import UserInfo from "./components/UserInfo.js"
import {Api} from "./components/Api.js"


// селектор галереи
const gallery =".elements";

// селектор размещения фото
const popupPhoto =".popup_photo-position";

// селекторы профиля
const profileName = ".profile__name";
const profileDescription = ".profile__description";
const avatar = ".profile__avatar"
const avatarNode = document.querySelector('.profile__avatar')

// селектор попапа профиля
const popupProfile = ".popup_fio";
const popupAvatar = ".popup_avatar"

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

const api = new Api({baseUrl: `${baseUrl}/${group}`, token: token})

const userInfo = new UserInfo({
    profileName: profileName,
    profileDescription: profileDescription,
    avatar: avatar,
})


api.getProfileInfo()
    .then(data => {
        return userInfo.setUserInfo(data)
    })
    .catch(err => {
        console.log(err)
    })



const imagePopup = new PopupWithImage(popupPhoto)

const handleCardClick = (event) => {

    imagePopup.open(event)
    imagePopup.setEventListeners()
}

const photoRender = (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    galleryArray.addItem(card.getView());
}

const galleryApi = () => {
    return api.getCards()
}

const galleryArray = new Section({
        api: galleryApi,
        renderer: (item)  => photoRender(item)
    },
    gallery,
);

galleryArray.renderElement()



const beforeOpen = () => {
    return userInfo.getUserInfo()
}

const popupAvatarHandler = (event, data) => {
    event.preventDefault();
    userInfo.setUserInfo(data)
}

const popupInfoHandler =  (event, data) => {
    event.preventDefault();
    userInfo.setUserInfo(data)
}

const popupPlaceHandler =  (event, data) => {
    event.preventDefault();
    photoRender(data)
}

function popupFactory(popupClass, submitHandler, button, api, beforeOpen, beforeOpenFlag=false) {
    const popup = new PopupWithForm(popupClass, submitHandler, api, beforeOpen)
    const validator = new FormValidator(formObject, popup.get_form())

    const avatarCloseHandler = () => {
        validator.toggleButtonState()
        validator.hideAllInputErrors()
    }

    button.addEventListener('click', () => {
        popup.setCloseHandler(avatarCloseHandler)
        if(beforeOpenFlag) {
            popup.setFormValue()
        }
        popup.open()
    } );
    validator.enableValidation()
    return popup
}

const saveAvatarApi = (event, data) => {
    event.preventDefault();
    api.setAvatarInfo(data)
        .then(data => {
            userInfo.setUserInfo(data)
        })
        .catch()
}

popupFactory(popupAvatar, popupAvatarHandler, avatarNode, saveAvatarApi, beforeOpen)

const savePlaceApi = (event, data) => {
    event.preventDefault();
    api.setProfileInfo(data)
        .then(data => {
            userInfo.setUserInfo(data)
        })
        .catch()
}


popupFactory(popupPlace, popupPlaceHandler, placeButton, api, beforeOpen)


const saveProfileApi = (event, data) => {
    event.preventDefault();
    api.setProfileInfo(data)
        .then(data => {
            userInfo.setUserInfo(data)
        })
        .catch()
}

popupFactory(popupProfile, popupInfoHandler, profileButton, saveProfileApi, beforeOpen, true)

