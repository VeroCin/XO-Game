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
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(i + j);
        }
        combinations.push(row);
    }
    for (let i = 0; i < 3; i++) {
        const column = [];
        for (let j = 0; j < 3; j++) {
            column.push(i + j * 3);
        }
        combinations.push(column);
    }
    const diagonal1 = [];
    for (let i = 0; i < 9; i += 4) {
        diagonal1.push(i);
    }
    combinations.push(diagonal1);
    const diagonal2 = [];
    for (let i = 2; i < 7; i += 2) {
        diagonal2.push(i);
    }
    combinations.push(diagonal2);
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
    for (let i = 0; i < gameState.length; i++) {
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
    message.textContent = 'It is player X  turn.';
    message.className = 'alert alert-info';
    createBoard();
}

createBoard();
