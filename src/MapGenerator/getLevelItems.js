import { weapon, monster, healthPotion } from '../Utility';

const getHealthPotions = (level) => {
  const numHealthPotions = 13 - (level * 3); // 10 on level 1, 7 on level 2, 4 on level 3
  const potionArray = Array(numHealthPotions);
  const potion = Object.create(healthPotion);
  potion.init((level + 10) * 1.2);
  potionArray.fill(potion);

  return potionArray;
};

const addMonstersOfLevel = (num, level) => {
  const monsterArray = [];
  for (let i = 0; i < num; i += 1) {
    const m = Object.create(monster);
    m.init(level);
    monsterArray.push(m);
  }
  return monsterArray;
};

const getMonsters = (level) => {
  const monstersArray = [];
  switch (level) {
    case 1:
      addMonstersOfLevel(10, 1);
      addMonstersOfLevel(3, 2);
      break;

    case 2:
      addMonstersOfLevel(15, 2);
      addMonstersOfLevel(10, 3);
      break;

    case 3:
      addMonstersOfLevel(20, 3);
      addMonstersOfLevel(10, 4);
      addMonstersOfLevel(5, 5);
      break;

    default:
  }

  return monstersArray;
};

const getWeapons = (level) => {
  switch (level) {
    case 1:

      return [
        Object.create(weapon).init('Wooden Sword', 1),
        Object.create(weapon).init('Dagger', 3),
      ];
    case 2:

      return [Object.create(weapon).init('Hammer', 7)];
    case 3:

      return [Object.create(weapon).init('Epic Double-Axe', 15)];
    default:

      return null;
  }
};

const getBoss = level => level;

const getLevelItems = (level) => {
  const mapItems = [];

  mapItems.push(getHealthPotions(level));

  mapItems.push(getMonsters(level));

  mapItems.push(getWeapons(level));

  mapItems.push(getBoss(level));

  return mapItems;
};

export default getLevelItems;
