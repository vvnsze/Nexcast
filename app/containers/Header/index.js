/*
 *
 * Header
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import makeSelectHeader from './selectors';

export class Header extends React.Component {
  // function definition: if(this.props.currentUser)
  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <div>Hello Woeful World </div>

      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(Header);
