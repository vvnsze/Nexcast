import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import * as actions from './actions';
import PodcastEpisodeList from '../../components/PodcastEpisodeList';
import Searchbar from './Searchbar';
import PodcastEpisodeItem from '../../components/PodcastEpisodeItem';

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideMenu: true,
    };
    this.loadPodcastEpisode = this.loadPodcastEpisode.bind(this);
    this.showPodcastEpisode = this.showPodcastEpisode.bind(this);
    this.selectPodcastEpisode = this.selectPodcastEpisode.bind(this);
    this.addShow = this.addShow.bind(this);
    this.displaySearchResult = this.displaySearchResult.bind(this);
    this.toggleMenuState = this.toggleMenuState.bind(this);
  }

  componentWillMount() {
    this.loadPodcastEpisode();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult) {
      console.log('+++line 26 this is searchResult!: ', nextProps.searchResult);
      this.displaySearchResult(nextProps.searchResult);
    }
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

  toggleMenuState() {
    this.setState({ showSideMenu: false });
  }

  displaySearchResult(episodes) {
    this.toggleMenuState();
    if (episodes.length === 1) {
      return (
        <div style={{ color: '#FFF', padding: 20 }}>
          <List style={{ color: '#ffffff', fontFamily: 'Lato,sans-serif' }}>
            <PodcastEpisodeItem
              episodeFile={episodes.link}
              episodeTitle={episodes.title}
              episodeFullContent={episodes.content}
              guid={episodes.guid}
            />
          </List>
        </div>
      );
    }
    return <div></div>
  }

  showPodcastEpisode() {
    if (!this.state.showSideMenu) {
      return <div></div>;
    }
    return (
      <div style={{ color: '#FFF', padding: 20 }}>
        <List style={{ color: '#ffffff', fontFamily: 'Lato,sans-serif' }}>
          <PodcastEpisodeList
            episodeList={this.props.podcastEpisodes}
            onSelectEpisode={this.selectPodcastEpisode}
            selectedEpisode={this.props.selectedEpisode}
          />
        </List>
      </div>
    );
  }

  render() {
    return (
      <div className="row" style={{ height: '100%', overflow: 'scroll' }}>
        <div
          className="col s9 blue-grey darken-4"
          style={{ color: '#FFF', padding: '10px 20px' }}
        >MY SHOWS
        </div>
        <div
          className="col s3 blue-grey darken-4"
          style={{ color: '#FFF', padding: '10px 10px' }}
        >
          <RaisedButton
            backgroundColor="#0371d8"
            onTouchTap={this.addShow}
            style={{ height: '22px', width: 'auto' }}
            labelColor="white"
          >ADD SHOW
          </RaisedButton>
        </div>
        {/* <div><Searchbar /> </div> */}
        {this.showPodcastEpisode()}
        {/* {this.displaySearchResult()} */}
      </div>
    );
  }
}

SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  podcastEpisodes: PropTypes.array,
  selectedEpisode: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    podcastEpisodes: state.sideMenu.episodes,
    selectedEpisode: state.cards.selectedEpisode,
    searchResult: state.sideMenu.sideMenuSearchResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
