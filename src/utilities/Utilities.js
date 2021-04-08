import Constants from './Constants';
import LinkedList from './LinkedList';

const Utilities = {
  doesSnakeBodyContainPosition: (snakeBody, position) => {
    let curNode = snakeBody.head;

    while (curNode) {
      let value = curNode.value;
      if (value[0] === position[0] && value[1] === position[1]) {
        return true;
      } else {
        curNode = curNode.next;
      }
    }

    return false;
  },
  isValidPosition: (row, col) => {
    let size = Constants.GAME_BOARD_SIZE - 1; //because 0 indexing
    return (
      col >= 0 && col <= size
      &&
      row >= 0 && row <= size
    );
  },
  getNextPosition: (position, direction) => {
    let newPosition = [...position];
    if (direction === Constants.DIRECTION_UP) {
      newPosition[0]--;
    } else if (direction === Constants.DIRECTION_DOWN) {
      newPosition[0]++;
    } else if (direction === Constants.DIRECTION_LEFT) {
      newPosition[1]--;
    } else if (direction === Constants.DIRECTION_RIGHT) {
      newPosition[1]++;
    }

    return newPosition;
  },
  copySnake: (snake) => {
    let newSnake = new LinkedList();

    let node = snake.head;
    while (node) {
      newSnake.addToBack(node.value);
      node = node.next;
    }

    return newSnake;
  },
  moveSnake: (setSnake, direction, applePosition, setApplePosition) => {
    setSnake((snake) => {
      let newSnake = Utilities.copySnake(snake);

      let newPosition = Utilities.getNextPosition(newSnake.head.value, direction);
      if (Utilities.isValidPosition(newPosition[0], newPosition[1])) {
        newSnake.addToFront(newPosition);

        if (Utilities.isAppleAtPosition(newPosition, applePosition)) {
          Utilities.generateNewApple(newSnake, setApplePosition);
        } else {
          newSnake.dropFromBack();
        }
      }

      return newSnake;
    });
  },
  getDirectionFromKey: (key) => {
    const map = {
      'ArrowLeft': Constants.DIRECTION_LEFT,
      'ArrowUp': Constants.DIRECTION_UP,
      'ArrowRight': Constants.DIRECTION_RIGHT,
      'ArrowDown': Constants.DIRECTION_DOWN
    };

    return map[key] || null;
  },
  areDirectionsOppositeFromEachOther: (dir1, dir2) => {
    const map = {
      [Constants.DIRECTION_LEFT]: Constants.DIRECTION_RIGHT,
      [Constants.DIRECTION_UP]: Constants.DIRECTION_DOWN,
      [Constants.DIRECTION_RIGHT]: Constants.DIRECTION_LEFT,
      [Constants.DIRECTION_DOWN]: Constants.DIRECTION_UP
    };

    return map[dir1] === dir2;
  },
  getRandomIntInRange: (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomBoardPosition: () => {
    let boardSize = Constants.GAME_BOARD_SIZE;

    return [
      Utilities.getRandomIntInRange(0, boardSize),
      Utilities.getRandomIntInRange(0, boardSize),
    ];
  },
  getNewApplePosition: (snakeBody) => {
    while (true) {
      let position = Utilities.getRandomBoardPosition();
      if (!Utilities.doesSnakeBodyContainPosition(snakeBody, position)) {
        return position;
      }
    }
  },
  isAppleAtPosition: (position, applePosition) => {
    return applePosition && applePosition[0] === position[0] && applePosition[1] === position[1];
  },
  generateNewApple: (snakeBody, setApplePosition) => {
    setApplePosition(Utilities.getNewApplePosition(snakeBody));
  }
};

export default Utilities;
