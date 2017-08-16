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
    this.getCardTimeStamp = this.getCardTimeStamp.bind(this);

    this.state = {
      time_stamp: '123',
      description: 'Enter description',
      button_text: 'Enter button text!',
      button_link: 'Enter external link for button',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('+++line 30 cards props: ', nextProps);
    const updatedCardTime = nextProps.selectedTimeStamp;
    this.setState({ time_stamp: updatedCardTime });
  }

  onUploadFinish(args) {
    this.setState({
      media_link: args.publicUrl,
      media_type: 'image',
    });
  }

  getCardTimeStamp() {
    console.log('+++ 42: card time: ', this.state.time_stamp);
    return this.state.time_stamp;
  }

  handleFormSubmit(event) {
    const cardData = { ...this.state,
      podcast_id: this.props.selectedEpisode.nexcastPodcastId,
      episode_guid: this.props.selectedEpisode.guid };

    this.props.dispatch({ type: CREATE_CARD, payload: cardData });
  }

  handleChange(event) {
    const obj = {};
    obj[`${event.target.name}`] = event.target.value;
    this.setState(obj);
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label htmlFor="timeStamp">TimeStamp</label>
            <input type="text" onChange={this.handleChange} name="timeStamp" value={this.getCardTimeStamp()} />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
          </fieldset>
          <fieldset>
            <label htmlFor="button_text">Button Text</label>
            <input type="button_text" name="button_text" onChange={this.handleChange} value={this.state.button_text} />
          </fieldset>
          <fieldset>
            <label htmlFor="button_link">Button Link</label>
            <input type="button_link" name="button_link" onChange={this.handleChange} value={this.props.button_link} />
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
          <FlatButton style={{ background: '#02dd78' }} onTouchTap={this.handleFormSubmit}>Save</FlatButton>
        </form>
      </Card>
    );
  }
}

CreateCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeStamp: PropTypes.string,
  text: PropTypes.string,
  button_text: PropTypes.string,
  button_link: PropTypes.string,
  selectedEpisode: PropTypes.object,
  selectedTimeStamp: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedEpisode: state.cards.selectedEpisode,
    selectedTimeStamp: state.cards.cardTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
