import debounce from 'lodash/throttle';
import { browserHistory } from 'react-router';
import ActionSearch from 'material-ui/svg-icons/action/search';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import * as actions from './actions';
import PodcastList from '../../components/PodcastList';

export class SearchPodcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchPodcast: '' };
    this.searchPodcastTerm = this.searchPodcastTerm.bind(this);
    this.showPodcastList = this.showPodcastList.bind(this);
    this.selectPodcast = this.selectPodcast.bind(this);
    this.showEmailVerificationResults = this.showEmailVerificationResults.bind(this);
  }

  onInputChange(term) {
    this.setState({ searchPodcast: term });
    debounce(() => { this.searchPodcastTerm(term); }, 6000)();
  }

  showEmailVerificationResults() {
    if (this.props.verified === null) {
      return;
    }
    if (this.props.verified === false) {
      browserHistory.push('/podcastverificationfailed');
    }
    if (this.props.verified) {
      browserHistory.push('/podcastverificationsuccess');
    }
  }

  searchPodcastTerm(word) {
    this.props.dispatch(actions.searchTerm({
      term: word,
    }));
  }

  selectPodcast(selectedPodcast) {
    console.log('+++line 44 searchpodcast: ', selectedPodcast);
    
    this.props.dispatch(actions.confirmPodcast(selectedPodcast));
  }

  showPodcastList() {
    if (this.props.podcasts) {
      if (this.props.podcasts.length === 0) {
        return (<div>No results, please try again</div>);
      }

      return (<div>
        <PodcastList onSelectPodcast={this.selectPodcast} podcastList={this.props.podcasts} />
      </div>);
    }
    return (<div>Search for your podcast and claim it to start tagging</div>);
  }

  render() {
    return (
      <div className="container">
        <Paper
          style={{ textAlign: 'center' }}
        >
          <ActionSearch />
          <input
            type="text"
            placeholder="Search podcasts"
            name="searchPodcast"
            onChange={(event) => this.onInputChange(event.target.value)}
            value={this.state.term}
          />
          <div>{this.props.message}</div>
          {this.showPodcastList()}
        </Paper>
        {this.showEmailVerificationResults()}
      </div>
    );
  }
}

SearchPodcast.propTypes = {
  dispatch: PropTypes.func.isRequired,
  podcasts: PropTypes.array,
  message: PropTypes.string,
  verified: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    podcasts: state.podcasts.podcasts,
    message: state.podcasts.message,
    verified: state.podcasts.verified,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPodcast);
