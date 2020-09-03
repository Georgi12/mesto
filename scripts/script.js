
// список элементов картинок
const elements = document.querySelector(".elements");

// кнопка редактирования профиля
const openButton = document.querySelector(".profile__edit-button");

// кнопка добавления фото
const addButton = document.querySelector(".profile__add-button");

// изменяемые поля профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// элкменты попапа профиля
const popup = document.querySelector(".popup");


// элкменты попапа фото
const popupPlace = document.querySelector(".popup-place");


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

const popupToggle = (event, force=false) => {
    console.log(event.target.className)
    const determinePopup = {
        'profile__edit-button': popup,
        'profile__add-button': popupPlace,
        'form__close': event.target.closest('.popup'),
        'popup popup_display-on': event.target,
        'form': event.target.closest('.popup'),
        'popup popup-place popup_display-on': event.target,
    }
    const popupAvatar = determinePopup[event.target.className]

    popupAvatar.classList.toggle("popup_display-on");
    if (force) return false

    popupAvatar.addEventListener('click', closePopup)
    const closeButton = popupAvatar.querySelector(".form__close");
    const currentForm = popupAvatar.querySelector(".form");
    const currentFunction = {
        'popup popup_display-on': getPopupValues,
        'popup popup-place popup_display-on': addPhoto
    }
    const functionAvatar = currentFunction[popupAvatar.className]
    const formName = popupAvatar.querySelector(".form__name");
    const formDescription = popupAvatar.querySelector(".form__description")
    if (functionAvatar) {
        currentForm.addEventListener('submit', functionAvatar (event, formName.value, formDescription.value));
    }
    closeButton.addEventListener('click', popupToggle);
    if (popupAvatar.classList.contains('popup_display-on') && !popupAvatar.classList.contains('popup-place')) {
        formName.value = profileName.textContent;
        formDescription.value = profileDescription.textContent;
}}

const addPhoto = (event, name, photo, ) =>  {
    if (event) {
       event.preventDefault()
    }
    const protoElement = document.querySelector("#element-template").content;
    const element =  protoElement.cloneNode(true);
    const image = element.querySelector(".element__image");
    image.src = photo;
    image.alt = name;
    element.querySelector(".element__caption").textContent = name;
    elements.append(element);
    if (event.type === 'submit') {
       popupToggle(event, true)
    }
}
initialCards.forEach(element => addPhoto(false, element.name, element.link));

const getPopupValues =  (event, name, description, ) => {
    console.log(name)
    console.log(description)
    console.log(event)
    event.preventDefault()
    profileName.textContent = name;
    profileDescription.textContent = description;

    popupToggle(event, true);
}

const closePopup = event => {
    if (event.target !== event.currentTarget) return
    popupToggle(event);
}


openButton.addEventListener('click', popupToggle (event));
addButton.addEventListener('click', popupToggle (event))