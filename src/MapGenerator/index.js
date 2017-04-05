import NewDungeon from 'random-dungeon-generator';
import { b, f } from '../Utility';


/**
 * Returns a random number between min and max
 *
 * @param {number} min minimum random number to return
 * @param {number} max maximum random number to return
 * @returns {number}
 */
function randomIndexBetweenValues(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}


const getMap = () => NewDungeon({ maxRoomSize: 15 });

const generateMap = () => {
  /* eslint-disable no-confusing-arrow */
  const map = getMap().map(row => row.map(col => col === 1 ? b : f));
  /* eslint-enable no-confusing-arrow */

  const mapItems = getLevelItems(level);

  while (mapItems.length > 0) {
    const randomRow = randomIndexBetweenValues(1, map.length - 2);
    const randomCol = randomIndexBetweenValues(1, map[0].length - 2);
    if (map[randomRow][randomCol] !== b) {
      map[randomRow][randomCol] = mapItems.pop();
    }
  }

  return map;
};


export default generateMap;
