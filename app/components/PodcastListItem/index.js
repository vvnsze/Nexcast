import React, { PropTypes } from 'react';

const PodcastListItem = ({ onSelectPodcast, trackId, thumbnail, trackName, artistName, feedUrl }) => {
  const imageUrl = thumbnail;
  return (
    <li onClick={() => { onSelectPodcast(trackId); }}> <img role="presentation" src={imageUrl} />{trackName} by {artistName}</li>
  );
};

PodcastListItem.propTypes = {
  trackId: PropTypes.number,
  thumbnail: PropTypes.string,
  trackName: PropTypes.string,
  artistName: PropTypes.string,
};

export default PodcastListItem;
