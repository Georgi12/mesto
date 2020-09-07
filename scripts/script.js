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
const popupProfile = document.querySelector(".popup_fio");


// элкменты попапа объектов галерии
const popupPlace = document.querySelector(".popup_place");

const popupPhoto = document.querySelector(".popup_photo-position")

// Шаблон фото
const protoElement = document.querySelector("#element-template").content;

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
    if(popup === popupProfile) {
        popup.querySelector(".popup__name").value = profileName.textContent;
        popup.querySelector(".popup__description").value = profileDescription.textContent;
    }
}


const closePopup = event =>  {
    console.log(event.target)
    console.log(event.currentTarget)
    if (event.target !== event.currentTarget) return
    const popup = event.target.closest('.popup');
    const close_btn = popup.querySelector('.popup__close')
    popupToggle(popup);
    afterClose(popup);
    popup.removeEventListener('submit', popupHandler)
    popup.removeEventListener('click', closePopup);
    popup.removeEventListener('keydown', escHandler)
    close_btn.removeEventListener('click', closePopup);
}

const preparePhoto = (event, popup) => {
    popup.querySelector(".popup__image").src = event.target.src
    popup.querySelector(".popup__photo-title").textContent = event.target.closest('.element').querySelector('.element__caption').textContent
}

const escHandler = event => {
    event.preventDefault();
    if(event.key === 'Escape') {
        closePopup(event)
    }
}


const profileDetermineFunction = (event)  => {
    const determine = {
        'profile__edit-button': popupProfile,
        'profile__add-button': popupPlace,
        'element__image': popupPhoto
    }
    const prepareFunctions = {
        'element__image': preparePhoto
    }
    const popup =  determine[event.target.className]
    if(prepareFunctions[event.target.className]) {
        prepareFunctions[event.target.className](event, popup)
    }
    const close_btn = popup.querySelector('.popup__close')
    popup.addEventListener('submit', popupHandler)
    popup.addEventListener('click', closePopup)
    popup.addEventListener('keydown', escHandler)
    close_btn.addEventListener('click', closePopup)
    popupToggle(popup)
}

const delPlace = event => {
    event.target.closest(".element").remove()
}

const likeToggle =  (event) => {
    event.target.classList.toggle("element_active-like");
}

const addPhoto = (name, photo) => {
    const element =  protoElement.cloneNode(true);
    const image = element.querySelector(".element__image");
    image.src = photo;
    image.alt = name;
    element.querySelector(".element__caption").textContent = name;
    elements.prepend(element);
}
initialCards.forEach(element => addPhoto(element.name, element.link));

const getPopupValues =  (name, description) =>  {
    profileName.textContent = name;
    profileDescription.textContent = description;
}

const determineFunction =  popup =>  {
    if (!popup.classList.contains('popup-place') && popup.classList.contains('popup'))  return getPopupValues;
    if (popup.classList.contains('popup_photo-position')) return  addPhoto;
}

const popupToggle = function (popup) {
    popup.classList.toggle("popup_display-on");
}


const popupHandler = (event) => {
    event.preventDefault();
    const popup = event.target.closest('.popup')
    const formName = popup.querySelector(".popup__name");
    const formDescription = popup.querySelector(".popup__description");
    const popup_function = determineFunction(popup);
    popup_function(formName.value, formDescription.value);
    popup.classList.remove("popup_display-on");
}


const galleryDetermineFunction = (event) => {
    const galleryDetermineHandler = {
        'element__delete': delPlace,
        'element__like': likeToggle,
        'element__like element_active-like': likeToggle,
        'element__image': profileDetermineFunction,
    }
    if(galleryDetermineHandler[event.target.className]) {
        galleryDetermineHandler[event.target.className](event)
    }

}

profileButton.addEventListener('click', profileDetermineFunction);
placeButton.addEventListener('click', profileDetermineFunction);
elements.addEventListener('click', galleryDetermineFunction)

