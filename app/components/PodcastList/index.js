  import React, { PropTypes } from 'react';
  import PodcastListItem from '../PodcastListItem';

  const PodcastList = ({ onSelectPodcast, podcastList }) => {
    const podcastItems = podcastList.map((podcast) => (
      <PodcastListItem
        key={podcast.trackId}
        thumbnail={podcast.artworkUrl60}
        trackName={podcast.trackName}
        artistName={podcast.artistName}
        feedUrl={podcast.feedUrl}
        trackId={podcast.trackId}
        onSelectPodcast={onSelectPodcast}
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
    onSelectPodcast: PropTypes.func,
  };

  export default PodcastList;
