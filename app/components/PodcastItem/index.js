/**
 *
 * PodcastItem
 *
 */
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
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
    <div className="PodcastSearchResultItemWrapper">
      <ListItem
        style={{ color: '#ffffff', 'font-family': 'Lato,sans-serif' }}
        primaryText={showTitle}
        nestedItems={Episodes}
        primaryTogglesNestedList
        initiallyOpen
        nestedListStyle={{ height: '350px', overflow: 'scroll' }}
      />
    </div>
  );
}

PodcastItem.propTypes = {
  showTitle: PropTypes.string,
  episodes: PropTypes.array,
  onSelectEpisode: PropTypes.func,
  nexcastPodcastId: PropTypes.number,
};

export default PodcastItem;
