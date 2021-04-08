import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import PlayGameButton from './components/PlayGameButton';
import Constants from './utilities/Constants';
import Utilities from './utilities/Utilities';
import LinkedList from './utilities/LinkedList';
import useInterval from './utilities/UseInterval';

function App() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(-1);
  const [snakeBody, setSnakeBody] = useState(new LinkedList(Constants.SPAWN_POSITION));
  const [snakeDirection, setSnakeDirection] = useState(Constants.DIRECTION_RIGHT);
  const [applePosition, setApplePosition] = useState(Utilities.getNewApplePosition(snakeBody));

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === ' ' && !isGameActive) {
        setIsGameActive(true);
      } else {
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
      }
    });
  }, []);

  useInterval(() => {
    if (isGameActive) {
      Utilities.moveSnake(setSnakeBody, snakeDirection, applePosition, setApplePosition);
    }
  }, Constants.REFRESH_RATE);

  useEffect(() => {
    setScore(oldScore => oldScore + 1);
  }, [applePosition]);

  const startGame = () => {
    setIsGameActive(true);
  };

  return <div style={{textAlign: 'center', color: 'white'}}>
    {score >= 0 ? (<h1>Score: {score}</h1>) : null}

    {isGameActive ? null : <PlayGameButton isGameActive={isGameActive} startGame={startGame} />}
    <GameBoard boardSize={Constants.GAME_BOARD_SIZE} snake={snakeBody} applePosition={applePosition} />
  </div>
}

export default App;
