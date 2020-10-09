import Popup from "./Popup.js";

export default class PopupWithForm extends  Popup {
    constructor(popupSelector, callBackSubmit, closeHandler) {
        super(popupSelector);
        this._callBackSubmit = callBackSubmit
        this._form = this._popup.querySelector(".popup__form")
        this._callBack = this._submitCallBack.bind(this)
        this._name = this._popup.querySelector(".popup__name")
        this._description = this._popup.querySelector(".popup__description")
        this._closeHandler = closeHandler
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this._form.removeEventListener('submit', this._callBack)
    }

    _getInputValues() {
        return {name: this._name.value, description: this._description.value}
    }

    _submitCallBack(event) {
        this._callBackSubmit(event, this._getInputValues());
        this.close();
    }
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._callBack)
    }

    setFormValue({profileName, profileDescription}) {
        this._name.value = profileName
        this._description.value = profileDescription
    }

    close() {

        super.close();
        this._form.reset();
        this._closeHandler(this._form);
    }
}