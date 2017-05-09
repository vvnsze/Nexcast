import React, { PropTypes } from 'react';

const PodcastListItem = ({ onSelectPodcast, podcast }) => {
  const imageUrl = podcast.artworkUrl60;
  return (
    <li id={podcast.trackId}>
      <div onClick={() => { onSelectPodcast({ podcast }); }}> 
        <img role="presentation" src={imageUrl} />
        { podcast.trackName} by {podcast.artistName }
      </div>
    </li>
  );
};

PodcastListItem.propTypes = {
  onSelectPodcast: PropTypes.func,
};

export default PodcastListItem;
