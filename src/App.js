

import React, { Component } from 'react';
import './App.css';
import Map from './Game/Map';
import HUD from './Game/HUD';
import generateMap from './MapGenerator';
import { f,
  GAME_STATE_PLAYING,
  // GAME_STATE_START_MENU,
  GAME_STATE_DEATH,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
  LEFT,
  RIGHT,
  UP,
  DOWN,
} from './utility';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameState: GAME_STATE_PLAYING,
      map: generateMap(),
      hudPlayerImage: 1,
      player: {
        row: 1,
        col: 1,
        maxHealth: 100,
        currHealth: 100,
        level: 1,
        currExp: 0,
        nextLevelExp: 100,
        baseAttack: 1,
        defense: 0,
        currentDirection: DOWN,
        weapon: {
          type: 'weapon',
          name: 'none',
          image: '/images/empty.gif',
          attack: 0,
        },
        shield: {
          type: 'shield',
          name: 'none',
          image: '/images/empty.gif',
          defense: 0,
        },
        getImage() {
          return `images/hero1-${this.currentDirection}.gif`;
        },
        attack() {
          const totalAttack = this.baseAttack + this.weapon.attack;
          return Math.floor(totalAttack * ((Math.random() * (1.1 - 0.9)) + 0.9));
        },
        /* Returns false if the player has died */
        fight(monster) {
          if (this.currHealth > 0) {
            monster.receiveDamage(this);
            if (monster.isAlive) {
              this.currHealth -= monster.attack;
              if (this.currHealth < 0) {
                this.currHealth = 0;
              }
            }
          }
          return this.currHealth;
        },
        increaseExperience(exp) {
          this.currExp += exp;
          if (this.currExp >= this.nextLevelExp) {
            this.levelUp();
          }
        },
        equipWeapon(weapon) {
          this.weapon = weapon;
        },
        consumeHealthPotion(potion) {
          this.currHealth += potion.health;
          this.currHealth = this.currHealth > this.maxHealth ? this.maxHealth : this.currHealth;
        },
        levelUp() {
          this.level += 1;
          this.maxHealth += 20;
          this.currExp = 0;
          this.nextLevelExp *= 1.2;
          this.currHealth = this.maxHealth;
        },
      },
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    /* This is before the component gets rendered for the first time
       add some event listeners for keyboard presses
    */
    document.addEventListener('keydown', this.keyPressEvents);
  }



  setPlayerPosition(direction) {
    const newState = Object.assign({}, this.state);
    newState.player.currentDirection = direction;
    this.setState({
      newState,
    });
  }


  tick() {
    this.setState(prevState => ({
      hudPlayerImage: prevState.hudPlayerImage === 1 ? 2 : 1,
    }));
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
      const playerHealth = newState.player.fight(monster);
      if (playerHealth <= 0) {
        newState.gameState = GAME_STATE_DEATH;
        document.removeEventListener('keydown', this.keyPressEvents);
        newState.player.image = 'images/tombstone.gif';
      }
    } else {
      newState.player.row = moveToRow;
      newState.player.col = moveToCol;
    }

    this.setState({
      newState,
    });
  }

  keyPressEvents = (e) => {
    switch (e.keyCode) {
      case 65:// a
      case 37:// left arrow
        this.setPlayerPosition(LEFT);
        this.movePlayerPosition(0, -1); // move left
        break;
      case 68:// d
      case 39:// right arrow
        this.setPlayerPosition(RIGHT);
        this.movePlayerPosition(0, 1); // move right
        break;
      case 87:// w
      case 38:// up arrow
        this.setPlayerPosition(UP);
        this.movePlayerPosition(-1, 0); // move up
        break;
      case 83:// s
      case 40:// down arrow
        this.setPlayerPosition(DOWN);
        this.movePlayerPosition(1, 0); // move down
        break;
      default:
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Rogue-like Dungeon Crawler</h2>
        </div>
        <Map
          map={this.state.map}
          player={this.state.player}
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT}
        />
        <HUD
          player={this.state.player}
          heroImage={this.state.hudPlayerImage}
          tick={this.tick}
        />
      </div>
    );
  }
}

export default App;
