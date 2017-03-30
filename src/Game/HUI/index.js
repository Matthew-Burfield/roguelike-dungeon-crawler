import React from 'react';

const HUI = ({ player }) => {
  const playerLevel = `Level ${player.level}`;

  return (
    <div style={{ margin: 'auto', fontSize: '0.8em' }}>
      <h2>Player</h2>
      <PlayerBar
        color="red"
        darkColor="darkRed"
        height={20}
        maxVal={player.maxHealth}
        currVal={player.currHealth}
      />
      <PlayerBar
        color="goldenrod"
        darkColor="#322A00"
        height={10}
        maxVal={player.nextLevelExp}
        currVal={player.currExp}
      />
      <p>Weapon: <b>{player.weapon.name}</b></p>
      <p>Shield: <b>{player.shield}</b></p>
    </div>
  );
};

HUI.propTypes = {
  player: React.PropTypes.shape({
    currHealth: React.PropTypes.number.isRequired,
    maxHealth: React.PropTypes.number.isRequired,
    level: React.PropTypes.number.isRequired,
    currExp: React.PropTypes.number.isRequired,
    nextLevelExp: React.PropTypes.number.isRequired,
    weapon: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      attack: React.PropTypes.number.isRequired,
    }).isRequired,
    shield: React.PropTypes.string.isRequired,
  }).isRequired,
};


const PlayerBar = ({ color, darkColor, height, maxVal, currVal }) => {
  const widthMaxVal = window.innerWidth * 0.6;
  const widthCurrVal = (currVal / maxVal) * widthMaxVal;

  return (
    <div className="playerHealthBar" style={{ margin: 'auto', width: widthMaxVal, height, backgroundColor: darkColor, borderRadius: height / 2 }}>
      <div style={{ margin: 'left', width: widthCurrVal, height, backgroundColor: color, borderRadius: height / 2 }}>{name}</div>
    </div>
  );
};


PlayerBar.propTypes = {
  color: React.PropTypes.string.isRequired,
  darkColor: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  maxVal: React.PropTypes.number.isRequired,
  currVal: React.PropTypes.number.isRequired,
};

export default HUI;
