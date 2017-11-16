import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';

const styles = {
  podcastResultItemContainer: {
    display: 'flex',
  },
  podcastPicture: {
    flex: 1,
    margin: '5px',
  },
  podcastDescription: {
    flex: 4,
    margin: '5px',
    width: '80px',
  },
};

const PodcastListItem = ({ onSelectPodcast, podcast }) => {
  const imageUrl = podcast.artworkUrl60;
  return (
    <li id={podcast.trackId}>
      <div style={styles.podcastResultItemContainer} className="podcastResultItemContainer" onClick={() => { onSelectPodcast({ podcast }); }}>
        <div style={styles.podcastPicture}>
          <img className="responsive-img" role="presentation" src={imageUrl} />
        </div>
        <div style={styles.podcastDescription}>
          { podcast.trackName} by: {<br />} {podcast.artistName }
        </div>
      </div>
      <Divider
        inset
      />
    </li>
  );
};

PodcastListItem.propTypes = {
  onSelectPodcast: PropTypes.func,
  podcast: PropTypes.object,
};

export default PodcastListItem;
