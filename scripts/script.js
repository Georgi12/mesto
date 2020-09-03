
// список элементов картинок
const elements = document.querySelector(".elements");

// кнопка редактирования профиля
const profileButton = document.querySelector(".profile__edit-button");

// кнопка добавления фото
const placeButton = document.querySelector(".profile__add-button");

// изменяемые поля профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// элкменты попапа профиля
const popupProfile = document.querySelector(".popup");


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


const addPhoto = (name, photo) =>  {
    const protoElement = document.querySelector("#element-template").content;
    const element =  protoElement.cloneNode(true);
    const image = element.querySelector(".element__image");
    image.src = photo;
    image.alt = name;
    element.querySelector(".element__caption").textContent = name;
    elements.append(element);
}
initialCards.forEach(element => addPhoto(element.name, element.link));

const getPopupValues =  (name, description) => {
    profileName.textContent = name;
    profileDescription.textContent = description;
}


let popupToggle = function (event, popup) {
    const closeButton = popup.querySelector(".form__close");
    const currentForm = popup.querySelector(".form");
    const formName = popup.querySelector(".form__name");
    const formDescription = popup.querySelector(".form__description")
    closeButton.addEventListener('click', closePopup);
    popup.addEventListener('click', closePopup)
    if (popup.classList.contains('popup_display-on')) {
        let buttonFunction;
        if (!popup.classList.contains('popup-place') && popup.classList.contains('popup')) buttonFunction = getPopupValues
        if (popup.classList.contains('popup-place')) buttonFunction = addPhoto
        currentForm.addEventListener('submit', function(event){
            event.preventDefault();
            buttonFunction(formName.value, formDescription.value);
            popup.classList.toggle("popup_display-on");
        })
        if (!popup.classList.contains('popup-place')) {
            formName.value = profileName.textContent;
            formDescription.value = profileDescription.textContent;
        }
    }

    popup.classList.toggle("popup_display-on");
    }


const profileDetermineFunction = event => popupToggle(event, popupProfile)


const placeDetermineFunction = event => popupToggle(event, popupPlace)


const closePopup = event => {
    if (event.target !== event.currentTarget) return
    let popup = event.target.closest('.popup');
    popupToggle(event, popup);
}


profileButton.addEventListener('click', profileDetermineFunction);
placeButton.addEventListener('click', placeDetermineFunction)