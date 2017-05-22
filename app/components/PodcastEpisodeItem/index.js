/**
*
* PodcastEpisodeItem
*
*/
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

const PodcastEpisodeItem = ({ key, episodeTitle, episodeFullContent, guid, nexcastPodcastId, onSelectEpisode }) => (
  <ListItem
    key={key}
    primaryText={episodeTitle}
    onClick={() => { onSelectEpisode({ episodeFullContent, nexcastPodcastId, episodeTitle, guid }); }}
    id={episodeTitle}
  />
);

PodcastEpisodeItem.propTypes = {
  episodeTitle: PropTypes.string,
  episodeFullContent: PropTypes.string,
  onSelectEpisode: PropTypes.func,
  nexcastPodcastId: PropTypes.number,
  guid: PropTypes.string,
  key: PropTypes.string,
};

export default PodcastEpisodeItem;
