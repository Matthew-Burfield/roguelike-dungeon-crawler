import React from 'react';
import { playerColor, tileWidth, tileHeight } from '../../utility';


const assignClassNameBasedOnTileValue = (col) => {
  let className;

  switch (col) {
    case 0:
      className = 'walkable';
      break;
    case 1:
      className = 'block';
      break;
    case 2:
      className = 'health';
      break;
    default:
  }

  return className;
};


const tileValue = (col) => {
  if (col === 1) {
    return <img src="/images/wall.gif" alt="1" />;
  } else if (col === 0) {
    return <img src="/images/floor.gif" alt="0" />;
  } else if (col === 2) {
    return <img src="/images/health_potion.gif" alt="2" />;
  }
  return col;
};


const Tile = ({ col, player }) => {
  const className = assignClassNameBasedOnTileValue(col);

  const style = {
    width: tileWidth,
    height: tileHeight,
    display: 'inline-block',
    color: player ? playerColor : '', // Override default color if player is on the tile;
  };

  return (
    <div className={className} style={style}>
      {player && 'X'}
      {!player && tileValue(col)}
    </div>
  );
};


Tile.propTypes = {
  col: React.PropTypes.number.isRequired,
  player: React.PropTypes.shape({
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
  }),
};


Tile.defaultProps = {
  player: undefined,
};


export default Tile;
