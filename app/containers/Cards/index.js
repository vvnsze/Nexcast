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
// This is styles for the grid list
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
  // titleStyle: {
  //   color: 'rgb(0, 188, 212)',
  // },
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
    if (nextProps.closeForm) {
      this.setState({ revealCardCreatorForm: false });
    }
  }

  loadCards() {
    if (this.props.displayCards) {
      return this.props.displayCards.map((cardItem) => (
        (
          <GridTile
            key={cardItem.id}
            className="tileContainer"
          >
            <CardItem
              card={cardItem}
              editCard={this.editCard} deleteCard={this.deleteCard}
            />
          </GridTile>
        )
      ));
    }
    return (
      <li>You have no cards</li>
    );
  }

  editCard(cardValues) {
    this.props.dispatch(actions.editCard(cardValues));
  }

  deleteCard(cardId) {
    this.props.dispatch(actions.deleteCard(cardId));
  }

  toggleRevealForm() {
    this.setState({ revealCardCreatorForm: true });
  }

  cancel = () => {
    this.setState({ revealCardCreatorForm: false });
    this.props.dispatch(actions.resetEditingCard());
  }

  showCardButton() {
    if (this.state.revealCardCreatorForm) {
      return (
        <GridTile className="tileContainer">
          <CreateCard />
          <button onClick={this.cancel}>cancel</button>
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
    closeForm: state.cards.closeForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
