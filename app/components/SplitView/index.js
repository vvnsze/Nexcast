/**
*
* SplitView
*
*/
import React from 'react';
import SideMenu from '../../containers/SideMenu';
import MainContent from '../MainContent';
// import styled from 'styled-components';


class SplitView extends React.Component {
  render() {
    return (
      <div>
        Hello World
        <SideMenu />
        <MainContent />
      </div>
    );
  }
}

SplitView.propTypes = {

};

export default SplitView;
