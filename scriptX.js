const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    message.textContent = `It is turn ${currentPlayer}`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes(null) ? null : 'Draw';
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;
    if (!gameActive || gameState[index]) {
        return;
    }
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        endGame(winner);
    } else {
        switchPlayer();
    }
}

function endGame(winner) {
    gameActive = false;
    if (winner === 'Draw') {
        message.textContent = 'Draw!';
    } else {
        message.textContent = `${winner} is win!`;
    }
}

function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = 'It is player X  turn.';
    message.className = 'alert alert-info';
    createBoard();
}

createBoard();
