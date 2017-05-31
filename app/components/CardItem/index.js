/**
*
* CardItem
*
*/

import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import styled from 'styled-components';


const CardItem = ({ card }) => {
  const checkMedia = function (item) {
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
  );
};

CardItem.propTypes = {
  card: PropTypes.object,
};

export default CardItem;
