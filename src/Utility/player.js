import { DOWN, IMAGE_PATH } from './index';

const player = {
  row: 1,
  col: 1,
  level: 1,
  currHealth: 100,
  maxHealth: 100,
  currExp: 0,
  nextLevelExp: 100,
  baseAttack: 1,
  defense: 0,
  currentDirection: DOWN,
  weapon: {
    type: 'weapon',
    name: 'none',
    image: `${IMAGE_PATH}/empty.gif`,
    attack: 0,
  },
  shield: {
    type: 'shield',
    name: 'none',
    image: `${IMAGE_PATH}/empty.gif`,
    defense: 0,
  },
  getImage() {
    return `${IMAGE_PATH}/hero/hero1-${this.currentDirection}.gif`;
  },
  attack() {
    const totalAttack = this.baseAttack + this.weapon.attack;
    return Math.floor(totalAttack * ((Math.random() * (1.1 - 0.9)) + 0.9));
  },
  /* Returns false if the player has died */
  fight(monster) {
    if (this.currHealth > 0) {
      monster.receiveDamage(this);
      this.currHealth -= monster.attack;
      if (this.currHealth < 0) {
        this.currHealth = 0;
      }
    }
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
  isDead() {
    return this.currHealth <= 0;
  },
};

const getNewPlayer = () => Object.create(player);

export default getNewPlayer;
