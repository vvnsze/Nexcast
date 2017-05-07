import React, { PropTypes } from 'react';

const PodcastListItem = ({ onSelectPodcast, trackId, thumbnail, trackName, artistName, feedUrl }) => {
  const imageUrl = thumbnail;
  return (
    <li>
      <div onClick={() => { onSelectPodcast({ trackId, feedUrl }); }}> <img role="presentation" src={imageUrl} />{trackName} by {artistName}</div>
    </li>
  );
};

PodcastListItem.propTypes = {
  trackId: PropTypes.number,
  thumbnail: PropTypes.string,
  trackName: PropTypes.string,
  artistName: PropTypes.string,
  feedUrl: PropTypes.string,
  onSelectPodcast: PropTypes.func,
};

export default PodcastListItem;
