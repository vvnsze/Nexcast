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
};

const CardItem = ({ card, updateCard, deleteCard }) => {
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

  return (
    <div className="cardOuterWrapper" style={{ border: '2px solid #ccc', borderRadius: '6px', marginLeft: '5px', marginRight: '5px', marginBottom: '5px' }}>
      <Card className="cardContainer" containerStyle={styles.Card}>
        <CardHeader
          style={{ height: 100, background: '#0371d8', color: 'white' }}
          title={card.time_stamp}
        />
        <CardMedia>
          {checkMedia(card)}
        </CardMedia>
        <CardText>
          {card.id}
        </CardText>
        <CardActions>
          <FlatButton style={{ color: 'white', borderRadius: '4px' }} backgroundColor="#02dd78" href={card.button_link} label={card.button_text} />
        </CardActions>
        <CardActions>
          <FlatButton style={{ color: 'white', borderRadius: '4px' }} backgroundColor="#02dd78" onTouchTap={() => { updateCard(card); }} label="edit" />
        </CardActions>
        <CardActions>
          <FlatButton style={{ color: 'white', borderRadius: '4px' }} backgroundColor="#02dd78" onTouchTap={() => { deleteCard({ id: card.id }); }} label="delete" />
        </CardActions>
      </Card>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.object,
  updateCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

export default CardItem;
