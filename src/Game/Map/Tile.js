import React from 'react';
import { TILE_WIDTH, TILE_HEIGHT, FLOOR_TILE_IMAGE } from '../../Utility';


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

  const display = () => {
    if (!col.type) return null; // This is for floors
    if (col.type === 'monster' || col.type === 'boss') {
      return <Monster monster={col} healthColor={col.type === 'monster' ? 'green' : 'yellow'} />;
    }
    return <img src={col.image} alt={col.type} />;
  };

  return (
    <div className={col.type} style={style}>
      {player && <img src={player.getImage()} alt="X" />}
      {!player && display(col)}
    </div>
  );
};


Tile.propTypes = {
  col: React.PropTypes.shape({
    type: React.PropTypes.string,
    image: React.PropTypes.string,
    name: React.PropTypes.string,
  }).isRequired,
  player: React.PropTypes.shape({
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    getImage: React.PropTypes.func.isRequired,
  }),
  opacity: React.PropTypes.number.isRequired,
};


Tile.defaultProps = {
  player: undefined,
  col: {
    name: null,
    type: null,
    image: null,
  },
};


const Monster = ({ monster, healthColor }) =>
  <div>
    <span>
      <div
        style={{
          height: '5px',
          width: `${(monster.currentHealth / monster.totalHealth) * 30}px`,
          backgroundColor: healthColor,
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
  healthColor: React.PropTypes.string.isRequired,
};


export default Tile;
