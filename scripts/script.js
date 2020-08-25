let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let popup = document.querySelector(".popup");
let form = popup.querySelector(".form");
let openButton = document.querySelector(".profile__edit-button");
let closeButton = popup.querySelector(".form__close");
let name = popup.querySelector(".form__name");
let description = popup.querySelector(".form__description");
let inputName = [name, description];
let saveButton = popup.querySelector(".form__button");



let closePopup = function (event) {
    if (event.target !== event.currentTarget) return
    popupToggle();

}


let popupToggle = function () {
    popup.classList.toggle("popup_display-on");
    if (popup.classList.contains('popup_display-on')) {
        name.value = profileName.textContent;
        description.value = profileDescription.textContent;
}}



let getPopupValues = function (event) {
    event.preventDefault()

    let headerInfo = {
        'name': profileName,
        'description': profileDescription,
    };
    
    for (let i = 0;  i < inputName.length; i++) {
        headerInfo[inputName[i].name].textContent = inputName[i].value;
    }
    popupToggle();

}

form.addEventListener('submit', getPopupValues);
openButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup)