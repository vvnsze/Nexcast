import {
  SET_CURRENT_USER,
} from './constants';

const initialState = { authenticated: false };

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return ({ user: action.user, authenticated: true });
    default:
      return state;
  }
}

export default currentUserReducer;
