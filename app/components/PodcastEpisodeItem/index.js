/**
*
* PodcastEpisodeItem
*
*/

import React, { PropTypes } from 'react';

const PodcastEpisodeItem = ({ episodeTitle, episodeFile, episodeFullContent, episodeContentSnippet }) => {
  return (
    <div id={episodeTitle}>
      <div>
        {episodeTitle}
      </div>
    </div>
  );
};

PodcastEpisodeItem.propTypes = {
  episodeTitle: PropTypes.string,
  episodeFile: PropTypes.string,
  episodeFullContent: PropTypes.string,
  episodeContentSnippet: PropTypes.string,
};

export default PodcastEpisodeItem;
