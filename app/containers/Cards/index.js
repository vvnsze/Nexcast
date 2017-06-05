/*
 *
 * Cards
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
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
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  gridTile: {
  },
};

export class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { revealCardCreatorForm: false };
    this.loadCards = this.loadCards.bind(this);
    this.showCardButton = this.showCardButton.bind(this);
    this.toggleRevealForm = this.toggleRevealForm.bind(this);
  }

  loadCards() {
    if (this.props.displayCards) {
      return this.props.displayCards.map((cardItem) => {
        return (
          <GridTile style={styles.GridTile} >
            <CardItem card={cardItem} />
          </GridTile>
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
        <GridTile style={styles.gridTile}>
          <CreateCard />
        </GridTile>
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
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2} cellHeight={500}
            children={this.loadCards()}
          />
          {this.showCardButton()}
        </div>

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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
