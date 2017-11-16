/*
 *
 * EmailVerificationPodcastItem
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

export class EmailVerificationPodcastItem extends React.Component {

  showPodcast = () => {
    if (this.props.pendingPodcast) {
      const imageUrl = this.props.pendingPodcast.artworkUrl60;
      return (
        <Paper style={{ width: '300px', height: '200px', textalign: 'center' }}>
          <img className="responsive-img" role="presentation" src={imageUrl} />
          <div>{this.props.pendingPodcast.collectionName} by {this.props.pendingPodcast.artistName}</div>
        </Paper>
      );
    }
    return (
      <div>Select a Podcast</div>
    );
  }

  render() {
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        {this.showPodcast()}
      </div>
    );
  }
}

EmailVerificationPodcastItem.propTypes = {
  pendingPodcast: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    pendingPodcast: state.podcasts.selectedPodcast.podcast,
  };
}

export default connect(mapStateToProps)(EmailVerificationPodcastItem);
