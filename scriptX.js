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
    if (currentPlayer === 'X') {
        currentPlayer = '0';
    } else {
        currentPlayer = 'X';
    }
    message.textContent = `It is turn ${currentPlayer}`;
}

function generateWinningCombinations() {
    const combinations = [];
    for (let i = 0; i < 9; i += 3) {
        combinations.push([i, i + 1, i + 2]);
    }
    for (let i = 0; i < 3; ++i) {
        combinations.push([i, i + 3, i + 6]);
    }
    combinations.push([0, 4, 8]);
    combinations.push([2, 4, 6]);
    return combinations;
}

const winningCombinations = generateWinningCombinations();

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    for (let i = 0; i < gameState.length; ++i) {
        if (gameState[i] === null) {
            return null;
        }
    }
    return 'Draw';
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
    message.textContent = 'It is player X turn.';
    message.className = 'alert alert-info';
    createBoard();
}

createBoard();
