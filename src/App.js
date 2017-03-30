

import React, { Component } from 'react';
import './App.css';
import Map from './Game/Map';
import HUI from './Game/HUI';
import generateMap from './MapGenerator';
import { f } from './utility';

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: {
        width: 250,
        height: 250,
      },
      map: generateMap(),
      player: {
        row: 1,
        col: 1,
        maxHealth: 100,
        currHealth: 100,
        level: 1,
        exp: 0,
        baseAttack: 1,
        defense: 0,
        weapon: {
          type: 'weapon',
          name: 'fists',
          attack: 0,
        },
        shield: 'no shield',
        attack() {
          const totalAttack = this.baseAttack + this.weapon.attack;
          return Math.floor(totalAttack * ((Math.random() * (1.1 - 0.9)) + 0.9));
        },
        /* Returns false if the player has died */
        fight(monster) {
          monster.recieveDamage(this);
          if (monster.isAlive) {
            this.currHealth -= monster.attack;
          }
          return this.currHealth > 0;
        },
        increaseExperience(exp) {
          const prevExp = this.exp;
          this.exp += exp;
          this.levelUp(prevExp);
        },
        equipWeapon(weapon) {
          if (weapon.attack > this.weapon.attack) {
            this.weapon = weapon;
          }
        },
        consumeHealthPotion(potion) {
          this.currHealth += potion.health;
          this.currHealth = this.currHealth > this.maxHealth ? this.maxHealth : this.currHealth;
        },
        levelUp(prevExp) {
          if (this.exp >= 100 && prevExp < 100) {
            this.level += 1;
            this.maxHealth += 20;
            this.currHealth = this.maxHealth;
          } else if (this.exp >= 200 && prevExp < 200) {
            this.level += 1;
            this.maxHealth += 20;
            this.currHealth = this.maxHealth;
          } else if (this.exp >= 300 && prevExp < 200) {
            this.level += 1;
            this.maxHealth += 20;
            this.currHealth = this.maxHealth;
          } else if (this.exp >= 400 && prevExp < 200) {
            this.level += 1;
            this.maxHealth += 20;
            this.currHealth = this.maxHealth;
          }
        },
      },
    };
  }

  componentWillMount() {
    /* This is before the component gets rendered for the first time
       add some event listeners for keyboard presses
    */
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 65:// a
        case 37:// left arrow
          this.movePlayerPosition(0, -1); // move left
          break;
        case 68:// d
        case 39:// right arrow
          this.movePlayerPosition(0, 1); // move right
          break;
        case 87:// w
        case 38:// up arrow
          this.movePlayerPosition(-1, 0); // move up
          break;
        case 83:// s
        case 40:// down arrow
          this.movePlayerPosition(1, 0); // move down
          break;
        default:
      }
    });
  }

  movePlayerPosition(relRow, relCol) {
    const moveToRow = this.state.player.row + relRow;
    const moveToCol = this.state.player.col + relCol;

    // Don't update the position if player will be moving onto a blocking square
    if (this.state.map[moveToRow][moveToCol].type === 'wall') {
      return;
    }

    const newState = Object.assign({}, this.state);

    const tileItem = newState.map[moveToRow][moveToCol];

    // If the player is moving onto a health square, increase the players health
    if (tileItem.type === 'health potion') {
      newState.map[moveToRow][moveToCol] = f;
      newState.player.consumeHealthPotion(tileItem);
    }

    // If the player is moving onto a weapon, assign the new weapon and increase the players attack
    if (tileItem.type === 'weapon') {
      newState.map[moveToRow][moveToCol] = f;
      newState.player.equipWeapon(tileItem);
    }

    // If the player is moving onto a monster, adjust health of characters
    // and prevent player from moving onto the square
    if (tileItem.type === 'monster' &&
        tileItem.isAlive === true) {
      const monster = tileItem;
      newState.player.fight(monster);
    } else {
      newState.player.row = moveToRow;
      newState.player.col = moveToCol;
    }

    this.setState({
      newState,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Roguelike Dungeon Crawler</h2>
        </div>
        <Map
          map={this.state.map}
          player={this.state.player}
          width={this.state.game.width}
          height={this.state.game.height}
        />
        <HUI
          player={this.state.player}
        />
      </div>
    );
  }
}

export default App;
