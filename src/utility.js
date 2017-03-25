// Player color isn't really relevant now that we're using an image
export const playerColor = '#FF5722';

// tileWidth and tileHeight can't really be changed now that
// we're using pixel tiles to display objects.
export const tileWidth = '30px';
export const tileHeight = '30px';

export const monster = {
  init(level, health, name) {
    this.name = name;
    this.level = level;
    this.totalHealth = health;
    this.currentHealth = health;
    this.image = `/images/monster_${level}.gif`;
    this.type = 'monster';
    this.isAlive = true;
    this.attack = level * health;
  },
  recieveDamage(player) {
    if (this.isAlive) {
      this.currentHealth -= player.attack();
      this.isDead(player);
    }
  },
  isDead(player) {
    if (this.currentHealth <= 0) {
      this.isAlive = false;
      this.image = '/images/floor.gif';
      player.increaseExperience(this.level * 50);
    }
  },
};

/* Tile Values */

// (blocking) wall
export const b = {
  type: 'wall',
  image: '/images/wall.gif',
};

// floor
export const f = {
  type: 'floor',
  image: '/images/floor.gif',
};

// health potion
export const h = {
  type: 'health potion',
  image: '/images/health_potion.gif',
  health: 10,
};
