/*
 *
 * EpisodePlayer
 *
 */
import React, { Component } from 'react';
import * as _ from 'lodash';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Howler } from 'howler';
// import 'rc-slider/assets/index.css';
import FontIcon from 'material-ui/FontIcon';
import { blue500 } from 'material-ui/styles/colors';
import * as actions from './actions';
import LoadingPlayer from '../../assets/loadingPlayer.gif';
// import Play from '../../assets/icon_play.png';
// import Pause from '../../assets/icon_pause.png';
// import SkipBack from '../../assets/material_ui_replay_ten.svg';
// import SkipForward from '../../assets/material_ui_forward_ten.svg';
const Play = '';
let playerInfo = {};
var sound = {};

const iconStyles = {
  fontSize: '35px',
  marginLeft: '15px',
  marginRight: '15px',
};

const statusMap = {
  unloaded: 0,
  loading: 1,
  loaded: 2,
  playing: 3,
  paused: 4,
  stopped: 5,
};

export function secondsToHMS(seconds = 0) {
  var start = 11;
  var length = 8;
  if (seconds < 3600) {
    start = 14;
    length = 5;
  }
  return new Date(seconds * 1000).toISOString().substr(start, length);
}

export function hmsToSeconds(time) {
  var seconds;
  if (time === null) {
    return 0;
  }
  const timeString = time.split(':');
  if (timeString.length === 3) {
    seconds = (+timeString[0]) * 3600 + (+timeString[1]) * 60 + (+timeString[2]);
  } else {
    seconds = ((+timeString[0]) * 60) + (+timeString[1]);
  }
  return seconds;
}

