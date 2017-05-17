/**
*
* SplitView
*
*/
import React from 'react';
import SideMenu from '../../containers/SideMenu';
// import styled from 'styled-components';


class SplitView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        Hello World
        <SideMenu />
      </div>
    );
  }
}

SplitView.propTypes = {

};

export default SplitView;
