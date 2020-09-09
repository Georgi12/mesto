import {initialCards} from './constants.js';

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


const delPlace = event => {
    event.target.closest(".element").remove()
}

const likeToggle = (event) => {
    event.target.classList.toggle("element_active-like");
}

const addPhoto = (arrayElement) => {
    const element = getCardElement(arrayElement)
    gallery.prepend(element);
}

const getCardElement = (arrayElement) => {
    const element = protoElement.cloneNode(true);
    const image = element.querySelector(".element__image");
    const caption = element.querySelector(".element__caption")
    const delButton = element.querySelector(".element__delete")
    const likeButton = element.querySelector(".element__like")
    image.src = arrayElement.description;
    image.alt = arrayElement.name;
    caption.textContent = arrayElement.name;
    image.addEventListener('click', popupPhotoAction);
    delButton.addEventListener('click', delPlace);
    likeButton.addEventListener('click', likeToggle);
    return element
}

initialCards.forEach(element => addPhoto(element));

const getPopupValues = (popupInput) => {
    profileName.textContent = popupInput.name;
    profileDescription.textContent = popupInput.description;
}

const determineFunction = popup => {
    if (popup.classList.contains('popup_fio')) return getPopupValues;
    if (popup.classList.contains('popup_place')) return addPhoto;
}

const popupOpen = function (popup) {
    popup.classList.add("popup_display-on");
}


const popupHandler = (event) => {
    event.preventDefault();
    const popup = event.target.closest('.popup')
    const formName = popup.querySelector(".popup__name");
    const formDescription = popup.querySelector(".popup__description");
    const popupFunction = determineFunction(popup);
    if (!popupFunction) return
    popupFunction({'name' : formName.value, 'description' :formDescription.value});
    closePopup(popup);
}


const beforeOpen = () => {
    profilePopupName.value = profileName.textContent;
    profilePopupDescription.value = profileDescription.textContent;
}


profileButton.addEventListener('click', () => {
    // я конечно думал об этом, но предыдущий ревьер предложил это сделать после, тем более что еще был
    // метод toggle. Спасибо за ревью удачи)
    // P.S не нашел способо из коробки запустить константы из модуля, вышло только когда я установил локальный сервак.

    beforeOpen()
    popupProfileAction()
} );
placeButton.addEventListener('click', popupPlaceAction);
