import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SIGNIN,
  USER_SIGNED_IN,
} from './constants';
import { SET_CURRENT_USER } from '../Authorization/constants'
import { setUserToken } from '../Authorization/helpers';

// Individual exports for testing
export function* signInUser() {
  yield takeEvery(SIGNIN, signInUserAsync);
}

function* signInUserAsync(action) {
  try {
    const user = yield call(signInAccount(action.payload));
    yield setUserToken(user);
    yield put({ type: SET_CURRENT_USER, user: user.data });
    yield put({ type: USER_SIGNED_IN, user: user.data });
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
