document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const newGameButton = document.getElementById('new-game');
    const resetScoreButton = document.getElementById('reset-score');
    const scoreXDisplay = document.getElementById('score-x');
    const scoreODisplay = document.getElementById('score-o');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scoreX = 0;
    let scoreO = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const setStatusMessage = (message) => {
        statusDisplay.textContent = message;
    };

    const winningMessage = () => {
        return `Player ${currentPlayer} has won!`;
    };

    const drawMessage = () => {
        return `Game ended in a draw!`;
    };

    const currentPlayerTurn = () => {
        return `Player ${currentPlayer}'s turn`;
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        if (checkWin()) {
            gameActive = false;
            setStatusMessage(winningMessage());
            if (currentPlayer === 'X') {
                scoreX++;
                scoreXDisplay.textContent = scoreX;
            } else {
                scoreO++;
                scoreODisplay.textContent = scoreO;
            }
            return;
        }

        if (checkDraw()) {
            return;
        }

        swapPlayer();
        setStatusMessage(currentPlayerTurn());
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return gameState[condition[0]] && 
                   gameState[condition[0]] === gameState[condition[1]] && 
                   gameState[condition[0]] === gameState[condition[2]];
        });
    };

    const checkDraw = () => {
        return gameState.includes('') ? false : true;
    };

    const swapPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const handleNewGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        setStatusMessage(currentPlayerTurn());
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x');
            cell.classList.remove('o');
        });
    };

    const handleResetScore = () => {
        scoreX = 0;
        scoreO = 0;
        scoreXDisplay.textContent = scoreX;
        scoreODisplay.textContent = scoreO;
        handleNewGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    newGameButton.addEventListener('click', handleNewGame);
    resetScoreButton.addEventListener('click', handleResetScore);

    setStatusMessage(currentPlayerTurn());
});
