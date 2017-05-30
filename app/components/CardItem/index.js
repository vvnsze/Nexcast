/**
*
* CardItem
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';


const CardItem = ({ card }) => {
  const checkMedia = function (item) {
    if (item.media_type === 'picture') {
      return (<img role="display" height="45" width="45" src={item.media_link}></img>)
    }
  };

  return (
    <div>
      <div>Time: {card.taggedtimestamp}</div>
      <div>Image: {checkMedia(card)}</div>
      <div>Description: {card.description}</div>
      <div>Button</div>
    </div>
  )
}

CardItem.propTypes = {
  card: PropTypes.object,
};

export default CardItem;
