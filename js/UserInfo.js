class UserInfo {
  setUserInfo(name, about, avatar) {
    this.username = name;
    this.job = about;
    if (avatar) {
      this.avatar = avatar

    }
this.object = {
  name: this.username,
  about: this.job,
  avatar: this.avatar
}

  }


  updateUserInfo() {
    const userInfoPhoto = document.querySelector('.user-info__photo');
    document.getElementById('username').textContent = this.username;
    document.getElementById('job').textContent = this.job;
    userInfoPhoto.style.backgroundImage = `url(${this.avatar}`;

  }
  savedUserInfo() {

    return this.object
  }

}
