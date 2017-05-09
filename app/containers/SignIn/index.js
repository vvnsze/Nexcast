import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.currentUser !== undefined) {
      browserHistory.push('/searchPodcast');
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.dispatch(actions.signIn({
      email: event.target.email.value,
      password: event.target.password.value,
    }));
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" value={this.props.email} />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={this.props.password} />
        </fieldset>

        <button action="submit">Sign In!</button>
      </form>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
