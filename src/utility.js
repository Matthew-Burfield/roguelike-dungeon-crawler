import React from 'react';

// Player color isn't really relevant now that we're using an image
export const playerColor = '#FF5722';

// tileWidth and tileHeight can't really be changed now that
// we're using pixel tiles to display objects.
export const tileWidth = '30px';
export const tileHeight = '30px';

export const monster = {
  init(level, health, image) {
    this.level = level;
    this.health = health;
    this.image = `/images/${image}.gif`;
  },
  recieveDamage(player) {
    this.health -= player.attack;
    return this.isDead();
  },
  isDead() {
    return this.health > 0;
  },
  display() {
    if (this.isDead()) {
      return <img src="/images/floor.gif" alt="0" />;
    }

    return <img src={this.image} alt="10" />;
  },
};
