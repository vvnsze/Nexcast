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
      <div className="row">
        <div className="col s3">
          <SideMenu />
        </div>

        <div className="col s9">
          <MainContent />
        </div>
      </div>
    );
  }
}

SplitView.propTypes = {

};

export default SplitView;
