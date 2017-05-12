import {
  DEFAULT_ACTION,
} from './constants';
import * as mockData from './mockdata';

const initialState = mockData;

function sideMenuReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default sideMenuReducer;
