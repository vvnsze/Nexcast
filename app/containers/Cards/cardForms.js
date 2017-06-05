import React, { PropTypes } from 'react';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';

import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
} from './constants';
 
class CreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);

    this.state = {
      timeStamp: '123',
      text: 'Enter a title',
      buttonText: 'CTA button Text',
      buttonLink: 'CTA button destination',
    }
  }

  handleChange(event) {
    let obj = {};
    obj[`${event.target.name}`] = event.target.value;
    this.setState(obj);
  }

  handleFormSubmit(event) {
    this.props.dispatch({type: CREATE_CARD, payload: this.state})
  }

  onUploadFinish(args) {
    this.setState({
      media_link: args.signingUrl 
    })
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label htmlFor="timeStamp">TimeStamp</label>
            <input type="text" onChange={this.handleChange} name="timeStamp" value={this.state.timeStamp} />
          </fieldset>
          <fieldset>
            <label htmlFor="desctiption">Text</label>
            <input type="text" name="desctiption" onChange={this.handleChange} value={this.state.text} />
          </fieldset>
          <fieldset>
            <label htmlFor="button_text">Button Text</label>
            <input type="buttonText" name="button_text" onChange={this.handleChange} value={this.state.buttonText} />
          </fieldset>
          <fieldset>
            <label htmlFor="button_link">Button Link</label>
            <input type="buttonLink" name="button_link" onChange={this.handleChange} value={this.props.buttonLink} />
          </fieldset>
          <div>
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
              onFinish={this.onUploadFinish}
            />
          </div>
          <FlatButton onTouchTap={this.handleFormSubmit}>Save</FlatButton>
        </form>
      </Card>
    );
  }
}

CreateCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeStamp: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    cardsCards: state.cards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
