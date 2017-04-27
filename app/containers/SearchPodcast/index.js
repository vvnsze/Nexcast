import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

export class SearchPodcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchPodcast: '' };
    this.searchPodcastTerm = this.searchPodcastTerm.bind(this);
  }

  onInputChange(term) {
    this.setState({ searchPodcast: term });
    this.searchPodcastTerm(term);
  }

  searchPodcastTerm(word) {
    console.log('this is word', word);
    this.props.dispatch(actions.searchTerm({
      term: word,
    }));
  }
  // populatePodcasts(results){
  //   return <div>
  //
  //   </div>
  // }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search podcasts"
          name="searchPodcast"
          onChange={(event) => this.onInputChange(event.target.value)}
          value={this.state.term}
        />
        <div>Search for your podcast and claim it to start tagging</div>
      </div>
    );
  }
}

SearchPodcast.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // searchPodcast: PropTypes.string,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(SearchPodcast);
