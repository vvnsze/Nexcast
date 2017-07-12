/**
*
* EmailVerificationFailed
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import EmailVerificationPodcastItem from '../../containers/EmailVerificationPodcastItem';
// import styled from 'styled-components';

const styles = {
  outerWrapper: {
    paddingTop: '92px',
  },
  wrapper: {
    height: '500px',
    width: '600px',
  },
  messageTitle: {
    fontSize: '20px',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    paddingBottom: '50px',
  },
  message: {
    fontSize: '15px',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    paddingBottom: '10px',
    paddingTop: '5px',
  },
  button: {
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    display: 'inherit',
    margin: '0 auto',
    boxShadow: 'none',
  },
};

class EmailVerificationFailed extends React.Component {
  render() {
    return (
      <div className="row" style={styles.outerWrapper}>
        <div className="col s4 offset-s4" style={styles.wrapper}>
          <div style={styles.message}>EMAIL DOES NOT MATCH</div>
          <div style={styles.message}>Your email does not match our records for the podcast you have chosen. Please sign up with your email associated with this show.</div>
          <div style={styles.message}>If you have done this, we will manually confirm you are the owner of this podcast and send you an email when you are confirmed</div>
          <div style={styles.message}>Send us pertinent info or questions here: <a href="admin@nexcast.co">admin@nexcast.co</a></div>
          <EmailVerificationPodcastItem />
          <RaisedButton buttonStyle={styles.button} backgroundColor="#02dd78" onTouchTap={() => { browserHistory.push('/searchpodcast'); }} label="GOT IT" />
        </div>
      </div>
    );
  }
}

EmailVerificationFailed.propTypes = {

};

export default EmailVerificationFailed;
