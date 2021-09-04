const { mazeTwo } = require("./mazes");
// directions used in the maze / how the bits are defined
// const UP = 1;
// const RIGHT = 2;
// const DOWN = 4;
// const LEFT = 8;

// const testCell = 3;

// // here's how you can check for walls/openings
// // console.log((testCell & UP) !== 0 ? "you can go up" : "wall above");
// // console.log(
// //   (testCell & RIGHT) !== 0 ? "you can go right" : "wall to the right"
// // );
// // console.log((testCell & DOWN) !== 0 ? "you can go down" : "wall below");
// // console.log((testCell & LEFT) !== 0 ? "you can go left" : "wall to the left");

const getMoves = (testCell, current) => {
  const UP = 1;
  const RIGHT = 2;
  const DOWN = 4;
  const LEFT = 8;
  const { row, col } = current;
  const moves = [];
  if ((testCell & UP) !== 0) {
    moves.push({ row: row - 1, col });
  }
  if ((testCell & RIGHT) !== 0) {
    moves.push({ row: row, col: col + 1 });
  }
  if ((testCell & DOWN) !== 0) {
    moves.push({ row: row + 1, col });
  }
  if ((testCell & LEFT) !== 0) {
    moves.push({ row: row, col: col - 1 });
  }
  return moves;
};

const evalMoves = (maze) => {
  const { start, end, rowsAndColumns } = maze;
  const queue = [{ current: start, movesSoFar: [] }];
  const alreadyTested = [];
  // iterate until queue is empty
  while (queue.length > 0) {
    // take first from queue
    const { current, movesSoFar } = queue.shift();
    console.log(`testing ${JSON.stringify(current)}`);
    // have we gotten to the end? early return;
    if (current.row === end.row && current.col === end.col) {
      movesSoFar.push(current);
      console.log(`result: ${JSON.stringify(movesSoFar)}`);
      return;
    }
    // is the cell we plucked already among the cells we tested?
    if (
      alreadyTested.filter(
        (tested) => tested.row === current.row && tested.col === current.col
      ).length > 0
    ) {
      return null;
    }
    // get test cell value
    const testCell = rowsAndColumns[current.row][current.col];
    // get array of potential next cells (moves)
    const moves = getMoves(testCell, current);
    // only add cells we haven't evaluated to queue
    moves.forEach((move) => {
      if (
        alreadyTested.filter(
          (tested) => tested.row === move.row && tested.col === move.col
        ).length > 0
      ) {
        return null;
      } else {
        // add potential move and map to get there to queue
        queue.push({
          current: move,
          movesSoFar: [...movesSoFar, current],
        });
      }
    });
    // add current cell we just tested to alreadyTested list
    // hopefully this doesnt get unmanageably large for big mazes.
    alreadyTested.push(current);
  }
};

evalMoves(mazeTwo);