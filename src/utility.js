// Player color isn't really relevant now that we're using an image
export const playerColor = '#FF5722';

// tileWidth and tileHeight can't really be changed now that
// we're using pixel tiles to display objects.
export const TILE_WIDTH = '30px';
export const TILE_HEIGHT = '30px';

export const GAME_STATE_PLAYING = 'PLAYING';
export const GAME_STATE_START_MENU = 'START_MENU';
export const GAME_STATE_DEATH = 'DEATH';

export const CONTAINER_WIDTH = 330;
export const CONTAINER_HEIGHT = 330;

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const FLOOR_TILE_IMAGE = 'images/floor.gif';

export const monster = {
  init(level, health, name) {
    this.name = name;
    this.level = level;
    this.totalHealth = health;
    this.currentHealth = health;
    this.image = `images/monster_${level}.gif`;
    this.type = 'monster';
    this.isAlive = true;
    this.attack = level * health;
  },
  receiveDamage(player) {
    if (this.isAlive) {
      this.currentHealth -= player.attack();
      this.isDead(player);
    }
  },
  isDead(player) {
    if (this.currentHealth <= 0) {
      this.isAlive = false;
      this.image = 'images/floor.gif';
      player.increaseExperience(this.level * 50);
    }
  },
};

/* Tile Values */

// (blocking) wall
export const b = {
  type: 'wall',
  image: 'images/wall.gif',
};

// floor
export const f = {
  type: 'floor',
  image: 'images/floor.gif',
};

// health potion
export const h = {
  type: 'health potion',
  image: 'images/health_potion.gif',
  health: 10,
};
