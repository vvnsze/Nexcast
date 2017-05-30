import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class CardCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log('+++line 17 cardCreator form successfully submitted: ', event.target);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label htmlFor="timeStamp">TimeStamp</label>
            <input type="text" name="timeStamp" value={this.props.timeStamp} />
          </fieldset>
          <fieldset>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" value={this.props.text} />
          </fieldset>
          <fieldset>
            <label htmlFor="buttonText">Button Text</label>
            <input type="buttonText" name="buttonText" value={this.props.buttonText} />
          </fieldset>
          <fieldset>
            <label htmlFor="buttonLink">Button Link</label>
            <input type="buttonLink" name="buttonLink" value={this.props.buttonLink} />
          </fieldset>
          <button action="submit">Save</button>
        </form>
        {/* <Paper>
          <ReactUpload
            className="uploader"
            signingUrl="/s3/sign"
            signingUrlMethod="GET"
            accept="image/*"
            uploadRequestHeaders={{
              'x-amz-acl': 'public-read',
            }}
            signingUrlWithCredentials
            contentDisposition="auto"
          />
        </Paper> */}
      </div>
    );
  }

}

CardCreator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeStamp: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(CardCreator);
