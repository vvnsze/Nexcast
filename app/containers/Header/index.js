import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as actions from './actions';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logUserOut = this.logUserOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { userName: 'Nexcast', value: 2 };
    this.showNameOnMenu = this.showNameOnMenu.bind(this);
  }

  showNameOnMenu() {
    if (this.props.currentUser.authenticated) {
      console.log('this.props.currentUser', this.props.currentUser);
      if (this.props.currentUser.user) {
        return this.props.currentUser.user.data.user.name;
      }
    }
    return this.state.userName;
  }

  logUserOut() {
    localStorage.clear();
    this.props.dispatch(actions.logOutUser());
    browserHistory.push('/signin');
  }

  handleChange(event, index, value) {
    this.setState({ value });
    if (value === 1) {
      this.logUserOut();
    }
  }

  showLinks = () => {
    const name = this.showNameOnMenu();
    const token = localStorage.getItem('token');

    if (token) {
      return (
        <div>
          <DropDownMenu onChange={this.handleChange} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} value={this.state.value}>
            <MenuItem value={1} key={1} primaryText="Sign Out" />
            <MenuItem value={2} key={2} label={name} primaryText="Account" />
            <MenuItem value={3} key={3} primaryText="About" />
          </DropDownMenu>
        </div>
      );
    }
    if (!token || name === 'Nexcast') {
      return (
        <ul>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
        </ul>
      );
    }
    return <div></div>;
  }

  render() {
    return (
      <nav className="blue-grey  darken-3" role="navigation">
        <div className="nav-wrapper container" style={{ width: '90%' }}>
          <a id="logo-container" href="/" className="brand-logo">
            <img src={require('../../assets/nexcast_logo_white.png')} width={150} />
          </a>
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
    currentUser: state.currentUser,
    currentUserAuth: state.currentUser.authenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
