  import React, { PropTypes } from 'react';
  import PodcastListItem from '../PodcastListItem';

  const PodcastList = ({ podcastList }) => {
    const podcastItems = podcastList.map((podcast) => (
      <PodcastListItem
        key={podcast.trackId}
        thumbnail={podcast.artworkUrl60}
        trackName={podcast.trackName}
        artistName={podcast.artistName}
      />
    ));

    return (
      <ul>
        {podcastItems}
      </ul>
    );
  };

  PodcastList.propTypes = {
    podcastList: PropTypes.array,
  };

  export default PodcastList;
