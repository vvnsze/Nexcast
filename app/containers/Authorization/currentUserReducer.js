import { Map, fromJS } from 'immutable';
import {
  SET_CURRENT_USER,
} from './constants';

const initialState = fromJS({user: {authenticated: false}});

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('user', action.user );
    default:
      return state;
  }
}

export default currentUserReducer;
