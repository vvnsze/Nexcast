/**
*
* PodcastEpisodeItem
*
*/

import React, { PropTypes } from 'react';

const PodcastEpisodeItem = ({ episodeTitle, episodeFullContent, episodeContentSnippet, onSelectEpisode, guid, nexcastPodcastId }) => {
  return (
    <div onClick={() => { onSelectEpisode({ episodeFullContent, nexcastPodcastId, episodeTitle, guid }); }}>
      <div>
        Episode: {episodeTitle}
      </div>
    </div>
  );
};

PodcastEpisodeItem.propTypes = {
  episodeTitle: PropTypes.string,
  episodeFullContent: PropTypes.string,
  episodeContentSnippet: PropTypes.string,
  onSelectEpisode: PropTypes.func,
  nexcastPodcastId: PropTypes.number,
  guid: PropTypes.string,
};

export default PodcastEpisodeItem;
