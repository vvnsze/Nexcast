import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import styled from 'styled-components';

const styles = {
  Card: {
    height: '500px',
    width: '300px',
    overflow: 'scroll',
    margin: '10px',
  },
  wrapper: {
    border: '2px solid #ccc',
    borderRadius: '6px',
    marginLeft: '5px',
    marginRight: '5px',
    marginBottom: '5px',
  },
  modifyButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    color: '#0371d8',
    position: 'inline-block',
    width: '10px',
  },
  cardLinkButton: {
    width: '80%',
    color: 'white',
    borderRadius: '4px',
  },
};

const CardItem = ({ card, editCard, deleteCard }) => {
  const checkMedia = function check(item) {
    if (item.media_type === 'image') {
      return (
        <img role="presentation" src={item.media_link}></img>
      );
    }
    if (item.media_type === 'picture') {
      return (
        <img role="presentation" src={item.media_link}></img>
      );
    }
    return (
      <div>No media</div>
    );
  };

  const printCardTime = function makeTitle(item) {
    if (item) {
      return (`${item.tagged_timestamp}`);
    }
    return '00:00:00';
  };

  return (
    <div
      className="cardOuterWrapper"
      style={styles.wrapper}
    >
      <Card
        className="cardContainer"
        containerStyle={styles.Card}
      >
        <CardHeader
          style={{ height: 100, background: '#0371d8' }}
          titleColor="white"
          title={printCardTime(card)}
        />
        <CardMedia>
          {checkMedia(card)}
        </CardMedia>
        <CardText>
          {card.description}
        </CardText>
        <CardActions>
          <FlatButton
            style={styles.cardLinkButton} backgroundColor="#02dd78"
            href={card.button_link}
            label={card.button_text}
            fullWidth={true}
          />
        </CardActions>
        <CardActions>
          <FlatButton style={styles.modifyButton} backgroundColor="#02dd78" onTouchTap={() => { editCard(card); }} label="edit" />
          <FlatButton style={styles.modifyButton} backgroundColor="#02dd78" onTouchTap={() => { deleteCard({ id: card.id }); }} label="delete" />
        </CardActions>
      </Card>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.object,
  editCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

export default CardItem;
