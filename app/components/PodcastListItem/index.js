import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';

const PodcastListItem = ({ onSelectPodcast, podcast }) => {
  const imageUrl = podcast.artworkUrl60;
  return (
    <li id={podcast.trackId}>
      <div onClick={() => { onSelectPodcast({ podcast }); }}>
        <div>
          <img role="presentation" src={imageUrl} />
        </div>
        <div>
          { podcast.trackName} {<br />} {podcast.artistName }
          <Divider
            // inset
            // style={{ float: 'right', background: '#ffffff' }}
          />
        </div>
      </div>
    </li>
  );
};

PodcastListItem.propTypes = {
  onSelectPodcast: PropTypes.func,
  podcast: PropTypes.object,
};

export default PodcastListItem;
