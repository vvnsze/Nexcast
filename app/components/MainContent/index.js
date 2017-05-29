/**
*
* MainContent
*
*/
import React from 'react';
import Cards from '../../containers/Cards';
import EpisodePlayer from '../../containers/EpisodePlayer';
// import styled from 'styled-components';

class MainContent extends React.Component {
  render() {
    return (
      <div>
        Hello Main Content World!
        <Cards />
        <EpisodePlayer />
      </div>
    );
  }
}

MainContent.propTypes = {

};

export default MainContent;
