import {
  SET_CURRENT_USER,
} from './constants';

import {
  USER_SIGNED_IN,
} from '../SignIn/constants';

import {
  LOG_USER_OUT,
} from '../Header/constants';

const initialState = { authenticated: false };

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return ({ user: action.user });
    case USER_SIGNED_IN:
      return ({ ...state,
        authenticated: true,
      });
    case LOG_USER_OUT:
      return ({ authenticated: false });
    default:
      return state;
  }
}

export default currentUserReducer;
