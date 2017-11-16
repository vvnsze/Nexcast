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
    textAlign: 'left',
    paddingLeft: '70px',
    wordWrap: 'breakWord',
  },
  episodeTitle: {
    color: 'black',
    fontSize: '12px',
    textAlign: 'left',
    paddingLeft: '72px',
    wordWrap: 'breakWord',
  },
  podcastImage: {
    height: '70px',
    width: '70px',
    position: 'absolute',
  },
  informationDisplayWrapper: {
    width: '45%',
    height: 'auto',
    display: 'inline-block',
    position: 'absolute',
    float: 'left',
  },
  showInformation: {
    position: 'absolute',
    width: '45%',
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
        <div className="showInformation" style={styles.showInformation}>
          <img className="responsive-img" role="presentation" style={styles.podcastImage} src={this.props.selectedEpisode.podcastImage} />
          <p className="showTitle" style={styles.showTitle}>{this.props.selectedEpisode.showTitle}</p>
          <div className="episodeTitle truncate" style={styles.episodeTitle}>{this.props.selectedEpisode.episodeTitle}</div>
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      // <div className="informationDisplayWrapper" style={styles.informationDisplayWrapper}>
        this.showInformation()
      // </div>
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
