
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._closeBtn = this._popup.querySelector('.popup__close')
    }

    open() {
        this._popup.classList.add("popup_display-on");
        this.setEventListeners()
    }

    close() {
        this._popup.classList.remove("popup_display-on")
        this._removeEventListeners()
    }

    _removeEventListeners() {
        this._closeBtn.removeEventListener('click', this.close.bind(this))
        this._popup.removeEventListener('click', this._overlayClose.bind(this))
        document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') this.close();

    }

    _overlayClose(event) {
        if (event.target !== event.currentTarget) return
        this.close()
    }
    setEventListeners() {
        this._closeBtn.addEventListener('click', this.close.bind(this))
        this._popup.addEventListener('click', this._overlayClose.bind(this))
        document.addEventListener('keydown', this._handleEscClose.bind(this))
    }
}