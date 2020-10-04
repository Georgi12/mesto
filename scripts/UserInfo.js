
export default  class UserInfo {
    constructor({profileName, profileDescription}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent,
        }

    }
    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.description;
    }
}