import React from 'react';
import Tile from './Tile';
import { tileHeight } from '../../utility';


const getVisibleTiles = (map, height, width, playerY, playerX) => {
  // We don't want to display everything to the screen.
  // Only the tiles that are going to fit inside the container (width and height)
  const halfRowsOnScreen = Math.floor((height / 30) / 2);
  const halfColsOnScreen = Math.floor((width / 30) / 2);

  // The total amount of rows and cols in the levels map.
  const totalRows = map.length;
  const totalCols = map[0].length;

  // If we are able to fit 10 tiles on in the container in a given direction
  // Then we want to render half of those above the player, and the other half below.
  const startRowIndex = playerY - halfRowsOnScreen;
  const endRowIndex = playerY + halfRowsOnScreen;
  const startColIndex = playerX - halfColsOnScreen;
  const endColIndex = playerX + halfColsOnScreen;

  // Includes border conditions.
  // If we can't fit all of the tiles above or below the player,
  // Then compensate by adding additonal tiles on the opposite side.
  /*
  ** Use case: If we are able to render 10 tiles vertically
  ** and the player is at the top of the map, instead of having
  ** one tile above, and 5 tiles below (for a total of 6 tiles).
  ** Instead render 9 tiles below, so we still render 10 tiles.
  ** This keeps the level container the same size the whole time.
  */
  return {
    startRowIndex: endRowIndex < totalRows ?
                    startRowIndex : startRowIndex - (endRowIndex - totalRows),

    endRowIndex: startRowIndex >= 0 ?
                  endRowIndex : endRowIndex + Math.abs(startRowIndex),

    startColIndex: endColIndex < totalCols ?
                    startColIndex : startColIndex - (endColIndex - totalCols),

    endColIndex: startColIndex >= 0 ?
                  endColIndex : endColIndex + Math.abs(startColIndex),
  };
};


const Map = ({ map, player, height, width }) => {
  const mapReduce = getVisibleTiles(map, height, width, player.row, player.col);
  let incrementer = 0;


  return (
    <div className="gameMap" style={{ margin: 'auto', height: `${height}px`, width: `${width}px` }}>
      {map.reduce((result, row, index) => {
        if (index >= mapReduce.startRowIndex && index <= mapReduce.endRowIndex) {
          const opacity = 1 / (Math.abs(index - player.row) || 1);
          if (player.row === index) {
            result.push(
              <Row
                key={incrementer}
                row={row}
                mapReduce={mapReduce}
                player={player}
                opacity={opacity}
                playerCol={player.col}
              />,
            );
          } else {
            result.push(
              <Row
                key={incrementer}
                row={row}
                mapReduce={mapReduce}
                opacity={opacity}
                playerCol={player.col}
              />,
            );
          }
          incrementer += 1;
        }
        return result;
      }, [])}
    </div>
  );
};


Map.propTypes = {
  map: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  player: React.PropTypes.shape({
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
  }).isRequired,
};


const Row = ({ row, player, mapReduce, opacity, playerCol }) => {
  let incrementer = 0;


  return (
    <div className="gameRow" style={{ height: tileHeight }}>
      {row.reduce((result, col, index) => {
        if (index >= mapReduce.startColIndex && index <= mapReduce.endColIndex) {
          const tempOpacityVal = 1 / (Math.abs(index - playerCol) || 1);
          let colOpacity = opacity;
          if (tempOpacityVal < opacity) {
            colOpacity = tempOpacityVal;
          }
          if (player && player.col === index) {
            result.push(<Tile key={incrementer} col={col} player={player} opacity={colOpacity} />);
          } else {
            result.push(<Tile key={incrementer} col={col} opacity={colOpacity} />);
          }
          incrementer += 1;
        }
        return result;
      }, [])}
    </div>
  );
};


Row.propTypes = {
  opacity: React.PropTypes.number.isRequired,
  playerCol: React.PropTypes.number.isRequired,
  row: React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
  })).isRequired,
  mapReduce: React.PropTypes.shape({
    startRowIndex: React.PropTypes.number.isRequired,
    endRowIndex: React.PropTypes.number.isRequired,
    startColIndex: React.PropTypes.number.isRequired,
    endColIndex: React.PropTypes.number.isRequired,
  }).isRequired,
  player: React.PropTypes.shape({
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
  }),
};


Row.defaultProps = {
  player: undefined,
};


export default Map;
