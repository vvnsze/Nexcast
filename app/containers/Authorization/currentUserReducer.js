import {
  SET_CURRENT_USER,
} from './constants';

const initialState = { user: { authenticated: false } };

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return ({ user: action.user.user, ...state });
    default:
      return state;
  }
}

export default currentUserReducer;
