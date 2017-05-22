import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
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
    return (
      <div>
        <List>
          <PodcastEpisodeList
            episodeList={this.props.podcastEpisodes}
            onSelectEpisode={this.selectPodcastEpisode}
          />
        </List>
      </div>
    );
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
