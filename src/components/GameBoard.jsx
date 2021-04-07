import React from 'react';
import Utilities from '../utilities/Utilities';

function GameBoard({ boardSize, snake, applePosition }) {

  function getCellClass(row, col) {
    let position = [row, col];
    let classes = 'cell';

    if (Utilities.doesSnakeBodyContainPosition(snake, position)) {
      classes += ' cell-snake';
    } else if (Utilities.isAppleAtPosition(position, applePosition)) {
      classes += ' cell-apple';
    }

    return classes;
  }

  return <table className="game-board">
    <tbody>
      {[...Array(boardSize)].map((e, rowId) => {
        return <tr className="row" key={rowId}>
          {[...Array(boardSize)].map((e, colId) => {
            return <td className={getCellClass(rowId, colId)} key={rowId + '-' + colId}></td>
          })}
        </tr>
      })}
    </tbody>
  </table>
}

export default GameBoard;
