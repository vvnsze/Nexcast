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


class EmailVerificationSuccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Paper>
          <div>SUCCESS!</div>
          <div>Your email matches our records for the podcast you have chosen</div>
          <EmailVerificationPodcastItem />
          <RaisedButton backgroundColor="#02dd78" onTouchTap={() => { browserHistory.push('/main'); }} label="START TAGGING" />
        </Paper>
      </div>
    );
  }
}

EmailVerificationSuccess.propTypes = {

};

export default EmailVerificationSuccess;
