/**
*
* PodcastItem
*
*/

import React, { PropTypes } from 'react';
import PodcastEpisodeItem from '../PodcastEpisodeItem';
// import styled from 'styled-components';


function PodcastItem({ showTitle, showDescription, episodes }) {
  const EpisodeItem = episodes.map((episode) => (
    <PodcastEpisodeItem
      key={episode.guid}
      episodeTitle={episode.title}
      episodeFile={episode.enclosure.url}
      episodeFullContent={episode.content}
      episodeContentSnippet={episode.contentSnippet}
    />
  ));
  return (
    <li>
      { showTitle }
      { EpisodeItem }
    </li>
  );
}

PodcastItem.propTypes = {
  showTitle: PropTypes.string,
  showDescription: PropTypes.string,
  episodes: PropTypes.array,
};

export default PodcastItem;
