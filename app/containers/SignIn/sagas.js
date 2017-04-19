import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SIGNIN,
  USER_SIGNED_IN,
} from './constants';
import { setUserToken } from '../Authorization/helpers'

// Individual exports for testing
export function* signInUser() {
  yield takeEvery(SIGNIN, signInUserAsync);
}

function* signInUserAsync(action) {
  try {
    const user = yield call(signInAccount(action.payload));
    yield setUserToken(user)
    yield put({ type: USER_SIGNED_IN, payload: user });
  } catch (e) {
    console.error(e);
  }
}

function signInAccount(params) {
  console.log('in the signin account');
  return () => (Axios.post('/signin', params));
}

export default [
  signInUser,
];
