import React from 'react';

function PlayGameButton({ isGameActive, startGame }) {
  return isGameActive ? null : (
    <button style={{marginBottom: '2vh'}} onClick={startGame}>
      Start Game! (Press Space)
    </button>
  );
}

export default PlayGameButton;
