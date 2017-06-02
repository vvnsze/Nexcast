/**
*
* CardItem
*
*/

import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { GridTile } from 'material-ui/GridList';
// import styled from 'styled-components';


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
    <GridTile key={card.id}>
      <Card>
        <CardHeader
          title={card.taggedtimestamp}
        />
        <CardMedia>
          {checkMedia(card)}
        </CardMedia>
        <CardText>
          {card.description}
        </CardText>
        <CardActions>
          <FlatButton label={card.button_text} />
        </CardActions>
      </Card>
    </GridTile>
  );
};

CardItem.propTypes = {
  card: PropTypes.object,
};

export default CardItem;
