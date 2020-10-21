
export default  class UserInfo {
    constructor({profileName, profileDescription, avatar}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileDescription.textContent,
            avatar: this._profileAvatar.style.backgroundImage
        }

    }


    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    }
}