/**
*
* PodcastEpisodeItem
*
*/
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

const PodcastEpisodeItem = ({ episodeTitle, episodeFullContent, guid, nexcastPodcastId, onSelectEpisode }) => (
  <ListItem
    key={guid}
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
};

export default PodcastEpisodeItem;
