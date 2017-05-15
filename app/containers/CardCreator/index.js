import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class CardCreator extends React.Component {

  render() {
    <Paper>
      <ReactUpload
        className="uploader"
        signingUrl="/s3/sign"
        signingUrlMethod="GET"
        accept="image/*"
        onProgress={console.log}
        onError={console.log}
        onFinish={console.log}
        uploadRequestHeaders={{
          'x-amz-acl': 'public-read'
        }}
        signingUrlWithCredentials={ true } 
        contentDisposition="auto"
      />
    </Paper>
  }

}