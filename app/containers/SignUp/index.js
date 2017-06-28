import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Paper from 'material-ui/Paper';

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
      <div className="container">
        <Paper
          zDepth={2}
          style={{ background: '#fafafa', fontWeight: 'bold' }}
        >
          <form
            onSubmit={this.handleFormSubmit}
            style={{ padding: '15px' }}
          >
            <legend
              style={{ textAlign: 'center' }}
            >CREATE AN ACCOUNT</legend>
            <fieldset
              style={styles.fieldset}
            >
              <label
                htmlFor="Name"
                style={styles.label}
              >Full Name:</label>
              <input
                type="text"
                name="name"
                value={this.props.name}
                style={styles.input}
              />
            </fieldset>
            <fieldset
              style={styles.fieldset}
            >
              <label
                htmlFor="email"
                style={styles.label}
              >Email (associated with your podcast or company)</label>
              <input
                type="text"
                name="email"
                value={this.props.email}
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
                type="password"
                name="password"
                value={this.props.password}
                style={styles.input}
              />
            </fieldset>
            <fieldset
              style={styles.fieldset}
            >
              <label
                htmlFor="confirmPassword"
                style={styles.label}
              >Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword" value={this.props.confirmPassword}
                style={styles.input}
              />
            </fieldset>
            <fieldset
              style={styles.fieldset}
            >
              <input type="checkbox" id="confirmTerms" value={this.props.confirmTerms} />
              <label htmlFor="confirmTerms"> By clicking Create Account you are agreeing our Terms of Service and Privacy Policy </label>
            </fieldset>
            <div>{this.displayPasswordError()}</div>
            <button
              action="submit"
              style={{ backgroundColor: '#02dd78', color: 'white', padding: '12px', display: 'inline-block' }}
            >Create Account</button>
          </form>
        </Paper>
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
