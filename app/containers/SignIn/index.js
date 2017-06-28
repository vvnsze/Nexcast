import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as actions from './actions';

const styles = {
  fieldset: {
    paddingRight: '60px',
    paddingLeft: '60px',
    borderStyle: 'hidden',
  },
  input: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    height: '2rem',
    'border-radius': '4px',
  },
  label: {
    'font-size': '13px',
  },
};

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
    if (this.props.currentUser !== undefined && this.props.currentUser.user !== null) {
      console.log('+++line 26 signin index: ', this.props.currentUser);
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
      <div className="container">
        <Paper
          zDepth={2}
          style={{ background: '#fafafa', fontWeight: 'bold' }}
        >
        <form style={{ textalign: 'center' }} onSubmit={this.handleFormSubmit}>
          <TextField
            value={this.state.email}
            errorText={this.state.emailError}
            floatingLabelText="Email Address"
            onChange={this.handleChangeEmail}
          />

          <br />

          <TextField
            value={this.state.password}
            floatingLabelText="Password"
            type="password"
            errorText={this.state.passwordError}
            onChange={this.handleChangePassword}
          />

          <br />

          <FlatButton style={{ background: '#02dd78' }} label="Sign In" onTouchTap={this.handleFormSubmit} />
          <div>{this.props.message}</div>
        </form>

      </Paper>
      </div>
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
