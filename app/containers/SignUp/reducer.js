/*
 *
 * SignUp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNUP,
  USER_CREATED,
} from './constants';

const initialState = fromJS({});

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      console.log(action.payload);
      return state;
    case USER_CREATED:
      console.log(action.payload)
      return state;
    default:
      return state;
  }
}

export default signUpReducer;
