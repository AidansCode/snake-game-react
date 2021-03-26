import React from 'react';
import Utilities from '../utilities/Utilities';

function GameBoard({ board, snake }) {

  function getCellClass(row, col) {
    let classes = 'cell';

    if (Utilities.doesSnakeBodyContainPosition(snake, row, col)) {
      classes += ' cell-snake';
    }

    return classes;
  }

  return <table className="game-board">
    <tbody>
      {board.map((row, rowId) => {
        return <tr className="row" key={rowId}>
          {row.map((cell, colId) => {
            return <td className={getCellClass(rowId, colId)} key={rowId + '-' + colId}></td>
          })}
        </tr>
      })}
    </tbody>
  </table>
}

export default GameBoard;
