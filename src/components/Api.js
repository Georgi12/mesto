export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this.headers = {
            authorization :options.token,
            "Content-Type": 'application/json'
        }
    }

    _queryHandler(res) {
        if(res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка:${res.status}  ${res.statusText} `)
        }
    }


    delCard(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}`, {
            headers: this.headers,
            method: 'DELETE',
        }).then(res => this._queryHandler(res))
    }


    setCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => this._queryHandler(res))
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this.headers,
        }).then(res => this._queryHandler(res))
    }

    setAvatarInfo(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(res => this._queryHandler(res))
    }


    setProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(res => this._queryHandler(res))
    }


    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this.headers,
        }).then(res => this._queryHandler(res))
    }

}