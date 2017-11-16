import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as actions from './actions';

const styles = {
  paper: {
    background: '#fafafa',
    fontWeight: 'bold',
    marginTop: '70px',
    marginBottom: '70px',
  },
  legend: {
    margin: '0 auto',
    fontSize: '17px',
  },
  fieldset: {
    paddingRight: '60px',
    paddingLeft: '60px',
    borderStyle: 'hidden',
  },
  input: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    height: '2rem',
    borderRadius: '4px',
    marginBottom: '2px',
    fontWeight: 'normal',
  },
  label: {
    fontSize: '15px',
  },
  button: {
    backgroundColor: '#02dd78',
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    display: 'inherit',
    margin: '0 auto',
  },
  form: {
    padding: '15px',
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

  handleFormSubmit(e) {
    e.preventDefault()
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
      <div className="row">
        <div className="col s4 offset-s4">
          <Paper
            zDepth={0}
            style={styles.paper}
          >
            <form
              style={styles.form}
              onSubmit={this.handleFormSubmit}
            >
              <legend
                style={styles.legend}
              >Log In</legend>
              <fieldset
                style={styles.fieldset}
              >
                <label
                  htmlFor="email"
                  style={styles.label}
                >Email:</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                  placeholder="email address"
                  style={styles.input}
                />
              </fieldset>
              <fieldset
                style={styles.fieldset}
              >
                <label
                  htmlFor="password"
                  style={styles.label}
                >Password:</label>
                <input
                  value={this.state.password}
                  name="password"
                  type="password"
                  onChange={this.handleChangePassword}
                  placeholder="password"
                  style={styles.input}
                />
              </fieldset>

              <button
                action="submit"
                style={styles.button}
              >Log in</button>
              <div>{this.props.message}</div>
            </form>
          </Paper>
        </div>
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
