const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const errorMessagesDiv = document.getElementById('errorMessages');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => {
      if (value === '' && !checkWinner()) {
        cells[index] = currentPlayer;
        renderBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    });
    board.appendChild(cell);
  });
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      alert(`Player ${cells[a]} wins!`);
      resetGame();
      return true;
    }
  }

  if (!cells.includes('')) {
    errorMessage("It's a draw!");
    resetGame();
    return true;
  }

  return false;
}

function resetGame() {
  currentPlayer = 'X';
  cells = ['', '', '', '', '', '', '', '', ''];
  renderBoard();
  clearErrors();
}

function errorMessage(message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessagesDiv.appendChild(errorMessage);
}

function clearErrors() {
  errorMessagesDiv.innerHTML = '';
}

resetBtn.addEventListener('click', resetGame);

renderBoard();
