/**
*
* EmailVerificationFailed
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import EmailVerificationPodcastItem from '../../containers/EmailVerificationPodcastItem';
// import styled from 'styled-components';


class EmailVerificationFailed extends React.Component {
  render() {
    return (
      <div className="container">
        <Paper>
          <div>EMAIL DOES NOT MATCH</div>
          <div>Your email does not match our records for the podcast you have chosen. Please sign up with your email associated with this show.</div>
          <div>If you have done this, we will manually confirm you are the owner of this podcast and send you an email when you are confirmed</div>
          <div>Send us pertinent info or questions here: <a href="admin@nexcast.co">admin@nexcast.co</a></div>

          <EmailVerificationPodcastItem />
        </Paper>
        <RaisedButton backgroundColor="#02dd78" onTouchTap={() => { browserHistory.push('/searchpodcast'); }} label="GOT IT" />
      </div>
    );
  }
}

EmailVerificationFailed.propTypes = {

};

export default EmailVerificationFailed;
