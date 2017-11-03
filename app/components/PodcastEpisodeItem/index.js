/**
*
* PodcastEpisodeItem
*
*/
import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import ToggleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';

const iconStyle = {
  height: '13px',
  width: '13px',
};

const leftIcon = (episode, guid) => {
  if (episode && episode.guid === guid) {
    return <ToggleRadioButtonChecked color="#ffffff" style={iconStyle} />;
  }
  return <ToggleRadioButtonUnchecked hoverColor="#0371d8" color="#ffffff" style={iconStyle} />;
};

const PodcastEpisodeItem = ({ showTitle, episodeFile, episodeTitle, episodeFullContent, guid, nexcastPodcastId, onSelectEpisode, podcastImage, selectedEpisode }) => (
  <div className="podcastEpisodeItem" style={{ overflow: 'scroll' }}>
    <ListItem
      initiallyOpen
      style={{ color: '#C5CCC7', fontFamily: 'Lato,sans-serif', fontSize: '16px' }}
      leftIcon={leftIcon(selectedEpisode, guid)}
      key={guid}
      primaryText={episodeTitle}
      onClick={() => { onSelectEpisode({ podcastImage, showTitle, episodeFullContent, nexcastPodcastId, episodeTitle, guid, episodeFile }); }}
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
  showTitle: PropTypes.string,
  podcastImage: PropTypes.string,
  selectedEpisode: PropTypes.object,
};

export default PodcastEpisodeItem;
