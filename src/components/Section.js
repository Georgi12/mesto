

export default class Section {
    constructor({api, renderer}, nodeSelector) {
        this._api = api;
        this._renderer = renderer;
        this._node = document.querySelector(nodeSelector);
    }

    renderElement() {
        this._api()
            .then(items => {
                return items.forEach(item => this._renderer(item));
            })
            .catch(err => {
                console.log(err)
            })
    }

    addItem(element) {
        this._node.prepend(element)
    }
}