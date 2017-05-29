/*
 *
 * Cards
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.loadCards = this.loadCards.bind(this);
  }

  componentDidUpdate() {
    this.loadCards();
  }

  loadCards() {
    console.log('+++line 21 this.props: ', this.props);
    if (this.props.displayCards) {
      console.log('+++line 22 cards success on retrieving cards!: ', this.props.displayCards);
    } else {
      console.log('++++line 24: cannot see cards!');
    }
  }

  render() {
    return (
      <div>
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
