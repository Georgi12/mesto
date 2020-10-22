

export default class Section {
    constructor({renderer}, nodeSelector) {
        this._renderer = renderer;
        this._node = document.querySelector(nodeSelector);
    }

    renderElement(initialCards) {
        initialCards.sort(function(a, b) {
            const dateA = new Date(a.createdAt)
            const dateB= new Date(b.createdAt)
            return dateA - dateB
        })
        initialCards.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._node.prepend(element)
    }
}