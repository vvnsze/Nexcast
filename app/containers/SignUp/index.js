import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSignUp from './selectors';
import * as actions from './actions'

export class SignUp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
      super(props);

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.dispatch(actions.signUp({
      email: event.target.email.value,
      password: event.target.password.value
    }));
  }

  render() {

    return (
      <form onSubmit={ this.handleFormSubmit }>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type='text' name='email' className="form-control" value={ this.props.email } />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type='text' name='password' className="form-control" value={ this.props.password } type="password" />
        </fieldset>

        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}


SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signUp: makeSelectSignUp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