class EpisodePlayer extends Component {
  constructor() {
    super();
    this.intervalId = null;
    this.state = {
      playerStatus: 0,
      duration: 0,
      url: '',
      position: 0,
      tags: [],
    };
    this.onToggle = this.onToggle.bind(this);
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    // this.pause = this.pause.bind(this);
    // this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);
    this.moveSeek = this.moveSeek.bind(this);
    this.test = this.test.bind(this);
    this.showMediaPlayer = this.showMediaPlayer.bind(this);
    this.updateCardTimeStamp = this.updateCardTimeStamp.bind(this);
    this.inputSecondsIntoTags = this.inputSecondsIntoTags.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(sound)) {
      sound.unload();
    }
    this.start(nextProps);
  }

  onToggle(e) {
  }

  updateCardTimeStamp(seconds) {
    if (!seconds) {
      return;
    }
    var time = secondsToHMS(seconds);
    this.props.dispatch(actions.updateCardTime({ time }));
  }

  start(props) {
    const { mediaUrl } = props;
    if (this.state.url !== mediaUrl) {
      this.setState({
        playerStatus: 1,
        url: mediaUrl,
      });

      sound = new Howl({
        src: [mediaUrl],
        volume: 0.3,
        onload: () => {
          console.log('finished loading!');
          this.setState({
            playerStatus: statusMap.loaded,
          });
        },
        onloaderror: (err) => (console.log('onloaderror', err)),
        onplay: () => {
          this.setState({ playerStatus: statusMap.playing });
          this.play();
        },
        onpause: () => {
          clearInterval(this.intervalId);
          this.updateCardTimeStamp(this.state.position);
          this.setState({ playerStatus: statusMap.paused });
        },
        onend: function end() {
          this.setState({ playerStatus: statusMap.stopped });
        },
      });
    }
  }

  play() {
    this.intervalId = setInterval(() => {
      const position = sound.seek();
      this.setState({
        duration: sound.duration() || 0,
        position: position || 0,
      });
      this.props.onProgress(position);
    }, 1000);
  }

  goBack() {
    const { position } = this.state;
    this.seek(position - 10);
  }
  goForward() {
    const { position } = this.state;
    this.seek(position + 10);
  }

  seekToTime(percent) {
    const { mediaUrl, title, episodeTitle, duration } = this.props.player;
    const sec = (percent / 100) * duration;
    if (duration) this.props.actions.playerSeekTo(mediaUrl, sec);
  }

  stop() {

  }

  moveSeek(value) {
    this.setState({
      position: value,
    });
    this.updateCardTimeStamp(this.state.position);
  }

  seek(value) {
    sound.seek(value);
    this.moveSeek(value);
  }

  test() {

  }

  PlayPauseIcon = () => {
    if (this.state.playerStatus === 1) return <span>Loading Player</span>;
    return (
      <FontIcon
        className="material-icons"
        style={iconStyles} color={blue500}
        onClick={this.handlePausePlay}
      >{this.pausePlayIconType()}</FontIcon>
    );
  }

  pausePlayIconType = () => {
    if (this.state.playerStatus !== 3) return 'play_arrow';
    return 'pause';
  }

  handlePausePlay = () => {
    if (this.state.playerStatus !== 3) return sound.play();
    return sound.pause();
  }

  inputSecondsIntoTags(cards = []) {
    const tags = cards.map(function insertSeconds(card) {
      return card.seconds;
    });
    return tags;
  }

  showMediaPlayer(bar) {
    if (!this.props.mediaUrl) {
      return <div>Please select an episode to begin</div>;
    }
    if (this.state.playerStatus === 1) {
      // TODO Figure out why the loading gif does not work
      // return <div><LoadingPlayer /></div>;
      return <div>Loading Player </div>;
    }

    return (
      <div>
        <div style={{ width: '100%', height: 200, backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px', padding: '5px' }}>
            <FontIcon className="material-icons" style={iconStyles} color={blue500} onClick={this.goBack}>replay_10</FontIcon>
            { this.PlayPauseIcon() }
            <FontIcon className="material-icons" style={iconStyles} color={blue500} onClick={this.goForward}>forward_10</FontIcon>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 12px 0px 12px', padding: '5px 2%' }}>
            <span style={{ color: 'black' }}>{secondsToHMS(parseInt(this.state.position, 10))}</span>
            <span style={{ color: 'black' }}>{secondsToHMS(parseInt(this.state.duration, 10))}</span>
          </div>

          <div style={{ width: '96%', margin: '5px 2%', padding: '8px' }}>
            <Slider
              defaultValue={1}
              step={1}
              min={1}
              value={parseInt(this.state.position, 10)}
              max={parseInt(this.state.duration, 10) || 100}
              onChange={this.moveSeek}
              onAfterChange={this.seek}
              railStyle={{ backgroundColor: '#56a0e5', height: 10 }}
              trackStyle={{ backgroundColor: '#0371d8' || '#0371d8', height: 10, borderRadius: 0, paddingRight: -50 }}
              handleStyle={{
              //  borderColor: progressColor,
                borderWidth: 0,
                height: 28,
                width: 5,
                marginLeft: -2,
                marginTop: -9,
                backgroundColor: 'white',
                borderRadius: 0,
              }}
            />
            <div style={{ width: '100%', height: '0px', top: '-13px', position: 'relative' }}>
              {bar}
            </div>
          </div>

        </div>
      </div>
    );
  }

  render() {
    var tags = this.inputSecondsIntoTags(this.props.cards);
    // const { styleConfig: {progressColor, seekColor, playerColor, controlColor} } = this.props;
    //
    const tagBar = (
      (tags || []).map((sec, key) => {
        const percent = (sec / this.state.duration) * 100;
        return (
          <span key={key} style={{ display: 'inline-block', position: 'absolute', left: `${percent}%`, top: 0, width: '3px', height: '20px', backgroundColor: 'white' }}></span>
        );
      })
    );
    return (
      <div>
        {this.showMediaPlayer(tagBar)}
      </div>
    );
  }
}

EpisodePlayer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object,
  mediaUrl: PropTypes.string,
  onProgress: PropTypes.func,
  // styleConfig: PropTypes.objectOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.number),
  // onAction: PropTypes.func,
  // onComplete: PropTypes.func,
  cards: PropTypes.array,
};

EpisodePlayer.defaultProps = {
  player: {},
  mediaUrl: '',
  onProgress: {},
  // styleConfig: { progressColor: 'white', controlColor: '#56a0e5', seekColor: '#56a0e5', playerColor: '#0371d8' },
  tags: [],
  // onAction: {},
  // onComplete: {},
};

function mapStateToProps(state) {
  return {
    mediaUrl: state.episodePlayer.chosenEpisode,
    player: state.cards.selectedEpisode,
    cards: state.cards.allCards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePlayer);
