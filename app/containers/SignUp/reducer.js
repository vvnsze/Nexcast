/*
 *
 * SignUp reducer
 *
 */
import {
  SIGNUP,
  USER_CREATED,
} from './constants';

const initialState = {};

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return state;
    case USER_CREATED:
      return { ...state,
        authenticated: true,
        name: action.user.name,
        email: action.user.email,
      };
    default:
      return state;
  }
}

export default signUpReducer;
