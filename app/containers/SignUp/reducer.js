/*
 *
 * SignUp reducer
 *
 */

import { Map, fromJS } from 'immutable';
import {
  SIGNUP,
  USER_CREATED,
} from './constants';

const initialState = fromJS({ authenticated: false });

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return state;
    case USER_CREATED:
      return state.merge(Map({
        authenticated: true,
        name: action.payload.data.user.name,
        email: action.payload.data.user.email,
      }));
    default:
      return state;
  }
}

export default signUpReducer;
