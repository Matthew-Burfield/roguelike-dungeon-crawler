import React from 'react';
import { tileWidth, tileHeight } from '../../utility';


const Tile = ({ col, player }) => {
  const style = {
    width: tileWidth,
    height: tileHeight,
    display: 'inline-block',
  };

  return (
    <div className={col.name} style={style}>
      {player && <img src="/images/hero.gif" alt="X" />}
      {!player && <img src={col.image} alt={col.name} />}
    </div>
  );
};


Tile.propTypes = {
  col: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
  }).isRequired,
  player: React.PropTypes.shape({
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
  }),
};


Tile.defaultProps = {
  player: undefined,
};


export default Tile;
