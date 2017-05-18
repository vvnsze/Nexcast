export function setUserToken(_user) {
  if(_user.data) {
    localStorage.setItem('token', _user.data.token);
  }
}

export function setUserName(_user) {
  if(_user.data) {
    localStorage.setItem('userName', _user.data.user.name);
  }
}
