import {
  SEARCH_PODCAST_TERM,
  PODCAST_SEARCH_RESULTS,
  SELECTED_PODCAST,
  CREATING_PODCAST_RECORD,
  PODCAST_VERIFICATION_START,
  PODCAST_VERIFICATION_COMPLETE,
  SET_VERIFICATION_TO_NULL,
} from './constants';

const initialState = {
  loading: false,
  podcasts: [],
  selectedPodcast: null,
  message: '',
  verified: null,
};

function searchPodcastReducer(state = initialState, action) {
  let message;
  let verified;
  switch (action.type) {
    case SEARCH_PODCAST_TERM:
      return { ...state, loading: true, message: '' };

    case PODCAST_SEARCH_RESULTS:
      return { ...state, podcasts: action.podcasts.results, loading: false, message: '' };

    case SELECTED_PODCAST:
      console.log('++line 29: selectedPodcast', action.payload);
      return { ...state, loading: true, selectedPodcast: action.payload, message: '' };

    case CREATING_PODCAST_RECORD:
      return { ...state, loading: true, message: 'Looking up podcast.' };

    case PODCAST_VERIFICATION_START:
      return { ...state, loading: true, message: 'Verifying podcast.' };

    case PODCAST_VERIFICATION_COMPLETE:
      verified = action.payload.verified;
      message = 'Pending verification that you are the owner of this podcast.';
      if (verified) {
        message = 'Podcast ownership verified!';
      }
      return { ...state, loading: false, result: action.payload, message, verified };

    case SET_VERIFICATION_TO_NULL:
      return { ...state, verified: null };

    default:
      return state;
  }
}

export default searchPodcastReducer;
