import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import makeSelectHeader from './selectors';

export class Header extends React.Component {

  showLinks = () => {
    console.log('CHEESE', this.props.currentUser);
    console.log('BURGER', this.props.currentUserAuth);
    if (this.props.currentUser) {
      return <div>{this.props.currentUser.name}</div>;
    }
    return <div>Not signed in</div>;
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
  currentUser: PropTypes.object,
  currentUserAuth: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    currentUserAuth: state.currentUser.authenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
