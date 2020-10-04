import Popup from "./Popup.js";

export default class PopupWithForm extends  Popup {
    constructor(popupSelector, callBackSubmit) {
        super(popupSelector);
        this._callBackSubmit = callBackSubmit
        this._form = this._popup.querySelector(".popup__form")
    }

    _removeEventListeners() {
        super._removeEventListeners()

    }

    _getInputValues() {
        const name = this._popup.querySelector(".popup__name").value;
        const description = this._popup.querySelector(".popup__description").value;
        return {name, description}
    }
    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', (event) => {
            this._callBackSubmit(event, this._getInputValues())
            this.close()
        })
    }

    close() {
        this._form.reset()
        super.close();
    }
}