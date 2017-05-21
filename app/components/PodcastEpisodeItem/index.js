/**
*
* PodcastEpisodeItem
*
*/

import React, { PropTypes } from 'react';

const PodcastEpisodeItem = ({ episodeTitle, episodeFile, episodeFullContent, episodeContentSnippet, onSelectEpisode }) => {
  return (
    <div onClick={() => { onSelectEpisode({ episodeTitle, episodeFile }); }} id={episodeTitle}>
      <div>
        Episode: {episodeTitle}
      </div>
    </div>
  );
};

PodcastEpisodeItem.propTypes = {
  episodeTitle: PropTypes.string,
  episodeFile: PropTypes.string,
  episodeFullContent: PropTypes.string,
  episodeContentSnippet: PropTypes.string,
  onSelectEpisode: PropTypes.func,
};

export default PodcastEpisodeItem;
