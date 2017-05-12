import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class SideMenu extends React.Component {

  render() {
    return (
      <div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(SideMenu);
