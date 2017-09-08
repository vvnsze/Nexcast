/*
 *
 * Cards
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { GridList, GridTile } from 'material-ui/GridList';
import * as actions from './actions';
import CardItem from '../../components/CardItem';
import CreateCard from './cardForms';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  noLoadedCard: {
    listStyleType: 'none',
  },
};

export class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { revealCardCreatorForm: false };
    this.loadCards = this.loadCards.bind(this);
    this.showCardButton = this.showCardButton.bind(this);
    this.toggleRevealForm = this.toggleRevealForm.bind(this);
    this.editCard = this.editCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showForm) {
      this.revealForm();
    }
    if (!nextProps.showForm) {
      this.hideForm();
    }
  }

  loadCards() {
    if (this.props.displayCards) {
      var sorted = this.props.displayCards.sort(function sortSeconds(a, b){
        return a.seconds - b.seconds;
      });
      return sorted.map((cardItem) => (
        (
          <GridTile
            key={cardItem.id}
            className="tileContainer"
          >
            <CardItem
              key={cardItem.id}
              card={cardItem}
              editCard={this.editCard} deleteCard={this.deleteCard}
            />
          </GridTile>
        )
      ));
    }
    return (
      <li style={styles.noLoadedCard}></li>
    );
  }

  editCard(cardValues) {
    this.props.dispatch(actions.editCard(cardValues));
  }

  deleteCard(cardId) {
    this.props.dispatch(actions.deleteCard(cardId));
  }

  toggleRevealForm() {
    if (!this.state.revealCardCreatorForm) return this.revealForm();
    return this.hideForm();
  }

  revealForm = () => {
    this.setState({ revealCardCreatorForm: true });
  }

  hideForm = () => {
    this.setState({ revealCardCreatorForm: false });
  }

  cancel = () => {
    this.setState({ revealCardCreatorForm: false });
    this.props.dispatch(actions.resetEditingCard());
  }

  showCardButton() {
    if (this.state.revealCardCreatorForm) {
      return (
        <GridTile className="tileContainer">
          <CreateCard
            cancelCard={this.cancel}
          />
        </GridTile>
      );
    }
    if (this.props.selectedEpisode && !this.state.revealCardCreatorForm) {
      return (
        <FloatingActionButton
          onTouchTap={this.toggleRevealForm}
          backgroundColor="#02dd78"
        >
          <ContentAdd />
        </FloatingActionButton>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <GridList style={styles.gridList} cols={2.2} cellHeight={500}>
          {this.loadCards()}
        </GridList>
        <div>{this.showCardButton()}</div>
      </div>
    );
  }
}

Cards.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayCards: PropTypes.array,
  selectedEpisode: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    displayCards: state.cards.allCards,
    selectedEpisode: state.cards.selectedEpisode,
    showForm: state.cards.showForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
