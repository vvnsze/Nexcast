/*
 *
 * EmailVerificationPodcastItem
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class EmailVerificationPodcastItem extends React.Component {

  showPodcast = () => {
    console.log('+++11 pendingpodcast', this.props.pendingPodcast);
    if (this.props.pendingPodcast) {
      console.log('+++line 13 emailverificationpodcastitem', this.props.pendingPodcast);
    }
  }

  render() {
    return (
      <div>
        ALOHA
        {this.showPodcast()}
      </div>
    );
  }
}

EmailVerificationPodcastItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pendingPodcast: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    pendingPodcast: state.podcasts.selectedPodcast,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationPodcastItem);
