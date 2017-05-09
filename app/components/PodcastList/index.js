  import React, { PropTypes } from 'react';
  import PodcastListItem from '../PodcastListItem';

  const PodcastList = ({ onSelectPodcast, podcastList }) => {
    const podcastItems = podcastList.map((podcast) => (
      <PodcastListItem
        key={podcast.trackId}
        podcast={podcast}
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
