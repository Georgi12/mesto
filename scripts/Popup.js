
class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
    }

    open() {

    }

    close() {

    }

    _handleEscClose() {

    }

    setEventListeners() {

    }
}


class PopupWithImage extends Popup {
    constructor() {
        super();
    }

    open() {

    }
}


class PopupWithForm extends  Popup {
    constructor(callBackSubmit) {
        super();
        this._callBackSubmit = callBackSubmit
    }

    _getInputValues() {

    }
    setEventListeners() {
        super.setEventListeners()
    //    + обработчик субмита
    }
}