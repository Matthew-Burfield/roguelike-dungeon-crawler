import React from 'react';

import { IMAGE_PATH } from '../../Utility';
import Button from '../../Utility/Button';

const NewGame = ({ startGame, height }) =>
  <div className="startMenu" style={{ position: 'absolute', backgroundColor: 'rgb(45, 46, 41)', opacity: 1, top: 0, width: '100%', height }}>
    <div style={{ margin: '20px auto', maxWidth: 500 }}>
      <h1>Welcome to Rogue-like Dungeon Crawler</h1>
      <p>Help dominic the barbarian fight his way through 3 levels on dungeons</p>
      <img src={`${IMAGE_PATH}/hero/hero1-hui1.gif`} alt="hero" />
      <p>Use:</p>
      <p>
        <img src={`${IMAGE_PATH}/wasd_pad.gif`} alt="wasd_pad" /> or
          <img src={`${IMAGE_PATH}/directional_pad.gif`} alt="directional_pad" />
      </p>
      <p>
        There is a Boss monster protecting the entrance to each level,
         you&#39;ll need to hone your skills before you are able to take them out!
      </p>
      <p>Be on the lookout for weapons to help you slay those monsters!</p>
      <br />
      <Button clickHandler={startGame}>Start Game!</Button>
    </div>
  </div>;

NewGame.propTypes = {
  startGame: React.PropTypes.func.isRequired,
  height: React.PropTypes.string.isRequired,
};

export default NewGame;
