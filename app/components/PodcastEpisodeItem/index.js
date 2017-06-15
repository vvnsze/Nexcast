/**
*
* PodcastEpisodeItem
*
*/
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

const style = {
  height: '15px',
  width: '15px',
};

const PodcastEpisodeItem = ({ episodeFile, episodeTitle, episodeFullContent, guid, nexcastPodcastId, onSelectEpisode }) => (
  <ListItem
    style={{ color: '#ABADAD' }}
    leftIcon={<ToggleRadioButtonUnchecked style={style} />}
    key={guid}
    primaryText={episodeTitle}
    onClick={() => { onSelectEpisode({ episodeFullContent, nexcastPodcastId, episodeTitle, guid, episodeFile }); }}
    id={episodeTitle}
  />
);

PodcastEpisodeItem.propTypes = {
  episodeTitle: PropTypes.string,
  episodeFullContent: PropTypes.string,
  onSelectEpisode: PropTypes.func,
  nexcastPodcastId: PropTypes.number,
  guid: PropTypes.string,
  episodeFile: PropTypes.string,
};

export default PodcastEpisodeItem;
