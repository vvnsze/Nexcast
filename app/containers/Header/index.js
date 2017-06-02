import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logUserOut = this.logUserOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { userName: 'Nexcast' };
    this.showNameOnMenu = this.showNameOnMenu.bind(this);
  }

  componentWillMount() {
    this.showNameOnMenu();
  }

  showNameOnMenu() {
    const userName = localStorage.getItem('userName');
    console.log('+++line 23 username on navbar:', userName);
    if (userName) {
      this.setState({ userName });
    }
  }

  logUserOut() {
    localStorage.clear();
    browserHistory.push('/signin');
  }

  handleChange(event, index, value) {
    if (value === 1) {
      this.logUserOut();
    }
  }

  showLinks = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');

    if (token) {
      return (
        <div>
          <DropDownMenu onChange={this.handleChange} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} value={this.state.userName}>
            <MenuItem value={1} key={1} primaryText="Sign Out" />
            <MenuItem value={2} key={2} primaryText="Account" />
            <MenuItem value={3} key={3} primaryText="About" />
          </DropDownMenu>
        </div>
      );
    }
    if (!token || !name) {
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
        <div className="nav-wrapper container">
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
