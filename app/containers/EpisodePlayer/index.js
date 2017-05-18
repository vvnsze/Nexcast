/*
 *
 * EpisodePlayer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class EpisodePlayer extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title="EpisodePlayer"
          meta={[
            { name: 'description', content: 'Description of EpisodePlayer' },
          ]}
        />
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
