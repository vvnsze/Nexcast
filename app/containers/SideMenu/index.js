import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import * as actions from './actions';
import PodcastEpisodeList from '../../components/PodcastEpisodeList';
import Searchbar from './Searchbar';
import PodcastEpisodeItem from '../../components/PodcastEpisodeItem';

const styles = {
  addShowButtonWrapper: {
    height: '42px',
    paddingBottom: '5px',
    paddingTop: '5px',
  },
  addShowButton: {
    height: '100%',
    width: 'auto',
    borderRadius: '10px',
    color: '#ffffff',
    marginLeft: '10px',
  },
  podcastEpisodesWrapper: {
    color: '#FFF',
    paddingTop: '55px',
    paddingLeft: '12px',
  },
  sideMenu: {
    height: '100%',
    overflow: 'scroll',
  },
  myShowsBar: {
    color: '#FFF',
    padding: '10px 20px',
  },
};

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
    // this.displaySearchResult = this.displaySearchResult.bind(this);
    this.toggleMenuState = this.toggleMenuState.bind(this);
  }

  componentWillMount() {
    this.loadPodcastEpisode();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.searchResult) {
  //     this.displaySearchResult(nextProps.searchResult);
  //   }
  // }

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

  // displaySearchResult(episodes) {
  //   this.toggleMenuState();
  //   if (episodes.length === 1) {
  //     return (
  //       <div className="searchResultWrapper" style={{ color: '#FFF', padding: 20 }}>
  //         <List style={{ color: '#ffffff', fontFamily: 'Lato,sans-serif' }}>
  //           <PodcastEpisodeItem
  //             episodeFile={episodes.link}
  //             episodeTitle={episodes.title}
  //             episodeFullContent={episodes.content}
  //             guid={episodes.guid}
  //           />
  //         </List>
  //       </div>
  //     );
  //   }
  //   return <div></div>;
  // }

  showPodcastEpisode() {
    if (!this.state.showSideMenu) {
      return <div></div>;
    }
    return (
      <div className="podcastEpisodesWrapper" style={styles.podcastEpisodesWrapper}>
        <List style={{ color: '#C5CCC7', fontFamily: 'Lato,sans-serif' }}>
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
      <div className="row sideMenu" style={styles.sideMenu}>
        <div
          className="col s9 blue-grey darken-4 myShowsBar"
          style={styles.myShowsBar}
        >MY SHOWS
        </div>
        <div
          className="col s3 blue-grey darken-4 addShowButtonWrapper"
          style={styles.addShowButtonWrapper}
        >
          <RaisedButton
            backgroundColor="#0371d8"
            onTouchTap={this.addShow}
            style={styles.addShowButton}
            labelColor="#ffffff"
          >ADD SHOW
          </RaisedButton>
        </div>
        {this.showPodcastEpisode()}
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
