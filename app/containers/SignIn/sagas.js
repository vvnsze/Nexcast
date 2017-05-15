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
    const response = yield call(signInAccount(action.payload));

    yield setUserToken(response);
    yield setUserName(response);   

    yield put({ type: SET_CURRENT_USER, user: response });
    yield put({ type: USER_SIGNED_IN, user: response.user, message: response.message });
  } catch (e) {
    console.error(e);
  }
}

function signInAccount(params) {
  return () => { 
    return new Promise((resolve, reject) => {
      Axios.post('/signin', params)
        .then((result) => {
          return resolve(result)
        })
        .catch((error) => {
          return resolve({
            user: null, 
            message: 'There was a problem logging in.',
            error,
          });
        });
    });
  };
}

export default [
  signInUser,
];
