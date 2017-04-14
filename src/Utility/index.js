// tileWidth and tileHeight can't really be changed now that
// we're using pixel tiles to display objects.
export const TILE_WIDTH = '30px';
export const TILE_HEIGHT = '30px';

export const GAME_STATE_PLAYING = 'PLAYING';
export const GAME_STATE_START_MENU = 'START_MENU';
export const GAME_STATE_START_MENU_TRANSITION = 'START_MENU_TRANSITION';
export const GAME_STATE_WIN = 'WIN';
export const GAME_STATE_DEATH = 'DEATH';

export const CONTAINER_WIDTH = 330;
export const CONTAINER_HEIGHT = 330;

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const IMAGE_PATH = 'images';
export const FLOOR_TILE_IMAGE = `${IMAGE_PATH}/floor.gif`;

export const LEVEL_UP_SEQUENCE_LENGTH = 5;

export const TYPES = {
  WEAPON: 'weapon',
  SHIELD: 'shield',
  HEALTH_POTION: 'health potion',
  WALL: 'wall',
  MONSTER: 'monster',
  BOSS: 'boss',
  STAIRWELL: 'stairwell',
};

// Generic object for monsters and bosses
const badGuy = {
  exp: 0,
  receiveDamage(playerAttackDamage) {
    if (!this.isDead()) {
      this.currentHealth -= playerAttackDamage;
      if (this.isDead()) {
        this.image = 'images/empty.gif';
        return this.exp;
      }
    }
    return 0;
  },
  isDead() {
    return this.currentHealth <= 0;
  },
};

const getImagePath = (name, type) => {
  const imageName = name.toLowerCase().replace(/\s/g, '_');
  return `${IMAGE_PATH}/${type}/${imageName}.gif`;
};

export const monster = Object.create(badGuy);
monster.type = TYPES.MONSTER;
monster.init = function init(name, level, health, attack, exp) {
  const image = getImagePath(name, this.type);
  this.name = name;
  this.level = level;
  this.totalHealth = health;
  this.currentHealth = health;
  this.image = image;
  this.attack = attack;
  this.exp = exp;
};

export const boss = Object.create(badGuy);
boss.type = TYPES.BOSS;
boss.init = function init(name, level, health, attack, exp) {
  const image = getImagePath(name, this.type);
  this.name = name;
  this.level = level;
  this.totalHealth = health;
  this.currentHealth = health;
  this.image = image;
  this.attack = attack;
  this.exp = exp;
};

export const weapon = {
  type: TYPES.WEAPON,
  init(name, attackValue) {
    const image = getImagePath(name, this.type);
    this.name = name;
    this.image = image;
    this.attack = attackValue;
  },
};

export const shield = {
  type: TYPES.SHIELD,
  init(name, defenseValue) {
    const image = getImagePath(name, this.type);
    this.name = name;
    this.image = image;
    this.defense = defenseValue;
  },
};

// health potion
export const healthPotion = {
  type: TYPES.HEALTH_POTION,
  image: `${IMAGE_PATH}/consumable/health_potion.gif`,
  init(health) {
    this.health = health;
  },
};

/* Tile Values */

// (blocking) wall
export const wall = {
  type: TYPES.WALL,
  init(dungeonLevel) {
    this.image = `${IMAGE_PATH}/wall${dungeonLevel}.gif`;
  },
};

// floor
export const floor = {};

export const stairwell = {
  type: TYPES.STAIRWELL,
  image: `${IMAGE_PATH}/stairwell.gif`,
};

const preloadImages = () => {
  const images = [
    `${IMAGE_PATH}/stairwell.gif`,
    `${IMAGE_PATH}/wall1.gif`,
    `${IMAGE_PATH}/wall2.gif`,
    `${IMAGE_PATH}/wall3.gif`,
    `${IMAGE_PATH}/consumable/health_potion.gif`,
    `${IMAGE_PATH}/tombstone.gif`,
    `${IMAGE_PATH}/stairwell.gif`,
    `${IMAGE_PATH}/weapon/dagger.gif`,
    `${IMAGE_PATH}/weapon/epic_double-axe.gif`,
    `${IMAGE_PATH}/weapon/hammer.gif`,
    `${IMAGE_PATH}/weapon/wooden_sword.gif`,
    `${IMAGE_PATH}/shield/epic_shield.gif`,
    `${IMAGE_PATH}/shield/large_shield.gif`,
    `${IMAGE_PATH}/shield/small_shield.gif`,
    `${IMAGE_PATH}/monster/crazed_devil_bat.gif`,
    `${IMAGE_PATH}/monster/evil_elf.gif`,
    `${IMAGE_PATH}/monster/grimer.gif`,
    `${IMAGE_PATH}/monster/mini_grim.gif`,
    `${IMAGE_PATH}/monster/vampire_bat.gif`,
    `${IMAGE_PATH}/hero/hero1-DOWN.gif`,
    `${IMAGE_PATH}/hero/hero1-LEFT.gif`,
    `${IMAGE_PATH}/hero/hero1-RIGHT.gif`,
    `${IMAGE_PATH}/hero/hero1-UP.gif`,
    `${IMAGE_PATH}/boss/giant_fish.gif`,
    `${IMAGE_PATH}/boss/giant_phoenix.gif`,
    `${IMAGE_PATH}/boss/giant_snake.gif`,
  ];

  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
};

preloadImages();
