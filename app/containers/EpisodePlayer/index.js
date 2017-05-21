import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class EpisodePlayer extends React.Component {
  render() {
    return (
      <div>
        Hello EpisodePlayer World!
      </div>
    );
  }
}

EpisodePlayer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(EpisodePlayer);
