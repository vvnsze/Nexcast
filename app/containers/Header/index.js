/*
 *
 * Header
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import makeSelectHeader from './selectors';

export class Header extends React.Component {

  showLinks = () => {
    // console.log('CHEESE: ', this.props.currentUser);
    // if (this.props.currentUser) {
    //   return <div>{this.props.currentUser}</div>;
    // } else {
    //   return (<div>
    //     Not signed in
    //   </div>);
    // }
  }
  render() {
    return (
      <div>
        <div>Hello Woeful World </div>
        <div>{this.showLinks()}</div>
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
