/**
*
* PodcastEpisodeItem
*
*/
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

const PodcastEpisodeItem = ({ key, episodeTitle, episodeFile, episodeFullContent, episodeContentSnippet, onSelectEpisode }) => {
  return (
    <ListItem
      key={key}
      primaryText={episodeTitle}
      onClick={() => { onSelectEpisode({ episodeTitle, episodeFile }); }}
      id={episodeTitle}
    />
  )
};

PodcastEpisodeItem.propTypes = {
  episodeTitle: PropTypes.string,
  episodeFile: PropTypes.string,
  episodeFullContent: PropTypes.string,
  episodeContentSnippet: PropTypes.string,
  onSelectEpisode: PropTypes.func,
};

export default PodcastEpisodeItem;
