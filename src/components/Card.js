

class Card {

    constructor(data, template, popupHandler, userInfo, api, popupFactory, deletePopup) {
        this._data = data
        this.photo_id = data._id;
        this._ownerId = data.owner._id;
        this._template = template
        this._popupHandler = popupHandler
        this._userInfo = userInfo
        this._api = api
        this._popupFactory = popupFactory
        this._deletePopup = deletePopup
        this._bindlikeToggle = this._likeToggle.bind(this)
        this._bindcheckMethod = this._checkMethod.bind(this)
    }

    _checkMethod(element) {
        return element._id === this._userInfo().userId
    }

    _checkIncludes() {
        return this._data.likes.some(this._bindcheckMethod)
    }


    _apiLikeHandler(res) {
        this._updateLike();
        this._updateLikeTotal(res.likes.length)
        this._data.likes = res.likes
    }

    _likeToggle() {
        if(this._checkIncludes()) {
            this._api.apiUnLike(this.photo_id)
                .then((res) => {
                    this._apiLikeHandler(res);
                })
                .catch(err => console.log(err))
        } else {
            this._api.apiLike(this.photo_id)
                .then((res) => {
                    this._apiLikeHandler(res);
                })
                .catch(err => console.log(err))
        }
    }

    _updateLike() {
        this._likeButton.classList.toggle("element_active-like")
    }

    _setLike() {
        if(this._checkIncludes()) {
            this._likeButton.classList.add("element_active-like");
        } else {
            this._likeButton.classList.remove("element_active-like");
        }
        this._updateLikeTotal(this._data.likes.length)
    }

    _getTemplate() {
        const template =  document.querySelector(this._template).content
        return template.cloneNode(true).querySelector(".element")
    }

    _deleteCardApi(event, data, close, button) {
        this._api.delCard(this.photo_id)
            .then(() => {
                this._element.remove()
                close()
            })
            .catch(err => console.log(err))
    }

    _updateLikeTotal(number) {
        this._likeCount.textContent = number
    }

    getView() {
        this._element = this._getTemplate();
        const image = this._element.querySelector(".element__image");
        const caption = this._element.querySelector(".element__caption")
        const delButton = this._element.querySelector(".element__delete")
        this._likeCount = this._element.querySelector(".element__like-count")
        this._likeButton = this._element.querySelector(".element__like")
        image.src = this._data.link;
        image.alt = this._data.name;
        caption.textContent = this._data.name;
        image.addEventListener('click',  this._popupHandler);
        this._likeButton.addEventListener('click',  this._bindlikeToggle);
        this._likeCount.textContent = this._data.likes.length
        this._setLike()
        if(this._userInfo().userId === this._ownerId) {
            delButton.removeAttribute('disabled')
            delButton.style.display = 'block';
            this._popupFactory(this._deletePopup, delButton, this._deleteCardApi.bind(this), this._userInfo)
        }
        return this._element
    }

}

export {Card}