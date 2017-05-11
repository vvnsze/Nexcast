
import { fromJS } from 'immutable';
import sideMenuReducer from '../reducer';

describe('sideMenuReducer', () => {
  it('returns the initial state', () => {
    expect(sideMenuReducer(undefined, {})).toEqual(fromJS({}));
  });
});
