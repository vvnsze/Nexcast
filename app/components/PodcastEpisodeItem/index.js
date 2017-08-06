/**
*
* PodcastEpisodeItem
*
*/
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

const iconStyle = {
  height: '13px',
  width: '13px',
  color: '#ffffff',
};

const PodcastEpisodeItem = ({ episodeFile, episodeTitle, episodeFullContent, guid, nexcastPodcastId, onSelectEpisode }) => (
  <div style={{ overflow: 'scroll' }}>
    <ListItem
      initiallyOpen
      style={{ color: '#ffffff', fontFamily: 'Lato,sans-serif', fontSize: '16px' }}
      leftIcon={<ToggleRadioButtonUnchecked color="#ffffff" style={iconStyle} />}
      key={guid}
      primaryText={episodeTitle}
      // onClick should trigger a filled radioButton
      onClick={() => { onSelectEpisode({ episodeFullContent, nexcastPodcastId, episodeTitle, guid, episodeFile }); }}
      id={episodeTitle}
    />
  </div>
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
