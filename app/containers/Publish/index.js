import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import FlatButton from 'material-ui/FlatButton';

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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cards) {
      this.filterPublishedCards(nextProps.cards);
    }
    if (nextProps.displaySavedMessage === true) {
      this.setState({ message: 'Saved' });
    }
  }

  filterPublishedCards(cards) {
    const unpublishedCards = cards.filter((card) => {
      return !card.is_published;
    });
    if (unpublishedCards.length === 0) {
      this.setState({ unpublishedCards: null });
    }
    this.setState({ unpublishedCards });
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
    console.log('cardsToBePublished: ', cardsToBePublished);
    this.props.dispatch(actions.publishCard(cardsToBePublished));
    this.setState({ message: 'Saving' });
  }

  disablePublishButton() {
    if (this.state.unpublishedCards === null) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <div>{this.state.message}</div>
        <FlatButton
          backgroundColor="#02dd78"
          onClick={() => {
            this.publishCards();
          }}
          label="Publish"
          disabled={this.disablePublishButton()}
        />
      </div>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
