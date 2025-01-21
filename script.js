const boardSize = 9;
const sudokuBoard = document.getElementById("sudoku-board");

const generateBoard = () => {
  sudokuBoard.innerHTML = '';
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("input");
      cell.type = "number";
      cell.max = 9;
      cell.min = 1;
      cell.className = "cell";
      cell.id = `cell-${row}-${col}`;
      sudokuBoard.appendChild(cell);
    }
  }
};

const clearBoard = () => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.value = '';
  });
};

const solveSudoku = () => {
  const board = getBoardValues();
  if (solve(board)) {
    setBoardValues(board);
  } else {
    alert("No solution found!");
  }
};

const getBoardValues = () => {
  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const rowValues = [];
    for (let col = 0; col < boardSize; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      rowValues.push(cell.value ? parseInt(cell.value) : 0);
    }
    board.push(rowValues);
  }
  return board;
};

const setBoardValues = (board) => {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.value = board[row][col] ? board[row][col] : '';
    }
  }
};

const isValid = (board, row, col, num) => {
  for (let i = 0; i < boardSize; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
};

const solve = (board) => {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Event Listeners
document.getElementById('solve-btn').addEventListener('click', solveSudoku);
document.getElementById('clear-btn').addEventListener('click', clearBoard);

// Initialize the board
generateBoard();
