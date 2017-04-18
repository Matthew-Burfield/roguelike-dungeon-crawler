import React, { Component } from 'react';

import './App.css';
import Map from './Game/Map';
import HUD from './Game/HUD';
import generateDungeon from './MapGenerator';
import {
  floor,
  stairwell,
  GAME_STATE_PLAYING,
  GAME_STATE_START_MENU,
  GAME_STATE_WIN,
  GAME_STATE_DEATH,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  TYPES,
} from './Utility';
import getNewPlayer from './Utility/player';
import NewGameScreen from './Game/Models/NewGame';
import DeathScreen from './Game/Models/Death';


/**
 * Helper function to update the hero position and action any
 * consumable items if the new tile has any
 *
 * @param {object} tile
 * @param {object} state
 * @param {array} newCoords
 * @returns {object} newState
 */
function checkTileAndMove(tile, state, newCoords) {
  const newState = Object.assign({}, state);
  const newRow = newCoords[0];
  const newCol = newCoords[1];

  switch (tile.type) {
  // If the player is moving onto a health square, increase the players health
    case TYPES.HEALTH_POTION:
      newState.dungeon[newRow][newCol] = floor;
      newState.player.consumeHealthPotion(tile);
      break;

  // If the player is moving onto a weapon, assign the new weapon and increase the players attack
    case TYPES.WEAPON:
    case TYPES.SHIELD:
      newState.dungeon[newRow][newCol] = floor;
      newState.player.equipItem(tile);
      break;

  // If the player is moving onto a monster, adjust health of characters
  // and prevent player from moving onto the square
    case TYPES.BOSS:
      newState.player.fight(tile);

      if (tile.isDead()) {
        newState.dungeon[newRow][newCol] = stairwell;
      }

      if (newState.player.isDead()) {
        newState.gameState = GAME_STATE_DEATH;
      }
      return newState;

  // If the player is moving onto a monster, adjust health of characters
  // and prevent player from moving onto the square
    case TYPES.MONSTER:
      newState.player.fight(tile);

      if (tile.isDead()) {
        newState.dungeon[newRow][newCol] = floor;
      }
      if (newState.player.isDead()) {
        newState.gameState = GAME_STATE_DEATH;
      }
      return newState;

    default:
  }

  newState.player.row = newRow;
  newState.player.col = newCol;

  return newState;
}


/**
 * The project isn't using redux, so all state changes happen here.
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      gameState: GAME_STATE_START_MENU,
      gameProperties: {
        mapOpacity: 1,
        startMenuTop: 0,
        deathScreenTop: -700,
      },
      level: 1,
      dungeon: generateDungeon(1),
      hudPlayerImage: 1,
      player: getNewPlayer(),
    };
    this.tick = this.tick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.initiateMenuScreen = this.initiateMenuScreen.bind(this);
  }


  /**
   * The player position is set depending on the key pressed.
   * The player's getImage() function will use the direction to determine
   * which image to display.
   *
   * @param {string} direction
   *
   * @memberOf App
   */
  setPlayerPosition(direction) {
    const newState = Object.assign({}, this.state);
    newState.player.currentDirection = direction;
    this.setState({
      newState,
    });
  }


  initiateDeathScreen() {
    this.setState({
      gameState: GAME_STATE_DEATH,
      gameProperties: {
        mapOpacity: 0,
        startMenuTop: -700,
        deathScreenTop: 0,
      },
    });
  }


  initiateMenuScreen() {
    this.setState({
      gameState: GAME_STATE_START_MENU,
      gameProperties: {
        mapOpacity: 0,
        startMenuTop: 0,
        deathScreenTop: -700,
      },
    });
  }


  startGame() {
    const startLevel = 1;
    document.addEventListener('keydown', this.keyPressEvents);
    this.setState({
      level: startLevel,
      dungeon: generateDungeon(startLevel),
      player: getNewPlayer(),
      gameState: GAME_STATE_PLAYING,
      gameProperties: {
        mapOpacity: 1,
        startMenuTop: -700,
        deathScreenTop: -700,
      },
    });
  }


  /**
   * Updates the player image in the HUD on a set interval in
   * order to give it an animation effect
   *
   * @memberOf App
   */
  tick() {
    this.setState(prevState => ({
      hudPlayerImage: prevState.hudPlayerImage === 1 ? 2 : 1,
    }));
  }


  /**
   * User has pressed a directional key. We need to determine if the hero
   * is allowed to move, and if there are any consumables on the tile
   * he is moving to
   *
   * @param {number} relRow
   * @param {number} relCol
   *
   * @memberOf App
   */
  movePlayerPosition(relRow, relCol) {
    const moveToRow = this.state.player.row + relRow;
    const moveToCol = this.state.player.col + relCol;

    // Don't update the position if player will be moving onto a blocking square
    if (this.state.dungeon[moveToRow][moveToCol].type === TYPES.WALL) {
      return;
    }

    if (this.state.dungeon[moveToRow][moveToCol].type === TYPES.STAIRWELL) {
      if (this.state.level + 1 > 3) {
        this.setState({
          gameState: GAME_STATE_WIN,
        });
      } else {
        const newPlayerState = Object.assign({}, this.state.player);
        newPlayerState.row = 1;
        newPlayerState.col = 1;
        this.setState(prevState => ({
          level: prevState.level + 1,
          dungeon: generateDungeon(prevState.level + 1),
          player: newPlayerState,
        }));
        return;
      }
    }

    const tile = this.state.dungeon[moveToRow][moveToCol];
    const newState = checkTileAndMove(tile, this.state, [moveToRow, moveToCol]);

    this.setState({
      newState,
    });

    // remove the key event listeners if the player dies
    if (newState.player.isDead()) {
      document.removeEventListener('keydown', this.keyPressEvents);
      this.initiateDeathScreen();
    }
  }


  /**
   * Allow both the WASD and arrow keys to be used
   *
   * @memberOf App
   */
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
      <div className="App" style={{ position: 'relative' }}>
        <div className="App-header">
          <h2>Rogue-like Dungeon Crawler</h2>
          <h4>Level {this.state.level}</h4>
        </div>
        <Map
          map={this.state.dungeon}
          player={this.state.player}
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT}
          mapOpacity={this.state.gameProperties.mapOpacity}
        />
        <HUD
          player={this.state.player}
          heroImage={this.state.hudPlayerImage}
          tick={this.tick}
        />
        <DeathScreen
          startGame={this.startGame}
          mainMenu={this.initiateMenuScreen}
          top={this.state.gameProperties.deathScreenTop}
        />
        <NewGameScreen
          gameState={this.state.gameState}
          startGame={this.startGame}
          top={this.state.gameProperties.startMenuTop}
        />
      </div>
    );
  }
}


export default App;
