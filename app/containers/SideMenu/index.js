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

  selectPodcastEpisode(episode) {
    this.props.dispatch(actions.fetchEpisode(episode));
  }

  showPodcastEpisode() {
    if (this.props.podcastEpisodes) {
      return (
        <div>
          <div>Fetching Episodes Successful!</div>
          <PodcastEpisodeList
            episodeList={this.props.podcastEpisodes}
            onSelectEpisode={this.selectPodcastEpisode}
          />
        </div>
      );
    }
    return <div> Fetching Episodes did not work </div>;
  }

  render() {
    return (
      <div>
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
