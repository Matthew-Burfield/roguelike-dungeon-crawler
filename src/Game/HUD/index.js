import React from 'react';

import './index.css';
import { CONTAINER_WIDTH } from '../../utility';

class HUD extends React.Component {

  componentDidMount() {
    this.interval = setInterval(this.props.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { player } = this.props;
    const heroImage = `/images/hero1-hui${this.props.heroImage}.gif`;
    const HUD_WIDTH = CONTAINER_WIDTH + 50;

    return (
      <div id="container" style={{ width: HUD_WIDTH, margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
        <div id="playerStatus" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', width: 160 }}>
          <Icon id="shieldSquare" width={40} height={40} image={player.shield.image} altText="shield" />
          <Icon id="playerSquare" width={70} height={70} image={heroImage} altText="hero" />
          <Icon id="weaponSquare" width={40} height={40} image={player.weapon.image} altText="weapon" />
        </div>
        <div style={{ marginTop: 10 }}>
          <PlayerBar
            color="linear-gradient(#66BB6A, #1B5E20)"
            height={20}
            width={HUD_WIDTH}
            maxVal={player.maxHealth}
            currVal={player.currHealth}
          />
          <PlayerBar
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


const PlayerBar = ({ color, height, width, maxVal, currVal }) => {
  const widthCurrVal = (currVal / maxVal) * width;

  return (
    <div style={{ margin: 'auto', width, height, background: 'linear-gradient(#424242, #212121)' }}>
      <div style={{ margin: 'left', width: widthCurrVal, height, background: color }}>{name}</div>
    </div>
  );
};


PlayerBar.propTypes = {
  color: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  maxVal: React.PropTypes.number.isRequired,
  currVal: React.PropTypes.number.isRequired,
};


const Icon = ({ id, width, height, image, altText }) =>
  <div id={id} className="iconSquare" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height, background: 'radial-gradient(#424242, #212121)', borderRadius: 10 }}>
    <img src={image} alt={altText} />
  </div>;


Icon.propTypes = {
  id: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  image: React.PropTypes.string.isRequired,
  altText: React.PropTypes.string.isRequired,
};


export default HUD;
