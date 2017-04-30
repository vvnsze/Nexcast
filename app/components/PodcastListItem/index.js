import React, { PropTypes } from 'react';

const PodcastListItem = ({ thumbnail, trackName, artistName }) => {
  const imageUrl = thumbnail;
  return (
    <li> <img role="presentation" url={imageUrl} />{trackName} by {artistName}</li>
  );
};

PodcastListItem.propTypes = {
  // key: PropTypes.string,
  thumbnail: PropTypes.string,
  trackName: PropTypes.string,
  artistName: PropTypes.string,
};

export default PodcastListItem;
