import React from 'react';

const Tile = ({ col, player }) => {
  const className = col === 1 ? 'block' : 'walkable';
  let color = className === 'block' ? '#212121' : '#BDBDBD';
  if (player) color = '#FF5722';

  const style = {
    width: '30px',
    height: '30px',
    display: 'inline-block',
    color,
  };

  return (
    <div className={className} style={style}>
      {player && 'X'}
      {!player && col}
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
