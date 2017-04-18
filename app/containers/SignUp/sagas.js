import { takeEvery, call, put, select } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SIGNUP,
  USER_CREATED,
} from './constants';

// Individual exports for testing
export function* signUpUser() {
  yield takeEvery(SIGNUP, signUpUserAsync);
}

function* signUpUserAsync(action) {
  try {
    const user = yield call(createAccount(action.payload))
    yield put({type: USER_CREATED, payload: user})
  }
  catch (e) {
    console.error(e);
  }
}

function createAccount(params) {
  console.log('in the create account')
  return () => ( Axios.post('/signup', params) )
}

// All sagas to be loaded
export default [
  signUpUser,
];
