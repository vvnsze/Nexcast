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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
      return this.props.displayCards.map((cardItem) => (
        (
          <GridTile className="tileContainer" >
            <CardItem card={cardItem} />
          </GridTile>
        )
      ));
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
        <GridTile className="tileContainer">
          <CreateCard />
          {/* Put cancel button */}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
