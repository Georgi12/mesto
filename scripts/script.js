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
const closeButtonProfile = popupProfile.querySelector(".form__close");


// элкменты попапа фото
const popupPlace = document.querySelector(".popup-place");
const closeButtonPlace = popupPlace.querySelector(".form__close");

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


const addPhoto = (name, photo) => {
    const protoElement = document.querySelector("#element-template").content;
    const element =  protoElement.cloneNode(true);
    const image = element.querySelector(".element__image");
    image.src = photo;
    image.alt = name;
    element.querySelector(".element__caption").textContent = name;
    elements.append(element);
}
initialCards.forEach(element => addPhoto(element.name, element.link));

const getPopupValues =  (name, description) =>  {
    profileName.textContent = name;
    profileDescription.textContent = description;
}

const determineFunction =  popup =>  {
    if (!popup.classList.contains('popup-place') && popup.classList.contains('popup'))  return getPopupValues;
    if (popup.classList.contains('popup-place')) return  addPhoto;
}

const popupToggle = function (popup) {
    popup.classList.toggle("popup_display-on");
    if (popup.classList.contains('popup_display-on') && !popup.classList.contains('popup-place')) {
        popup.querySelector(".form__name").value = profileName.textContent;
        popup.querySelector(".form__description").value = profileDescription.textContent;
    }
}
const profileDetermineFunction = ()  => popupToggle(popupProfile);

const placeDetermineFunction = () => popupToggle(popupPlace);

const closePopup = event =>  {
    if (event.target !== event.currentTarget) return
    let popup = event.target.closest('.popup');
    popupToggle(popup);
}

const popupHandler = (event, popup) => {
    const formName = popup.querySelector(".form__name");
    const formDescription = popup.querySelector(".form__description")
    const popup_function = determineFunction(popup)
    popup_function(formName.value, formDescription.value);
    popup.classList.remove("popup_display-on");
    event.preventDefault();
}


popupProfile.addEventListener('submit', function(event){
    popupHandler(event, popupProfile);
})

popupPlace.addEventListener('submit', function(event){
    popupHandler(event, popupPlace);
})

popupProfile.addEventListener('click', closePopup)
popupPlace.addEventListener('click', closePopup)
popupProfile.addEventListener('click', closePopup);
popupPlace.addEventListener('click', closePopup);
profileButton.addEventListener('click', profileDetermineFunction);
placeButton.addEventListener('click', placeDetermineFunction);
closeButtonProfile.addEventListener('click', closePopup);  
closeButtonPlace.addEventListener('click', closePopup);  