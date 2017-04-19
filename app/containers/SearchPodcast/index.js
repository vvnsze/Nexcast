/*
 *
 * SearchPodcast
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSearchPodcast from './selectors';

export class SearchPodcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchPodcast: ''};
  }

  onInputChange(term) {
   this.setState({term});
   this.props.onSearchTermChange(term);
 }

  // populatePodcasts(results){
  //   return <div>
  //
  //   </div>
  // }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search podcasts" name="searchPodcast" value={this.state.term}
        onChange={event => this.onInputChange(event.target.value)} />
        <div>Search for your podcast and claim it to start tagging</div>
      </div>
    );
  }
}

SearchPodcast.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // searchPodcast: Proptypes.string,
};

const mapStateToProps = createStructuredSelector({
  // SearchPodcast: makeSelectSearchPodcast(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPodcast);
