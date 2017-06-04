/**
 *
 * PodcastItem
 *
 */
import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PodcastEpisodeItem from '../PodcastEpisodeItem';

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
    if (episode.enclosure) {
      memo.push(createEpisodeItem(episode));
    }
    return memo;
  }, []);

  return (
    <ListItem
      primaryText={showTitle}
      nestedItems={Episodes}
      primaryTogglesNestedList
    />
  );
}

PodcastItem.propTypes = {
  showTitle: PropTypes.string,
  episodes: PropTypes.array,
  onSelectEpisode: PropTypes.func,
  nexcastPodcastId: PropTypes.number,
};

export default PodcastItem;
