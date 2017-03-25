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
      {player && <Player />}
      {!player && col.name === 'monster' &&
        <Monster monster={col} />
      }
      {!player && col.name !== 'monster' && <img src={col.image} alt={col.name} />}
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


const Player = () =>
  <img src="/images/hero.gif" alt="X" />;


export default Tile;
