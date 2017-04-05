import React from 'react';

import './index.css';
import { CONTAINER_WIDTH, IMAGE_PATH } from '../../Utility';
import EquipmentSlot from './EquipmentSlot';
import Bar from './Bar';

class HUD extends React.Component {

  componentDidMount() {
    this.interval = setInterval(this.props.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { player } = this.props;
    const heroImage = `${IMAGE_PATH}/hero/hero1-hui${this.props.heroImage}.gif`;
    const HUD_WIDTH = CONTAINER_WIDTH + 50;

    return (
      <div id="container" style={{ width: HUD_WIDTH, margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
        <div id="playerStatus" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', width: 160 }}>
          <EquipmentSlot id="weaponSquare" width={40} height={40} image={player.weapon.image} altText="weapon">
            <p>Name: {player.weapon.name}</p>
            <p>Attack: {player.weapon.attack}</p>
          </EquipmentSlot>
          <EquipmentSlot id="playerSquare" width={70} height={70} image={heroImage} altText="hero">
            <p>Level: {player.level}</p>
            <p>Health: {player.currHealth} / {player.maxHealth}</p>
            <p>EXP: {player.currExp} / {player.nextLevelExp}</p>
          </EquipmentSlot>
          <EquipmentSlot id="shieldSquare" width={40} height={40} image={player.shield.image} altText="shield">
            <p>Name: {player.shield.name}</p>
            <p>Defense: {player.shield.defense}</p>
          </EquipmentSlot>
        </div>
        <div style={{ marginTop: 10 }}>
          <Bar
            color="linear-gradient(#64DD17, #1B5E20)"
            height={20}
            width={HUD_WIDTH}
            maxVal={player.maxHealth}
            currVal={player.currHealth}
          />
          <Bar
            color="linear-gradient(#FFCA28, #FF6F00)"
            height={10}
            width={HUD_WIDTH}
            maxVal={player.nextLevelExp}
            currVal={player.currExp}
          />
        </div>
      </div>
    );
  }
}


HUD.propTypes = {
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
    shield: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      defense: React.PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  heroImage: React.PropTypes.number.isRequired,
  tick: React.PropTypes.func.isRequired,
};


export default HUD;
