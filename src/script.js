import "./pages/index.css"
import Section from "./components/Section.js";
import {group, token, baseUrl} from './components/constants.js';
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
const popupAvatar = ".popup_avatar";
const popupDelete = ".popup_delete";

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

const galleryArray = new Section(
    {renderer: (item)  => photoRender(item)},
    gallery,
);

const photoRender = (item) => {
    const card = new Card(item, '#element-template', handleCardClick, getUserInfo, api, popupFactory, popupDelete);
    galleryArray.addItem(card.getView());
}


const renderCards = (initialCards) => {
    galleryArray.renderElement(initialCards)
}


Promise.all([
    api.getProfileInfo(),
    api.getCards(),
])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo(userData)
        renderCards(initialCards)
    })
    .catch((err) => {
        console.log(err);
    });


const getUserInfo = () => {
    return userInfo.getUserInfo()
}

const imagePopup = new PopupWithImage(popupPhoto)

const handleCardClick = (event) => {

    imagePopup.open(event)
    imagePopup.setEventListeners()
}


function popupFactory(popupClass, button, api, userInfo, beforeOpenFlag=false) {
    const popup = new PopupWithForm(popupClass, api, userInfo)
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
    });
    validator.enableValidation()
    return popup
}

const saveAvatarApi = (event, data, close, button) => {
    event.preventDefault();
    button.textContent = 'Сохранение...'
    api.setAvatarInfo(data)
        .then(data => {
            userInfo.setUserInfo(data)
            close()
        })
        .catch()
}

popupFactory(popupAvatar, avatarNode, saveAvatarApi, getUserInfo)


const savePlaceApi = (event, data, close, button) => {
    event.preventDefault();
    button.textContent = 'Сохранение...'
    api.setCard(data)
        .then(data => {
            photoRender(data)
            close()
        })
        .catch()
}

popupFactory(popupPlace, placeButton, savePlaceApi, getUserInfo)


const saveProfileApi = (event, data, close, button) => {
    event.preventDefault();
    button.textContent = 'Сохранение...'
    api.setProfileInfo(data)
        .then(data => {
            userInfo.setUserInfo(data)
            close()
        })
        .catch()
}
popupFactory(popupProfile, profileButton, saveProfileApi, getUserInfo, true)

