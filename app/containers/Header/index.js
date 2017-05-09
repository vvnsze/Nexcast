import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class Header extends React.Component {
  showLinks = () => {
    if (this.props.currentUser) {
      return <div>{this.props.currentUser.name}</div>;
    }
    return (
      <ul>
        <li><Link to="/signup">Sign Up</Link></li> <li><Link to="/signin">Sign In</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="blue-grey  darken-3" role="navigation">
        <div className="nav-wrapper container"><a id="logo-container" href="/signin" className="brand-logo">Logo</a>
          <ul className="right hide-on-med-and-down">
            <li>{this.showLinks()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
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
