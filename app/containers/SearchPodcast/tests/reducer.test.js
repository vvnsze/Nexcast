
import { fromJS } from 'immutable';
import searchPodcastReducer from '../reducer';

describe('searchPodcastReducer', () => {
  it('returns the initial state', () => {
    expect(searchPodcastReducer(undefined, {})).toEqual(fromJS({}));
  });
});
