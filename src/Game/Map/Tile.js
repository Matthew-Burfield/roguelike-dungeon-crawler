import React from 'react';
import { TILE_WIDTH, TILE_HEIGHT, FLOOR_TILE_IMAGE } from '../../utility';


const Tile = ({ col, player, opacity }) => {
  const style = {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    display: 'inline-block',
    opacity,
  };

  if (col.type !== 'wall') {
    style.backgroundImage = `url(${FLOOR_TILE_IMAGE})`;
  }

  return (
    <div className={col.type} style={style}>
      {player && <img src={player.getImage()} alt="X" />}
      {!player && col.type === 'monster' &&
        <Monster monster={col} />
      }
      {!player && col.type !== 'monster' && <img src={col.image} alt={col.type} />}
    </div>
  );
};


Tile.propTypes = {
  col: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
  }).isRequired,
  player: React.PropTypes.shape({
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
  }),
  opacity: React.PropTypes.number.isRequired,
};


Tile.defaultProps = {
  player: undefined,
  col: {
    name: '',
  },
};


const Monster = ({ monster }) =>
  <div>
    <span>
      <div
        style={{
          height: '5px',
          width: `${(monster.currentHealth / monster.totalHealth) * 30}px`,
          backgroundColor: 'green',
          position: 'absolute',
        }}
      />
    </span>
    <img src={monster.image} alt={monster.name} />
  </div>;


Monster.propTypes = {
  monster: React.PropTypes.shape({
    totalHealth: React.PropTypes.number.isRequired,
    currentHealth: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};


export default Tile;
