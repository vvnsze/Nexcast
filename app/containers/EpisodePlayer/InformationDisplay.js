/*
 *
 * informationDisplay
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const styles = {
  showTitle: {
    color: 'black',
    fontSize: '17px',
  },
  episodeTitle: {
    color: 'black',
    fontSize: '12px',
  },
  podcastImage: {
    height: '70px',
    width: '70px',
  },
};

class InformationDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.showInformation = this.showInformation.bind(this);
  }

  showInformation() {
    if (this.props.selectedEpisode) {
      return (
        <div>
          <img role="presentation" style={styles.podcastImage} src={this.props.selectedEpisode.podcastImage} />
          <div style={styles.showTitle}>{this.props.selectedEpisode.showTitle}</div>
          <div style={styles.episodeTitle}>{this.props.selectedEpisode.episodeTitle}</div>
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div>
        {this.showInformation()}
      </div>
    );
  }
}

InformationDisplay.propTypes = {
  selectedEpisode: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedEpisode: state.cards.selectedEpisode,
  };
}

export default connect(mapStateToProps)(InformationDisplay);
