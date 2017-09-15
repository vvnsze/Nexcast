import React, { PropTypes } from 'react';
import PodcastItem from '../PodcastItem';

// import styled from 'styled-components';


const PodcastEpisodeList = ({ episodeList, onSelectEpisode, selectedEpisode }) => {
  const podcastEpisodeItems = episodeList.map((podcast) => (
    <ul key={podcast.title}>
      <PodcastItem
        key={podcast.title}
        showTitle={podcast.title}
        showDescription={podcast.description}
        episodes={podcast.entries}
        onSelectEpisode={onSelectEpisode}
        nexcastPodcastId={podcast.nexcastObjId}
        podcastImage={podcast.itunes.image}
        selectedEpisode={selectedEpisode}
      />
    </ul>
  ));

  return (
    <div>
      {podcastEpisodeItems}
    </div>
  );
};

PodcastEpisodeList.propTypes = {
  episodeList: PropTypes.array,
  onSelectEpisode: PropTypes.func,
  selectedEpisode: PropTypes.object,
};

export default PodcastEpisodeList;
