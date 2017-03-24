// Player color isn't really relevant now that we're using an image
export const playerColor = '#FF5722';

// tileWidth and tileHeight can't really be changed now that
// we're using pixel tiles to display objects.
export const tileWidth = '30px';
export const tileHeight = '30px';

export const monster = {
  init(level, health) {
    this.level = level;
    this.health = health;
    this.image = `/images/monster_${level}.gif`;
    this.name = 'monster';
    this.isAlive = true;
    this.attack = level * health;
  },
  recieveDamage(player) {
    if (this.isAlive) {
      this.health -= player.attack;
      this.isDead();
    }
  },
  isDead() {
    if (this.health <= 0) {
      this.isAlive = false;
      this.image = '/images/floor.gif';
    }
  },
};

/* Tile Values */

// (blocking) wall
export const b = {
  name: 'wall',
  image: '/images/wall.gif',
};

// floor
export const f = {
  name: 'floor',
  image: '/images/floor.gif',
};

// health potion
export const h = {
  name: 'health potion',
  image: '/images/health_potion.gif',
  health: 10,
};
