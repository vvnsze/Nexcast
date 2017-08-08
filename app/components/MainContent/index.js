/**
*
* MainContent
*
*/
import React from 'react';
import Cards from '../../containers/Cards';
import EpisodePlayer from '../../containers/EpisodePlayer';
// import styled from 'styled-components';

var sound = 'http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded';

function onProgress(e) {
    console.log('progress: ', e)
}

class MainContent extends React.Component {
  render() {
    return (
      <div>
        {/* <EpisodePlayer mediaUrl={sound} onProgress={onProgress} tags={[5, 10, 15, 30, 100, 157]} /> */}
        <Cards />
      </div>
    );
  }
}

MainContent.propTypes = {

};

export default MainContent;
