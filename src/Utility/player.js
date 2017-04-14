import { DOWN, IMAGE_PATH, TYPES } from './index';

const player = {
  row: 1,
  col: 1,
  level: 1,
  currHealth: 100,
  maxHealth: 100,
  currExp: 0,
  nextLevelExp: 100,
  baseAttack: 5,
  baseDefense: 0,
  currentDirection: DOWN,
  weapon: {
    type: TYPES.WEAPON,
    name: 'none',
    image: `${IMAGE_PATH}/empty.gif`,
    attack: 0,
  },
  shield: {
    type: TYPES.SHIELD,
    name: 'none',
    image: `${IMAGE_PATH}/empty.gif`,
    defense: 0,
  },
  resetCoords() {
    this.row = 1;
    this.col = 1;
  },
  getImage() {
    if (this.isDead()) {
      return `${IMAGE_PATH}/tombstone.gif`;
    }
    return `${IMAGE_PATH}/hero/hero1-${this.currentDirection}.gif`;
  },
  attack() {
    const totalAttack = this.baseAttack + this.weapon.attack;
    return Math.floor(totalAttack * ((Math.random() * (1.1 - 0.9)) + 0.9));
  },
  defend(monsterAttack) {
    const totalDefense = this.baseDefense + this.shield.defense;
    const finalAttack = monsterAttack - totalDefense;
    return finalAttack < 0 ? 0 : finalAttack;
  },
  /* Returns false if the player has died */
  fight(monster) {
    if (!this.isDead()) {
      const dealDamage = this.attack();
      const receiveDamage = this.defend(monster.attack);
      const exp = monster.receiveDamage(dealDamage);
      this.currHealth = this.currHealth - receiveDamage < 0 ? 0 : this.currHealth - receiveDamage;
      if (!this.isDead()) {
        this.increaseExperience(exp);
      }
      console.log(`The monster received ${dealDamage} damage, and dealt ${receiveDamage} damage back to you`);
    }
  },
  increaseExperience(exp) {
    this.currExp += exp;
    if (this.currExp >= this.nextLevelExp) {
      this.levelUp(this.currExp - this.nextLevelExp);
    }
  },
  equipItem(item) {
    if (item.type === TYPES.WEAPON) {
      this.weapon = item;
    } else if (item.type === TYPES.SHIELD) {
      this.shield = item;
    } else {
      throw Error('This item cannot be equipped');
    }
  },
  consumeHealthPotion(potion) {
    this.currHealth += potion.health;
    this.currHealth = this.currHealth > this.maxHealth ? this.maxHealth : this.currHealth;
  },
  levelUp(additionalExp) {
    this.level += 1;
    this.baseAttack += 1;
    this.baseDefense += 1;
    this.maxHealth += 20;
    this.currExp = 0;
    this.nextLevelExp = Math.floor(this.nextLevelExp * 1.2);
    this.currHealth = this.maxHealth;
    this.increaseExperience(additionalExp);
  },
  isDead() {
    return this.currHealth <= 0;
  },
};

const getNewPlayer = () => Object.assign({}, player);

export default getNewPlayer;
