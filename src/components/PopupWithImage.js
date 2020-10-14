import Popup from "./Popup.js";

export default  class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image");
        this._imageTitle =  this._popup.querySelector(".popup__photo-title")
    }
    open(event) {
        super.open()
        const title = event.target.closest('.element').querySelector('.element__caption').textContent
        this._image.src = event.target.src;
        this._image.alt = event.target.alt
        this._imageTitle.textContent = title
    }
}