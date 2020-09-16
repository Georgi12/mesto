

class Card {
    static  template =  document.querySelector("#element-template").content

    constructor(data) {
        this._link = data.description;
        this._name = data.name;
    }

    _delPlace = event => {
        event.target.closest(".element").remove()
    }

    _likeToggle = (event) => {
        event.target.classList.toggle("element_active-like");
    }


    _prepareElement(popupPhotoAction) {
        this._element = Card.template.cloneNode(true);
        const image = this._element.querySelector(".element__image");
        const caption = this._element.querySelector(".element__caption")
        const delButton = this._element.querySelector(".element__delete")
        const likeButton = this._element.querySelector(".element__like")
        image.src = this._link;
        image.alt = this._name;
        caption.textContent = this._name;
        image.addEventListener('click', popupPhotoAction);
        delButton.addEventListener('click', this._delPlace);
        likeButton.addEventListener('click', this._likeToggle)
    }

    render(container, popupPhotoAction) {
        this._prepareElement(popupPhotoAction)
        container.prepend(this._element)
    }
}

export {Card}