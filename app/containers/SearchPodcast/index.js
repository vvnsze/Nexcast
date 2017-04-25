/*
 *
 * SearchPodcast
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class SearchPodcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchPodcast: '' };
  }

  onInputChange(term) {
    this.setState({ term });
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
          value={this.state.term}
          onChange={(event) => this.onInputChange(event.target.value)}
        />
        <div>Search for your podcast and claim it to start tagging</div>
      </div>
    );
  }
}

SearchPodcast.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // searchPodcast: Proptypes.string,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(SearchPodcast);
