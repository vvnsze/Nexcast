/*
 *
 * EpisodePlayer
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';
import Slider from 'rc-slider';
import { Howler } from 'howler';
import 'rc-slider/assets/index.css';
import * as _ from 'lodash';

// import Play from '../../assets/icon_play.png';
// import Pause from '../../assets/icon_pause.png';
import SkipBack from '../../assets/material_ui_replay_ten.svg';
import SkipForward from '../../assets/material_ui_forward_ten.svg';

const Play = '';

let playerInfo = {};
var sound = {};

/*
PlayerStatus:
unloaded: 0,
loading: 1,
loaded: 2,
playing: 3,
paused: 4,
stopped: 5,
 */

export function secondsToHMS(seconds = 0) {
  var start = 11;
  var length = 8;
  if (seconds < 3600) {
    start = 14;
    length = 5;
  }
  return new Date(seconds * 1000).toISOString().substr(start, length);
}

class EpisodePlayer extends Component {
  constructor() {
    super();
    this.state = {
      playerStatus: 0,
      duration: 0,
      url: '',
      position: 0,
      intervalId: 0,
      setCardTimeStamp: 0,
    };
    this.onToggle = this.onToggle.bind(this);
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);
    this.moveSeek = this.moveSeek.bind(this);
    this.test = this.test.bind(this);
    this.showMediaPlayer = this.showMediaPlayer.bind(this);
    this.updateCardTimeStamp = this.updateCardTimeStamp.bind(this);
  }

  componentWillMount() {
    // const { mediaUrl, styleConfig: { progressColor, seekColor, playerColor, controlColor } } = this.props;
    // this.start(this.props);
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
    console.log('+++line 90 seconds in updateCardTimeStamp: ', seconds);
    if (!seconds) {
      return;
    }
    var time = secondsToHMS(seconds);
    console.log('+++line 95 this is time: ', typeof (time), ' :', time);
    this.props.dispatch(actions.updateCardTime({ time }));
  }

  start(props) {
    const { mediaUrl } = props;
    if (playerInfo.mediaUrl !== mediaUrl) {
      playerInfo.mediaUrl = mediaUrl;
      this.state.url = mediaUrl;
      sound = new Howl({
        src: [mediaUrl],
        volume: 0.1,
        onend: function end() {
        },
      });
      this.play();
    }
  }

  play() {
    const { mediaUrl } = this.props.player;

    sound.play();
    playerInfo.intervalId = this.state.intervalId = setInterval(() => {
      playerInfo.position = sound.seek();
      this.state.position = sound.seek();

      let status = sound.state();
      let position = 0;
      let duration = 0;
      switch (status) {
        case 'loading':
          this.setState({
            playerStatus: 1,
            duration: 0,
            position: 0,
          });
          break;
        case 'loaded':
          this.setState({
            playerStatus: 3,
            duration: sound.duration(),
            position: sound.seek(),
          });
          break;
        default:
          break;
      }

      this.props.onProgress(sound.seek());
    }, 1000);
  }

  pause() {
    const { mediaUrl } = this.props.player;
    clearInterval(this.state.intervalId);
    sound.pause();
    this.setState({
      playerStatus: 2,
      // setCardTimeStamp: sound.seek(),
    });
    this.updateCardTimeStamp(playerInfo.position);
    // this.props.actions.playerPause(mediaUrl);
  }

  resume() {
    const { mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress } = this.props.player;
    // this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }
  goBack() {
    const { position } = this.state;
    this.seek(position - 15);
  }
  goForward() {
    const { position } = this.state;
    this.seek(position + 15);
  }

  seekToTime(percent) {
    const { mediaUrl, title, episodeTitle, duration } = this.props.player;
    // seekToTime
    const sec = (percent / 100) * duration;
    if (duration) this.props.actions.playerSeekTo(mediaUrl, sec);
  }

  stop() {
  }
  moveSeek(value) {
    this.setState({
      position: value,
    });
  }

  seek(value) {
    sound.seek(value);
    this.moveSeek(value);
  }

  test() {

  }

  showMediaPlayer(bar) {
    if(!this.props.mediaUrl) {
      return <div>Please select an episode to begin</div>
    }
    return (
        <div>

          <div style={{ width: '100%', height: 200, backgroundColor: 'white' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px', padding: '5px' }}>
              <span style={{ color: '#fff', fontSize: '1.8em' }}>{this.props.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px', padding: '5px' }}>
              <span style={{ color: '#fff', fontSize: '1em' }}>{this.props.subTitle}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px', padding: '5px' }}>

              <img src={SkipBack} onClick={this.goBack} style={{ width: '50px', padding: '1%', color: '#0371d8' }} />
              {((playerStatus, play, pause) => {
                if (playerStatus === 3) {
                  return (
                    <img src={(require('../../assets/material_ui_pause.png'))} onClick={pause} style={{ height: '42px', width: 'auto', color: '#0371d8' }}/>
                  );
                } else {
                  return (
                    <img src={(require('../../assets/material_ui_play.png'))} onClick={play} style={{ height: '42px', width: 'auto', color: '#0371d8' }}/>
                  );
                }
              })(this.state.playerStatus, this.play, this.pause)}
              <img src={SkipForward} onClick={this.goForward} style={{ height: '42px', padding: '1%' }} />

            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 12px 0px 12px', padding: '5px 2%' }}>
              <span style={{ color: 'black' }}>{secondsToHMS(parseInt(this.state.position))}</span>
              <span style={{ color: 'black' }}>{secondsToHMS(parseInt(this.state.duration))}</span>
            </div>


            <div style={{ width: '96%', margin: '5px 2%', padding: '8px' }}>
              <Slider
                defaultValue={1}
                step={1}
                min={1}
                value={parseInt(this.state.position)}
                max={parseInt(this.state.duration) || 100}
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
    // const {tags} = this.props.tags;
    // const { styleConfig: {progressColor, seekColor, playerColor, controlColor} } = this.props;
    //
    const tagBar = (
      (this.props.tags || []).map((sec, key) => {
        const percent = (sec / this.state.duration) * 100;
        return (
          <span key={key} style={{ display: 'inline-block', position: 'absolute', left: `${percent}%`, top: 0, width: '3px', height: '20px', backgroundColor: 'grey' }}></span>
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
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onProgress: PropTypes.func,
  // styleConfig: PropTypes.objectOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.number),
  // onAction: PropTypes.func,
  // onComplete: PropTypes.func,
};

EpisodePlayer.defaultProps = {
  player: {},
  mediaUrl: '',
  title: '',
  subTitle: '',
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePlayer);
