import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSignUp from './selectors';
import * as actions from './actions';

export class SignUp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.dispatch(actions.signUp({
      name: event.target.email.name,
      email: event.target.email.value,
      password: event.target.password.value,
    }));
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label htmlFor="Name">Name:</label>
          <input type="text" name="name" value={this.props.name} />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" value={this.props.email} />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input type="text" name="password" value={this.props.password} />
        </fieldset>

        <button action="submit">Sign up!</button>
      </form>
    );
  }
}


SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
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
