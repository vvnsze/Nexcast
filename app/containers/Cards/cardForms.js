import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactUpload from 'react-s3-uploader';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions } from 'material-ui/Card';
import * as actions from './actions';

const styles = {
  // createCardForm: {
  //   position: 'inline-block',
  // },
  createCardForm: {
    width: '60%',
    height: 'relative',
    display: 'inline-block',
  },
};

class CreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.getCardTimeStamp = this.getCardTimeStamp.bind(this);
    this.editState = this.editState.bind(this);
    this.state = {
      taggedTimestamp: '00:00:00',
      description: 'Enter description',
      buttonText: 'Enter button text!',
      buttonLink: 'Enter external link for button',
    };
  }

  componentWillMount() {
    if (!this.props.selectedTimeStamp && !this.props.editCardDetail) {
      return;
    } else if (this.props.selectedTimeStamp) {
      this.setState({ taggedTimestamp: this.props.selectedTimeStamp });
    }
    this.editState(this.props.editCardDetail);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTimeStamp) {
      this.setState({
        taggedTimestamp: nextProps.selectedTimeStamp,
      });
    }
    if (nextProps.selectedTimeStamp && nextProps.editCardDetail) {
      this.editState({
        ...nextProps.editCardDetail,
        taggedTimestamp: nextProps.selectedTimeStamp,
      });
    } else {
      this.editState({
        ...nextProps.editCardDetail,
      });
    }
  }

  onUploadFinish(args) {
    this.setState({
      mediaLink: args.publicUrl,
      mediaType: 'image',
    });
  }

  getCardTimeStamp() {
    return this.state.taggedTimestamp;
  }

  editState(cardDetails) {
    this.setState({
      taggedTimestamp: cardDetails.taggedTimestamp,
      description: cardDetails.description,
      buttonText: cardDetails.buttonText,
      buttonLink: cardDetails.buttonLink,
      mediaLink: cardDetails.mediaLink,
      mediaType: cardDetails.mediaType,
      isPublished: cardDetails.isPublished,
    });
  }

  handleFormSubmit(event) {
    const createCardData = { ...this.state,
      podcastId: this.props.selectedEpisode.nexcastPodcastId,
      isPublished: false,
      episode_guid: this.props.selectedEpisode.guid };
    const updateCardData = { ...this.state,
      id: this.props.editCardDetail.id,
      podcastId: this.props.selectedEpisode.nexcastPodcastId,
      episode_guid: this.props.selectedEpisode.guid };
    if (!this.props.isEditingCard) {
      this.props.dispatch(actions.createCard(createCardData));
    }
    if (this.props.isEditingCard === true) {
      this.props.dispatch(actions.updateCard(updateCardData));
    }
  }

  handleChange(event) {
    const obj = {};
    obj[`${event.target.name}`] = event.target.value;
    this.setState(obj);
  }

  render() {
    return (
      <Card
        style={styles.createCardForm}
      >
        <form
          onSubmit={this.handleFormSubmit}
        >
          <fieldset>
            <label htmlFor="taggedTimestamp">TimeStamp</label>
            <input type="text" onChange={this.handleChange} name="taggedTimestamp" value={this.state.taggedTimestamp} />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
          </fieldset>
          <fieldset>
            <label htmlFor="buttonText">Button Text</label>
            <input type="buttonText" name="buttonText" onChange={this.handleChange} value={this.state.buttonText} />
          </fieldset>
          <fieldset>
            <label htmlFor="buttonLink">Button Link</label>
            <input type="buttonLink" name="buttonLink" onChange={this.handleChange} value={this.state.buttonLink} />
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
          <CardActions>
            <FlatButton
              style={{ background: '#02dd78' }} onTouchTap={this.props.cancelCard}
            >Cancel
            </FlatButton>
            <FlatButton
              style={{ background: '#02dd78' }} onTouchTap={this.handleFormSubmit}
            >Save
            </FlatButton>
          </CardActions>
        </form>
      </Card>
    );
  }
}

CreateCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  taggedTimestamp: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  selectedEpisode: PropTypes.object,
  selectedTimeStamp: PropTypes.string,
  editCardDetail: PropTypes.object,
  isEditingCard: PropTypes.bool,
  id: PropTypes.number,
  cancelCard: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    selectedEpisode: state.cards.selectedEpisode,
    selectedTimeStamp: state.cards.cardTime.time,
    editCardDetail: state.cards.cardDetail,
    isEditingCard: state.cards.editingCard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
