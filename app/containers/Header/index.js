import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as actions from './actions';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  dropDownMenu: {
    color: '#E0E0E0',
    backgroundColor: '#37474f',
    font: 'Lato, sans-serif',
  },
  menuItemStyle: {
    color: '#E0E0E0',
    font: 'Lato, sans-serif',
  },
  labelStyle: {
    color: '#E0E0E0',
    font: 'Lato, sans-serif',
  },
  navWrapper: {
    width: '100%',
  },
  logo: {
    marginLeft: '17px',
  },
};

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logUserOut = this.logUserOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { userName: 'Nexcast', value: 2 };
    this.routeToPage = this.routeToPage.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('userName')) {
      const name = localStorage.getItem('userName');
      this.setState({ userName: name });
    }
  }

  routeToPage() {
    if (localStorage.getItem('token')) {
      return '/main';
    }
    return '/signin';
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
    const token = localStorage.getItem('token');

    if (token) {
      return (
        <div>
          <DropDownMenu
            onChange={this.handleChange}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} value={this.state.value}
            menuStyle={styles.dropDownMenu}
            menuItemStyle={styles.menuItemStyle}
            labelStyle={styles.labelStyle}
            className="dropDownMenu"
          >
            <MenuItem value={1} key={1} primaryText="Sign Out" />
            <MenuItem value={2} key={2} primaryText={this.state.userName} />
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
        <div className="nav-wrapper" style={styles.navWrapper}>
          <a id="logo-container" href={this.routeToPage()} className="brand-logo">
            <img className="responsive-img" src={require('../../assets/nexcast_logo_white.png')} width={150} style={styles.logo} />
          </a>
          <ul className="right hide-on-med-and-down dropDownList">
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
