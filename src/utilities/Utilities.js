import Constants from './Constants';
import LinkedList from './LinkedList';

const Utilities = {
  createEmptyGameboard: () => {
    const size = Constants.GAME_BOARD_SIZE;
    let board = new Array(size).fill(0).map(row => new Array(size).fill(0));

    return board;
  },
  doesSnakeBodyContainPosition: (snakeBody, row, col) => {
    let curNode = snakeBody.head;

    while (curNode) {
      let value = curNode.value;
      if (value[0] === row && value[1] === col) {
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
  moveSnake: (snake, direction) => {
    let newSnake = Utilities.copySnake(snake);

    let newPosition = Utilities.getNextPosition(newSnake.head.value, direction);
    if (Utilities.isValidPosition(newPosition[0], newPosition[1])) {
      newSnake.addToFront(newPosition);
      snake.dropFromBack();
    }

    return newSnake;
  }
};

export default Utilities;
