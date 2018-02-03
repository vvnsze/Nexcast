import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactUpload from 'react-s3-uploader';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions } from 'material-ui/Card';
import * as actions from './actions';

const styles = {
  createCardForm: {
    width: '420px',
    height: 'auto',
    display: 'inline-block',
    marginTop: '10px',
    borderStyle: 'normal',
    borderColor: '#E0E0E0',
    borderRadius: '10px',
  },
  cardLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  cardInput: {
    borderColor: '#E0E0E0',
    borderWidth: '2px',
    borderStyle: 'solid',
    marginTop: '5px',
    height: '25px',
    width: '100%',
  },
  descriptionInput: {
    borderColor: '#E0E0E0',
    borderWidth: '2px',
    borderStyle: 'solid',
    marginTop: '5px',
    height: '155px',
    width: '100%',
  },
  cancelButton: {
    background: 'white',
    color: 'black',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#E0E0E0',
  },
  saveButton: {
    background: '#02dd78',
    color: 'white',
    float: 'right',
  },
  fieldset: {
    border: 'none',
  },
  uploaderWrapper: {
    marginLeft: '8px',
    marginTop: '28px',
    marginBottom: '10px',
  },
};

class CreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.getCardTimeStamp = this.getCardTimeStamp.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.editState = this.editState.bind(this);
    this.state = {
      taggedTimestamp: '00:00:00',
      description: ' ',
      buttonText: ' ',
      buttonLink: ' ',
      uploading: ' ',
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

  onUploadProgress(args) {
    console.log(args);
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
          <fieldset style={styles.fieldset}>
            <label
              htmlFor="taggedTimestamp"
              style={styles.cardLabel}
            >TimeStamp</label>
            <input
              type="text"
              onChange={this.handleChange}
              name="taggedTimestamp"
              value={this.state.taggedTimestamp}
              placeholder="0:00:00"
              style={styles.cardInput}
            />
          </fieldset>
          <fieldset style={styles.fieldset}>
            <label
              htmlFor="description"
              style={styles.cardLabel}
            >Description</label>
            <textarea
              rows="10"
              cols="40"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="Enter description"
              style={styles.descriptionInput}
            />
          </fieldset>
          <fieldset style={styles.fieldset}>
            <label
              htmlFor="buttonText"
              style={styles.cardLabel}
            >Button Text</label>
            <input
              type="buttonText"
              name="buttonText"
              onChange={this.handleChange}
              value={this.state.buttonText}
              placeholder="Name of button"
              style={styles.cardInput}
            />
          </fieldset>
          <fieldset style={styles.fieldset}>
            <label
              htmlFor="buttonLink"
              style={styles.cardLabel}
            >Button Link</label>
            <input
              type="buttonLink"
              name="buttonLink"
              placeholder="External link for button"
              onChange={this.handleChange}
              value={this.state.buttonLink}
              style={styles.cardInput}
            />
          </fieldset>
          <div
            className="uploaderWrapper"
            style={styles.uploaderWrapper}
          >
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
              onProgress={this.onUploadProgress}
            />
          </div>
          <CardActions>
            <FlatButton
              style={styles.cancelButton}
              onTouchTap={this.props.cancelCard}
            >Cancel
            </FlatButton>
            <FlatButton
              style={styles.saveButton}
              onTouchTap={this.handleFormSubmit}
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
