import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Constants from './utilities/Constants';
import Utilities from './utilities/Utilities';
import LinkedList from './utilities/LinkedList';

function App() {
  const [board, setBoard] = useState(Utilities.createEmptyGameboard());
  const [snakeBody, setSnakeBody] = useState(new LinkedList(Constants.SPAWN_POSITION));
  const [snakeDirection, setSnakeDirection] = useState(Constants.DIRECTION_RIGHT);

  useEffect(() => {
    const interval = setInterval(() => {
      let newSnakeBody = Utilities.moveSnake(snakeBody, snakeDirection);
      console.log('Old head:', snakeBody.head.value);
      console.log('New head:', newSnakeBody.head.value);
      setSnakeBody(newSnakeBody);
    }, Constants.REFRESH_RATE);

    return () => clearInterval(interval);
  }, []);

  return <>
    <GameBoard board={board} snake={snakeBody} />
  </>
}

export default App;
