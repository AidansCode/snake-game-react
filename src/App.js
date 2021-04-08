import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import PlayGameButton from './components/PlayGameButton';
import DisplayMessage from './components/DisplayMessage';
import Constants from './utilities/Constants';
import Utilities from './utilities/Utilities';
import LinkedList from './utilities/LinkedList';
import useInterval from './utilities/UseInterval';

function App() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(-1);
  const [snakeBody, setSnakeBody] = useState(new LinkedList(Constants.SPAWN_POSITION));
  const [snakeDirection, setSnakeDirection] = useState(Constants.DIRECTION_RIGHT);
  const [applePosition, setApplePosition] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === ' ') { //if pressed spacebar
        restartGame();
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
      Utilities.moveSnake(setSnakeBody, snakeDirection, applePosition, setApplePosition, endGame);
    }
  }, Constants.REFRESH_RATE);

  useEffect(() => {
    setScore(oldScore => oldScore + 1);
  }, [applePosition]);

  const restartGame = () => {
    setMessage(null);
    setScore(0);
    setSnakeBody(new LinkedList(Constants.SPAWN_POSITION));
    setSnakeDirection(Constants.DIRECTION_RIGHT);
    setApplePosition(Utilities.getNewApplePosition(snakeBody));
    setIsGameActive(true);
  };

  const endGame = () => {
    setIsGameActive(false);
    setMessage('You lost! Final score: ' + score);
  };

  return <div style={{textAlign: 'center', color: 'white'}}>
    {score >= 0 ? (<h1>Score: {score}</h1>) : null}

    <DisplayMessage text={message} color='red' />
    {isGameActive ? null : <PlayGameButton isGameActive={isGameActive} startGame={restartGame} />}
    <GameBoard boardSize={Constants.GAME_BOARD_SIZE} snake={snakeBody} applePosition={applePosition} />
  </div>
}

export default App;
