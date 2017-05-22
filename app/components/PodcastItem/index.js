/**
 *
 * PodcastItem
 *
 */
import React, { PropTypes } from 'react';
import PodcastEpisodeItem from '../PodcastEpisodeItem';
// import styled from 'styled-components';


function PodcastItem({ showTitle, episodes, onSelectEpisode, nexcastPodcastId }) {
  const createEpisodeItem = (episode) => (
    <PodcastEpisodeItem
      key={episode.guid}
      guid={episode.guid}
      episodeTitle={episode.title}
      episodeFile={episode.enclosure.url}
      episodeFullContent={episode.content}
      episodeContentSnippet={episode.contentSnippet}
      onSelectEpisode={onSelectEpisode}
      nexcastPodcastId={nexcastPodcastId}
    />
  );

  const Episodes = episodes.reduce((memo, episode) => {
    if (episode.hasOwnProperty('enclosure')) {
      memo.push(createEpisodeItem(episode));
      return memo;
    }

    const episodes = episode;
    return memo.concat(() => (
      episodes.map((ep) => (
        createEpisodeItem(ep)
      ))
    ));
  }, []);

  return (
    <li>
      { showTitle }
      { Episodes }
    </li>
  );
}

PodcastItem.propTypes = {
  showTitle: PropTypes.string,
  episodes: PropTypes.array,
  onSelectEpisode: PropTypes.func,
  nexcastPodcastId: PropTypes.number,
};

export default PodcastItem;
