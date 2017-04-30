import debounce from 'lodash/throttle';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import PodcastList from '../../components/PodcastList';

export class SearchPodcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchPodcast: '' };
    this.searchPodcastTerm = this.searchPodcastTerm.bind(this);
    this.showPodcastList = this.showPodcastList.bind(this);
  }

  onInputChange(term) {
    this.setState({ searchPodcast: term });
    debounce(() => { this.searchPodcastTerm(term); }, 2000)();
  }

  searchPodcastTerm(word) {
    this.props.dispatch(actions.searchTerm({
      term: word,
    }));
  }

  showPodcastList() {
    if (this.props.podcasts) {
      return (<div>
        <PodcastList podcastList={this.props.podcasts.podcasts.results} />
      </div>);
    }
    return (<div>Search for your podcast and claim it to start tagging</div>);
  }

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
        {this.showPodcastList()}
      </div>
    );
  }
}

SearchPodcast.propTypes = {
  dispatch: PropTypes.func.isRequired,
  podcasts: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    podcasts: state.podcasts.podcast,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPodcast);
