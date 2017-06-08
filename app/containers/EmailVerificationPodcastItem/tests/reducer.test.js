
import { fromJS } from 'immutable';
import emailVerificationPodcastItemReducer from '../reducer';

describe('emailVerificationPodcastItemReducer', () => {
  it('returns the initial state', () => {
    expect(emailVerificationPodcastItemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
