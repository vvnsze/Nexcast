/**
*
* MainContent
*
*/
import React from 'react';
import Cards from '../../containers/Cards';
import EpisodePlayer from '../../containers/EpisodePlayer';
import InformationDisplay from '../../containers/EpisodePlayer/InformationDisplay';
// import styled from 'styled-components';

function onProgress(e) {
  return e;
}

class MainContent extends React.Component {
  render() {
    return (
      <div>
        <InformationDisplay />
        <EpisodePlayer onProgress={onProgress} />
        <Cards />
      </div>
    );
  }
}

MainContent.propTypes = {

};

export default MainContent;
