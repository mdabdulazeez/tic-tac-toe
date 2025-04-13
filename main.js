const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const startGameBtn = document.getElementById('start-game');
const backBtn = document.getElementById('back-btn');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell)) {
        status.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && 
               gameBoard[a] === gameBoard[b] && 
               gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

startGameBtn.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    resetGame();
});

backBtn.addEventListener('click', () => {
    homeScreen.style.display = 'block';
    gameScreen.style.display = 'none';
});

resetBtn.addEventListener('click', resetGame);

// Initialize status
status.textContent = `Player ${currentPlayer}'s turn`;
