import React, { PropTypes } from 'react';
import PodcastItem from '../PodcastItem';
// import styled from 'styled-components';


const PodcastEpisodeList = ({ episodeList, onSelectEpisode }) => {
  const podcastEpisodeItems = episodeList.map((podcast) => (
    <PodcastItem
      key={podcast.title}
      showTitle={podcast.title}
      showDescription={podcast.description}
      episodes={podcast.entries}
      onSelectEpisode={onSelectEpisode}
    />
  ));

  return (
    <ul>
      {podcastEpisodeItems}
    </ul>
  );
};

PodcastEpisodeList.propTypes = {
  episodeList: PropTypes.array,
  onSelectEpisode: PropTypes.func,
};

export default PodcastEpisodeList;
