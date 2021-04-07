import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Constants from './utilities/Constants';
import Utilities from './utilities/Utilities';
import LinkedList from './utilities/LinkedList';
import useInterval from './utilities/UseInterval';

function App() {
  const [applePosition, setApplePosition] = useState(null);
  const [snakeBody, setSnakeBody] = useState(new LinkedList(Constants.SPAWN_POSITION));
  const [snakeDirection, setSnakeDirection] = useState(Constants.DIRECTION_RIGHT);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      const newDirection = Utilities.getDirectionFromKey(e.key);
      if (newDirection) {
        setSnakeDirection((oldDirection) => {
          if (!Utilities.areDirectionsOppositeFromEachOther(oldDirection, newDirection)) {
            return newDirection;
          } else {
            return oldDirection;
          }
        });
      }
    });
  }, []);

  useInterval(() => {
    Utilities.moveSnake(setSnakeBody, snakeDirection, applePosition, setApplePosition);
  }, Constants.REFRESH_RATE);

  useEffect(() => {
    if (!applePosition) {
      setApplePosition(() => {
        return Utilities.getRandomApplePosition(snakeBody);
      });
    }
  }, [applePosition]);

  return <>
    <GameBoard boardSize={Constants.GAME_BOARD_SIZE} snake={snakeBody} applePosition={applePosition} />
  </>
}

export default App;
