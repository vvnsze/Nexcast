import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { AudioPlayer } from 'react-audio-player-tags';

export class EpisodePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.loadEpisodePlayer = this.loadEpisodePlayer.bind(this);
  }

  loadEpisodePlayer() {
    if (this.props.chosenEpisode) {
      console.log('+++line 13 episode player received chosen episode!: ', this.props.chosenEpisode);
      return (
        <div>
          Hello Audio Player
          {/* <AudioPlayer mediaUrl={this.state.chosenEpisode} /> */}
        </div>
      );
    }
    return (
      <div> Please select an episode </div>
    );
  }

  render() {
    return (
      this.loadEpisodePlayer()
    );
  }
}

EpisodePlayer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chosenEpisode: PropTypes.string,
};

function mapStateToProps(state) {
  console.log('+++line 39 episodeplayer state: ' ,state);
  return {
    chosenEpisode: state.episodePlayer.chosenEpisode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePlayer);
