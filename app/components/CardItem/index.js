import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import styled from 'styled-components';

const styles = {
  Card: {
    height: 500,
    width: 300,
  },
};

const CardItem = ({ card }) => {
  const checkMedia = function check(item) {
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
      <Card containerStyle={styles.Card}>
        <CardHeader
          style={{ height: 100, background: '#60B2E5' }}
          title={card.tagged_timestamp}
        />
        <CardMedia>
          {checkMedia(card)}
        </CardMedia>
        <CardText>
          {card.description}
        </CardText>
        <CardActions>
          <FlatButton href={card.button_link} label={card.button_text} />
        </CardActions>
      </Card>
  );
};

CardItem.propTypes = {
  card: PropTypes.object,
};

export default CardItem;
