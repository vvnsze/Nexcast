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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cards) {
      this.filterPublishedCards(nextProps.cards);
    }
  }

  filterPublishedCards(cards) {
    const unpublishedCards = cards.filter((card) => {
      return !card.published;
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
      return card;
    });
    this.props.dispatch(actions.publishCards(cardsToBePublished));
  }

  render() {
    return (
      <div>
        <FlatButton
          backgroundColor="#02dd78"
          onClick={() => {
            this.publishCards();
          }}
          label="Publish"
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
