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
    this.state = { revealCardCreatorForm: false };
    this.loadCards = this.loadCards.bind(this);
    this.showCardButton = this.showCardButton.bind(this);
    this.toggleRevealForm = this.toggleRevealForm.bind(this);
  }

  loadCards() {
    console.log('+++line 21 this.props: ', this.props);
    if (this.props.displayCards) {
      return this.props.displayCards.map((cardItem) => {
        return (
          <div key={cardItem.id}><CardItem card={cardItem} /></div>
        );
      });
    }
    return (
      <li>You have no cards</li>
    );
  }

  toggleRevealForm() {
    this.setState({ revealCardCreatorForm: true });
  }

  showCardButton() {
    if (this.state.revealCardCreatorForm) {
      return (
        <li>
          <CardCreator />;
        </li>
      );
    }
    if (this.props.selectedEpisode && !this.state.revealCardCreatorForm) {
      return (
        <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.toggleRevealForm}><i className="material-icons">add</i></a>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.loadCards()}
        </div>
          {this.showCardButton()}
      </div>
    );
  }
}

Cards.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayCards: PropTypes.array,
  selectedEpisode: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    displayCards: state.cards.allCards,
    selectedEpisode: state.cards.selectedEpisode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
