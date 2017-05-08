import {
  SIGNIN,
  USER_SIGNED_IN,
} from './constants';

const initialState = {};

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return state;
    case USER_SIGNED_IN:
      return state;
    default:
      return state;
  }
}

export default signInReducer;
