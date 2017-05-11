
import {
  SEARCH_PODCAST_TERM,
  PODCAST_SEARCH_RESULTS,
  SELECTED_PODCAST,
  CREATING_PODCAST_RECORD,
  PODCAST_VERIFICATION_START,
  PODCAST_VERIFICATION_COMPLETE,
} from './constants';

const initialState = {
  loading: false,
  podcasts: [],
  selectedPodcast: null,
  message: '',
  verified: false,
};

function searchPodcastReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PODCAST_TERM:
      return { ...state, loading: true, message: '' };

    case PODCAST_SEARCH_RESULTS:
      return { ...state, podcasts: action.podcasts.results, loading: false, message: '' };

    case SELECTED_PODCAST:
      return { ...state, loading: true, selectedPodcast: action.selectedPodcast, message: '' };

    case CREATING_PODCAST_RECORD:
      return { ...state, loading: true, message: 'Looking up podcast.' };

    case PODCAST_VERIFICATION_START:
      return { ...state, loading: true, message: 'Verifying podcast.' };

    case PODCAST_VERIFICATION_COMPLETE:
      const verified = action.payload.verified;
      let message = 'Pending verification that you are the owner of this podcast.';

      if (verified) {
        message = "Podcast ownership verified!";
      }
      return { ...state, loading: false, result: action.payload, message, verified };

    default:
      return state;
  }
}

export default searchPodcastReducer;
