import Popup from "./Popup.js";

export default  class PopupWithImage extends Popup {
    open(event) {
        super.open()
        const  image = this._popup.querySelector(".popup__image")
        const title = event.target.closest('.element').querySelector('.element__caption').textContent
        const imageTitle = this._popup.querySelector(".popup__photo-title")
        image.src = event.target.src;
        image.alt = event.target.alt
        imageTitle.textContent = title
    }
}