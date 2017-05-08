import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class Header extends React.Component {
  showLinks = () => {
    if (this.props.currentUser) {
      console.log('this is currentUser:', this.props.currentUser);
      return <div>{this.props.currentUser.name}</div>;
    }
    return <div>Not signed in</div>;
  }

  render() {
    return (
      <nav className="cyan darken-4" role="navigation">
        <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
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
