import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import PodcastEpisodeList from '../../components/PodcastEpisodeList';

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.loadPodcastEpisode = this.loadPodcastEpisode.bind(this);
    this.showPodcastEpisode = this.showPodcastEpisode.bind(this);
    this.selectPodcastEpisode = this.selectPodcastEpisode.bind(this);
  }

  componentWillMount() {
    this.loadPodcastEpisode();
  }

  loadPodcastEpisode() {
    this.props.dispatch(actions.loadPodcast());
  }

  selectPodcastEpisode(episodeTrack) {
    // take track and query the episode
  }

  showPodcastEpisode() {
    if (this.props.podcastEpisodes) {
      console.log('+++line 23: this is the episodes passed down through props', this.props.podcastEpisodes);
      return (
        <div>
          <div>Fetching Episodes Successful!</div>
          <PodcastEpisodeList episodeList={this.props.podcastEpisodes} />
        </div>
      );
    }
    return <div> Fetching Episodes did not work </div>;
  }

  render() {
    return (
      <div>
        Hello Side Menu!
        {this.showPodcastEpisode()}
      </div>
    );
  }
}

SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  podcastEpisodes: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    podcastEpisodes: state.sideMenu.episodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
