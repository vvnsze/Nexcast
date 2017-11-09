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
      <div className="row splitViewWrapper" style={{ margin: 0 }}>
        <div style={{ padding: 0, height: '100vh' }} className="col s3 blue-grey  darken-3">
          <SideMenu />
        </div>

        <div className="col s9">
          <MainContent />
        </div>
      </div>
    );
  }
}

export default SplitView;
