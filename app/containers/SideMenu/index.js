import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import * as actions from './actions';
import PodcastEpisodeList from '../../components/PodcastEpisodeList';

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.loadPodcastEpisode = this.loadPodcastEpisode.bind(this);
    this.showPodcastEpisode = this.showPodcastEpisode.bind(this);
    this.selectPodcastEpisode = this.selectPodcastEpisode.bind(this);
    this.addShow = this.addShow.bind(this);
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

  addShow() {
    browserHistory.push('/searchpodcast');
  }

  showPodcastEpisode() {
    return (
      <div style={{ color: '#FFF', padding: 20 }}>
        <List style={{ color: '#ffffff', 'font-family': 'Lato,sans-serif' }}>
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
      <div style={{ height: '100%', overflow: 'scroll' }}>
          <div
            className="blue-grey  darken-4"
            style={{ color: '#FFF', padding: '10px 20px' }}
          >MY SHOWS
          <RaisedButton backgroundColor="#02dd78" onTouchTap={this.addShow}>ADD SHOW</RaisedButton>
          </div>
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
