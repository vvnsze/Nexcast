import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as actions from './actions';

const styles = {
  publishWrapper: {
    display: 'inlineBlock',
    float: 'right',
  },
  publishMessage: {
    display: 'inlineBlock',
    paddingRight: '20px',
  },
};

export class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      unpublishedCards: null,
    };
    this.filterPublishedCards = this.filterPublishedCards.bind(this);
    this.publishCards = this.publishCards.bind(this);
    this.disablePublishButton = this.disablePublishButton.bind(this);
    this.showButton = this.showButton.bind(this);
  }

  componentWillMount() {
    this.disablePublishButton();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cards) {
      this.filterPublishedCards(nextProps.cards);
    }
    if (nextProps.displaySavedMessage === true) {
      this.setState({ message: 'Saved' });
    }
  }

  showButton() {
    if (this.props.chosenEpisode === null) {
      return <div></div>;
    }
    return (
      <div
        className="publishWrapper"
        style={styles.publishWrapper}
      >
        <div
          className="publishMessage"
          style={styles.publishMessage}
        >
          {this.state.message}
        </div>
        <FlatButton
          backgroundColor="white"
          onClick={() => {
            this.publishCards();
          }}
          label="Publish"
          disabled={this.disablePublishButton()}
        />
      </div>
    );
  }

  filterPublishedCards(cards) {
    const unpublishedCards = cards.filter((card) => {
      if (!card.is_published) {
        return card;
      }
    });
    if (unpublishedCards.length === 0) {
      this.setState({ unpublishedCards: null });
    }
    this.setState({ unpublishedCards });
    console.log('unpublishedCards: ', unpublishedCards);
  }

  publishCards() {
    var cardsToBePublished = this.state.unpublishedCards.map((card) => {
      const publishCard = card;
      publishCard.published = true;
      return card.id;
    }).reduce((obj, id) => {
      if (!obj.ids) {
        obj.ids = [];
      }
      obj.ids.push(id);
      return obj;
    }, {});
    this.props.dispatch(actions.publishCard(cardsToBePublished));
    this.setState({ message: 'Saving' });
  }

  disablePublishButton() {
    if (this.state.unpublishedCards !== null) {
      return false;
    }
    return true;
  }

  render() {
    return (
      this.showButton()
    );
  }
}

Publish.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.cards.allCards,
    displaySavedMessage: state.cards.displaySavedMessage,
    chosenEpisode: state.episodePlayer.chosenEpisode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
