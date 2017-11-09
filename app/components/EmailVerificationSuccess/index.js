/**
*
* EmailVerificationSuccess
*
*/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import EmailVerificationPodcastItem from '../../containers/EmailVerificationPodcastItem';
// import styled from 'styled-components';

const styles = {
  heading: {
    fontSize: '15px',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    paddingBottom: '10px',
    paddingTop: '5px',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '15px',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    paddingBottom: '10px',
    paddingTop: '5px',
  },
};

class EmailVerificationSuccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div style={styles.heading}>SUCCESS!</div>
        <div style={styles.message}>Your email matches our records for the podcast you have chosen</div>
        <EmailVerificationPodcastItem />
        <RaisedButton backgroundColor="#02dd78" onTouchTap={() => { browserHistory.push('/main'); }} label="START TAGGING" />
      </div>
    );
  }
}

EmailVerificationSuccess.propTypes = {

};

export default EmailVerificationSuccess;
