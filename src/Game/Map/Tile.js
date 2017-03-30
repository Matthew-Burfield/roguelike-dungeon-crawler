import React from 'react';
import { tileWidth, tileHeight } from '../../utility';


const Tile = ({ col, player, opacity }) => {
  const style = {
    width: tileWidth,
    height: tileHeight,
    display: 'inline-block',
    opacity,
  };

  return (
    <div className={col.type} style={style}>
      {player && <img src={player.image} alt="X" />}
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
