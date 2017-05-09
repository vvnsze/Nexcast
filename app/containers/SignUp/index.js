import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

export class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.displayPasswordError = this.displayPasswordError.bind(this);
    this.state = { passwordError: null };
  }

  componentDidUpdate() {
    if (this.props.currentUser !== undefined) {
      browserHistory.push('/searchPodcast');
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (event.target.password.value === event.target.confirmPassword.value) {
      this.props.dispatch(actions.signUp({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }));
    } else {
      this.setState({ passwordError: 'true' });
    }
  }

  displayPasswordError() {
    if (this.state.passwordError) {
      return <div>Password Does Not Match, Please Try Again!</div>;
    }
    return <div></div>;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>CREATE AN ACCOUNT</div>
          <fieldset>
            <label htmlFor="Name">Full Name:</label>
            <input type="text" name="name" value={this.props.name} />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email (Associated with your podcast or company)</label>
            <input type="text" name="email" value={this.props.email} />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={this.props.password} />
          </fieldset>
          <fieldset>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" value={this.props.confirmPassword} />
          </fieldset>
          <fieldset>
            <input type="checkbox" id="confirmTerms" value={this.props.confirmTerms} />
            <label htmlFor="confirmTerms"> By clicking Create Account you are agreeing our Terms of Service and Privacy Policy </label>
          </fieldset>
          <div>{this.displayPasswordError()}</div>
          <button action="submit">Create Account</button>
        </form>
      </div>
    );
  }
}


SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  currentUser: PropTypes.object,
  confirmTerms: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
