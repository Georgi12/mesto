import Popup from "./Popup.js";

export default class PopupWithForm extends  Popup {
    constructor(popupSelector, apiMethod, userInfo) {
        super(popupSelector);
        this._apiMethod = apiMethod;
        this._userInfo = userInfo;
        this._form = this._popup.querySelector(".popup__form");
        this._callBack = this._submitCallBack.bind(this);
        this._name = this._popup.querySelector(".popup__name");
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    get_form() {
        return this._form
    }

    _getUpdateInputValues() {
        const formValues = this._userInfo();
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues
    }

    _submitCallBack(event) {
        this._apiMethod(event, this._getUpdateInputValues());
        this.close();
    }
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._callBack)
    }

    setCloseHandler(closeHandler) {
        this._closeHandler = closeHandler
    }

    setFormValue() {
        const data = this._userInfo()
        this._inputList.forEach(input => {
            input.value = data[input.name]
        })
    }

    close() {
        super.close();
        this._form.reset();
        this._closeHandler()
    }
}