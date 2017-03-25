import React from 'react';

const HUI = ({ player }) => {
  const pStyle = {
    margin: '2px',
  };

  return (
    <div style={{ fontSize: '0.8em', textAlign: 'left', marginLeft: '20px' }}>
      <h2>Player</h2>
      <p style={pStyle}>Health: <b>{player.currHealth}</b></p>
      <p style={pStyle}>Level: <b>{player.level}</b></p>
      <p style={pStyle}>Exp: <b>{player.exp}</b></p>
      <p style={pStyle}>Weapon: <b>{player.weapon.name}</b></p>
      <p style={pStyle}>Shield: <b>{player.shield}</b></p>
    </div>
  );
};

HUI.propTypes = {
  player: React.PropTypes.shape({
    currHealth: React.PropTypes.number.isRequired,
    level: React.PropTypes.number.isRequired,
    exp: React.PropTypes.number.isRequired,
    weapon: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      attack: React.PropTypes.number.isRequired,
    }).isRequired,
    shield: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default HUI;
