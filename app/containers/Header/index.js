import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Header extends React.Component {
  showLinks = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token) {
      return (
        <div>
          <DropDownMenu anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <MenuItem primaryText="Sign Out" />
            <MenuItem primaryText="Account" />
            <MenuItem primaryText="Preferences" />
          </DropDownMenu>
        </div>
      );
    }
    if (!token || !name) {
      return (
        <ul>
          <li><Link to="/signup">Sign Up</Link></li> <li><Link to="/signin">Sign In</Link></li>
        </ul>
      );
    }
    return <div></div>;
  }

  render() {
    return (
      <nav className="cyan darken-4" role="navigation">
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
