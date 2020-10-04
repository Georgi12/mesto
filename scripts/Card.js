

class Card {

    constructor(data, template, popupHandler) {
        this._link = data.description;
        this._name = data.name;
        this._template = template
        this._popupHandler = popupHandler
    }

    _delPlace = event => {
        event.target.closest(".element").remove()
    }

    _likeToggle = (event) => {
        event.target.classList.toggle("element_active-like");
    }

    _getTemplate() {
        const template =  document.querySelector(this._template).content
        return template.cloneNode(true)
    }

    getView() {
        this._element = this._getTemplate();
        const image = this._element.querySelector(".element__image");
        const caption = this._element.querySelector(".element__caption")
        const delButton = this._element.querySelector(".element__delete")
        const likeButton = this._element.querySelector(".element__like")
        image.src = this._link;
        image.alt = this._name;
        caption.textContent = this._name;
        image.addEventListener('click',  this._popupHandler);
        delButton.addEventListener('click', this._delPlace);
        likeButton.addEventListener('click', this._likeToggle)
        return this._element
    }

}

export {Card}