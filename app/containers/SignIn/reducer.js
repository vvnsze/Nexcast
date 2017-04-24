/*
 *
 * SignIn reducer
 *
 */
import {
  SIGNIN,
  USER_SIGNED_IN,
} from './constants';

const initialState = {};

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      // set loading to true
      return state;
    case USER_SIGNED_IN:
      // loading false
      // welcome message true
      // maybe a way to push new route from here.
      return state;
    default:
      return state;
  }
}

export default signInReducer;
