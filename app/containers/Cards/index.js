/*
 *
 * Cards
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import CardCreator from '../CardCreator';

export class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.loadCards = this.loadCards.bind(this);
    this.createCardButton = this.createCardButton.bind(this);
  }

  loadCards() {
    console.log('+++line 21 this.props: ', this.props);
    if (this.props.displayCards) {
      console.log('+++line 22 cards success on retrieving cards!: ', this.props.displayCards);
      return this.props.displayCards.map((cardItem) => {
        return (
          <li key={cardItem.id}><CardItem card={cardItem} /></li>
        );
      });
    } else {
    return <li>You have no cards</li>
  }

  createCardButton() {

  }

  render() {
    return (
      <div>
        <ul>{this.loadCards()}</ul>
      </div>
    );
  }
}

Cards.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayCards: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    displayCards: state.cards.allCards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
