let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let popup = document.querySelector(".popup");
let openButton = document.querySelector(".profile__edit-button");
let closeButton = popup.querySelector(".form__close");
let inputName = popup.querySelectorAll(".form__input");
let saveButton = popup.querySelector(".form__button")

console.log(inputName);


let closePopup = function (event) {
    if (event.target !== event.currentTarget) return
    popuoToggle();

}


let popuoToggle = function () {
    popup.classList.toggle("popup_display-on");
}

let saveWithEnter = function (e) {
    if (popup.classList.contains("popup_display-on") === true) {
        if (e.keyCode == "13") {
            getPopupValues();
        }
    }
}

let getPopupValues = function () {
    let headerInfo = {
        'name': profileName,
        'description': profileDescription,
    };
    
    for (let i = 0;  i < inputName.length; i++) {
        headerInfo[inputName[i].name].textContent = inputName[i].value;
    }
    popuoToggle();

}

addEventListener("keydown", saveWithEnter);
saveButton.addEventListener('click', getPopupValues);
openButton.addEventListener('click', popuoToggle);
closeButton.addEventListener('click', popuoToggle);
popup.addEventListener('click', closePopup)