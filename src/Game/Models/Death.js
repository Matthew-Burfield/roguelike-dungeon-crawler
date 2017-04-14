import React from 'react';
import Button from '../../Utility/Button';

const DeathScreen = ({ startGame, mainMenu, top }) =>
  <div key="menu" className="menu" style={{ position: 'absolute', top, width: '100%', height: '50%', transition: 'top 1s cubic-bezier(1.000, 0.530, 0.405, 1.425)', transitionDelay: '2s' }}>
    <div style={{ margin: '150px auto', maxWidth: 500 }}>
      <h1>You died</h1>
      <br />
      <Button clickHandler={startGame}>Play Again</Button>
      <Button clickHandler={mainMenu}>Main Menu</Button>
    </div>
  </div>;

DeathScreen.propTypes = {
  startGame: React.PropTypes.func.isRequired,
  mainMenu: React.PropTypes.func.isRequired,
  top: React.PropTypes.number.isRequired,
};

export default DeathScreen;
