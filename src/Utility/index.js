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

export const IMAGE_PATH = 'images';
export const FLOOR_TILE_IMAGE = `${IMAGE_PATH}/floor.gif`;

export const monster = {
  type: 'monster',
  init(level) {
    this.name = this.initName(level);
    this.level = level;
    this.totalHealth = this.initHealth(level);
    this.currentHealth = this.totalHealth;
    this.image = `${IMAGE_PATH}/monsters/monster_${level}.gif`;
    this.attack = this.initAttack(level);
  },
  initName(level) {
    switch (level) {
      case 1:
        return 'grimer';
      case 2:
        return 'mini grim';
      case 3:
        return 'vampire bat';
      case 4:
        return 'evil elf';
      case 5:
        return 'crazed devil bat';
      default:
        return 'Add name to monster initName function';
    }
  },
  initHealth(level) {
    return level * 20;
  },
  initAttack(level) {
    return level * 5;
  },
  receiveDamage(player) {
    if (!this.isDead()) {
      this.currentHealth -= player.attack();
      if (this.isDead()) {
        this.image = 'images/empty.gif';
        player.increaseExperience(this.level * 50);
      }
    }
  },
  isDead() {
    return this.currentHealth <= 0;
  },
};

export const weapon = {
  type: 'weapon',
  init(name, attackValue) {
    const imageVal = `${IMAGE_PATH}/weapons/${name.toLowerCase().replace(' ', '_')}.gif`;
    this.name = name;
    this.image = imageVal;
    this.attack = attackValue;
  },
};

// health potion
export const healthPotion = {
  type: 'health potion',
  image: `${IMAGE_PATH}/consumables/health_potion.gif`,
  init(health) {
    this.health = health;
  },
};

/* Tile Values */

// (blocking) wall
export const b = {
  type: 'wall',
  image: `${IMAGE_PATH}/wall.gif`,
};

// floor
export const f = {};


