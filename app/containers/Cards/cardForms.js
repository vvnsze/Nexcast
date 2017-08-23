import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import ReactUpload from 'react-s3-uploader';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';

import {
  CREATE_CARD,
  UPDATE_CARD,
} from './constants';

class CreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.getCardTimeStamp = this.getCardTimeStamp.bind(this);
    this.editState = this.editState.bind(this);

    this.state = {
      tagged_timestamp: '00:00:00',
      description: 'Enter description',
      button_text: 'Enter button text!',
      button_link: 'Enter external link for button',
    };
  }

  componentWillMount() {
    console.log('+++line 30 cards props: ', this.props);
    if (!this.props.selectedTimeStamp && !this.props.editCardDetail) {
      return;
    } else if (this.props.selectedTimeStamp) {
      this.setState({ tagged_timestamp: this.props.selectedTimeStamp });
    }
    this.editState(this.props.editCardDetail);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTimeStamp) {
      this.editState({
        ...nextProps.editCardDetail,
        tagged_timestamp: nextProps.selectedTimeStamp,
      });
    } else {
      this.editState({
        ...nextProps.editCardDetail,
      });
    }
  }

  onUploadFinish(args) {
    this.setState({
      media_link: args.publicUrl,
      media_type: 'image',
    });
  }

  getCardTimeStamp() {
    return this.state.tagged_timestamp;
  }

  editState(cardDetails) {
    this.setState({
      tagged_timestamp: cardDetails.tagged_timestamp,
      description: cardDetails.description,
      button_text: cardDetails.button_text,
      button_link: cardDetails.button_link,
      media_link: cardDetails.media_link,
      media_type: cardDetails.media_type,
    });
  }

  handleFormSubmit(event) {
    const createCardData = { ...this.state,
      podcast_id: this.props.selectedEpisode.nexcastPodcastId,
      episode_guid: this.props.selectedEpisode.guid };
    const updateCardData = { ...this.state,
      cardId: this.props.editCardDetail.id,
      podcast_id: this.props.selectedEpisode.nexcastPodcastId,
      episode_guid: this.props.selectedEpisode.guid };
    if (!this.editCardDetail.editingCard) {
      this.props.dispatch({ type: CREATE_CARD, payload: createCardData });
    }
    if (this.editCardDetail.editingCard) {
      this.props.dispatch({ type: UPDATE_CARD, payload: updateCardData });
    }
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
            <input type="button_link" name="button_link" onChange={this.handleChange} value={this.state.button_link} />
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
  tagged_timestamp: PropTypes.string,
  text: PropTypes.string,
  button_text: PropTypes.string,
  button_link: PropTypes.string,
  selectedEpisode: PropTypes.object,
  selectedTimeStamp: PropTypes.string,
  editCardDetail: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedEpisode: state.cards.selectedEpisode,
    selectedTimeStamp: state.cards.cardTime.time,
    editCardDetail: state.cards.cardDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
