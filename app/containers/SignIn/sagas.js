import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SIGNIN,
  USER_SIGNED_IN,
} from './constants';
import { SET_CURRENT_USER } from '../Authorization/constants';
import { setUserToken, setUserName } from '../Authorization/helpers';

export function* signInUser() {
  yield takeEvery(SIGNIN, signInUserAsync);
}

function* signInUserAsync(action) {
  try {
    const user = yield call(signInAccount(action.payload));
    yield setUserToken(user);
    yield setUserName(user);
    console.log('user data: ', user.data);
    yield put({ type: SET_CURRENT_USER, user: user.data.user });
    yield put({ type: USER_SIGNED_IN, user: user.data.user });
  } catch (e) {
    console.error(e);
  }
}

function signInAccount(params) {
  return () => (Axios.post('/signin', params));
}

export default [
  signInUser,
];
