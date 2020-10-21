

class Card {

    constructor(data, template, popupHandler, userInfo, api, popupFactory, deletePopup) {
        this._link = data.link;
        this._name = data.name;
        this.photo_id = data._id;
        this._ownerId = data.owner._id;
        this._template = template
        this._popupHandler = popupHandler
        this._userInfo = userInfo
        this._api = api
        this._popupFactory = popupFactory
        this._deletePopup = deletePopup

    }


    _likeToggle(event) {
        event.target.classList.toggle("element_active-like");
    }

    _getTemplate() {
        const template =  document.querySelector(this._template).content
        return template.cloneNode(true).querySelector(".element")
    }

    _deleteCardApi() {
        this._api.delCard(this.photo_id)
            .then(() => {
                this._element.remove()
            })
            .catch(err => console.log(err))
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
        likeButton.addEventListener('click', this._likeToggle)
        if(this._userInfo().userId === this._ownerId) {

            delButton.removeAttribute('disabled')
            delButton.style.display = "block"
            this._popupFactory(this._deletePopup, delButton, this._deleteCardApi.bind(this), this._userInfo)
        }
        return this._element
    }

}

export {Card}