/**
 *
 * PodcastItem
 *
 */
import React, { PropTypes } from 'react';
import PodcastEpisodeItem from '../PodcastEpisodeItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

// import styled from 'styled-components';


function PodcastItem({ showTitle, showDescription, episodes, onSelectEpisode }) {

  const createEpisodeItem = (episode) => (
    <PodcastEpisodeItem
      key={episode.guid}
      episodeTitle={episode.title}
      episodeFile={episode.enclosure.url}
      episodeFullContent={episode.content}
      episodeContentSnippet={episode.contentSnippet}
      onSelectEpisode={onSelectEpisode}
    />
  );

  const Episodes = episodes.reduce((memo, episode) => {
    if(episode.hasOwnProperty('enclosure')) {
      memo.push(createEpisodeItem(episode));
    }
    return memo;
  }, []);

  return (
    <ListItem 
      primaryText={showTitle}
      nestedItems={Episodes}
      primaryTogglesNestedList={true}
    />
  );
}

PodcastItem.propTypes = {
  showTitle: PropTypes.string,
  showDescription: PropTypes.string,
  episodes: PropTypes.array,
  onSelectEpisode: PropTypes.func,
};

export default PodcastItem;
