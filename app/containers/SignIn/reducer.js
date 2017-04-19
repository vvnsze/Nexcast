/*
 *
 * SignIn reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNIN,
  USER_SIGNED_IN,
} from './constants';

const initialState = fromJS({});

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      console.log('+++line 18 signinReducer: ', action.payload);
      return state;
    case USER_SIGNED_IN:
      console.log('+++line 21 signinReducer: ', action.payload);
      return state;
    default:
      return state;
  }
}

export default signInReducer;
