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


// элкменты попапа объектов галерии
const popupPlace = document.querySelector(".popup_place");

const popupPhoto = document.querySelector(".popup_photo-position")

// Шаблон фото
const protoElement = document.querySelector("#element-template").content;

// Очень странно, я сделал еще один файл js, поместил в него массив фотографий.
// объявил вот так: export const initialCards = [...]. В этом файле пытался импортировать
// import {initialCards} from "./constants.js" , но JS бы против, говорил что файл не яв-ся модулем.
// Я в html заделал ему type=module", и сломалось вообще.


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const afterClose = (popup) => {
    if (popup === popupProfile) {
        popup.querySelector(".popup__name").value = profileName.textContent;
        popup.querySelector(".popup__description").value = profileDescription.textContent;
    }
}


const closePopup = popup => {
    popup.classList.remove("popup_display-on")

    removeListeners(popup);
}

// пока пришло в голову только это, но это из быстрого решения. Я так пологаю вы хотели что бы я
// объявил все внутренности попапов отдельно. И в зависимости от запуска или закрытия попапа,
// был бы свой уникальный колбэк, внутри которого вызывалась бы общая функция закрытия?
const closeWrapper = (popup) => {
    closePopup(popup);
    afterClose(popup);
}


const overlayClose = event => {
    if (event.target !== event.currentTarget) return
    const popup = event.target.closest(".popup");
    closeWrapper(popup);
}

const escHandler = event => {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_display-on');
        closeWrapper(activePopup);
    }
}

const btnClosePopup = event => {
    const popup = event.target.closest(".popup");
    closeWrapper(popup);
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
    image.src = arrayElement.link;
    image.alt = arrayElement.name;
    caption.textContent = arrayElement.name;
    image.addEventListener('click', popupPhotoAction);
    delButton.addEventListener('click', delPlace);
    likeButton.addEventListener('click', likeToggle);
    return element
}

initialCards.forEach(element => addPhoto(element));

const getPopupValues = (name, description) => {
    profileName.textContent = name;
    profileDescription.textContent = description;
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
    popupFunction(formName.value, formDescription.value);
    closePopup(popup);
}

profileButton.addEventListener('click', popupProfileAction);
placeButton.addEventListener('click', popupPlaceAction);

// может я не правильно полял, просто в тренажере было сказано о том, что много слушателей на элементаж ест много памяти
// я только по этому решил сделшать так. Можете объяснить в какой ситуации вешать слушатель на всю область, или,
// а в какой вешать на каждый элемент