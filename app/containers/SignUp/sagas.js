import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SIGNUP,
  USER_CREATED,
} from './constants';
import { setUserToken } from '../Authorization/helpers'

// Individual exports for testing
export function* signUpUser() {
  yield takeEvery(SIGNUP, signUpUserAsync);
}

function* signUpUserAsync(action) {
  try {
    const user = yield call(createAccount(action.payload));
    yield setUserToken(user)
    yield put({ type: USER_CREATED, payload: user });
  } catch (e) {
    console.error(e);
  }
}

function createAccount(params) {
  console.log('in the create account');
  return () => (Axios.post('/signup', params));
}

export default [
  signUpUser,
];
