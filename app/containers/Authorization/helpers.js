export function setUserToken(_user) {
  localStorage.setItem('token', _user.data.token);
}
