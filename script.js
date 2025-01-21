const boardSize = 9;
const sudokuBoard = document.getElementById("sudoku-board");

// Generates a random number between 1 and 9
const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;

// Generates a random position in the grid (0 to 8 for both row and column)
const getRandomPosition = () => ({
  row: Math.floor(Math.random() * boardSize),
  col: Math.floor(Math.random() * boardSize),
});

// Function to fill the board with random numbers (60 pre-filled)
const fillBoardWithRandomDigits = () => {
  const filledCells = new Set();
  let filledCount = 0;

  while (filledCount < 60) {
    const { row, col } = getRandomPosition();
    const cellId = `${row}-${col}`;
    
    if (!filledCells.has(cellId)) {
      const randomValue = getRandomNumber();
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.value = randomValue;
      cell.disabled = true; // Disable input in pre-filled cells
      filledCells.add(cellId);
      filledCount++;
    }
  }
};

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

// Function to clear the board and make all cells editable again
const clearBoard = () => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.value = '';
    cell.disabled = false; // Re-enable input for all cells
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

// Initialize the board and fill 60 random cells
generateBoard();
fillBoardWithRandomDigits();
