export function setUserToken(_user) {
  localStorage.setItem('token', _user.data.token);
}

export function setUserName(_user) {
  console.log('this is inside helper: ', _user);
  localStorage.setItem('userName', _user.data.user.name);
}
