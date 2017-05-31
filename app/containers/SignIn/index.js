import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from './actions';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.currentUser !== undefined) {
      browserHistory.push('/main');
    }
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
      emailError: '',
    });
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      passwordError: '',
    });
  }

  handleFormSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    let errors = false;

    if (!email) {
      errors = true;

      this.setState({
        emailError: 'Email is required',
      });
    }

    if (!password) {
      errors = true;

      this.setState({
        passwordError: 'Password is required',
      });
    }

    if (!errors) {
      this.props.dispatch(actions.signIn({ email, password }));
    }
  }

  render() {
    return (
      <Paper zDepth={2} >
        <form onSubmit={this.handleFormSubmit}>
          <TextField
            hintText="Email Address"
            value={this.state.email}
            errorText={this.state.emailError}
            onChange={this.handleChangeEmail}
          />

          <br />

          <TextField
            hintText="Password"
            value={this.state.password}
            type="password"
            errorText={this.state.passwordError}
            onChange={this.handleChangePassword}
          />

          <br />

          <RaisedButton label="Sign In" onTouchTap={this.handleFormSubmit} />
          <div>{this.props.message}</div>
        </form>

      </Paper>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  message: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    currentUserAuth: state.currentUser.authenticated,
    message: state.signIn.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
