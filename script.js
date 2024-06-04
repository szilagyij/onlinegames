function Sodoku() {
    let container = document.getElementById('container');
    container.innerHTML = `
        <div class="instructions">
            <h2>Sudoku Játék Szabályai</h2>
            <p>A cél, hogy minden sorba, oszlopba és 3x3-as alnégyzetbe az 1-9 számokat helyezd el úgy, hogy minden szám csak egyszer szerepeljen.</p>
            <button id="checkButton">Ellenőrzés</button>
        </div>
        <div class="sudoku-board" id="sudokuBoard"></div>
    `;

    const initialBoard = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    const solutionBoard = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    
    const boardElement = document.getElementById('sudokuBoard');
    
    function createBoard() {
        initialBoard.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('sudoku-cell');
                
                if (cell !== 0) {
                    const inputElement = document.createElement('input');
                    inputElement.type = 'text';
                    inputElement.value = cell;
                    inputElement.disabled = true;
                    cellElement.appendChild(inputElement);
                } else {
                    const inputElement = document.createElement('input');
                    inputElement.type = 'text';
                    inputElement.maxLength = 1;
                    inputElement.addEventListener('input', (e) => {
                        if (!/^[1-9]$/.test(e.target.value)) {
                            e.target.value = '';
                        }
                    });
                    cellElement.appendChild(inputElement);
                }
    
                boardElement.appendChild(cellElement);
            });
        });
    }
    
    function checkBoard() {
        const cells = document.querySelectorAll('.sudoku-cell input');
        let correct = true;
    
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
    
            if (cell.disabled) {
                cell.classList.remove('correct', 'incorrect');
                return;
            }
    
            if (parseInt(cell.value) === solutionBoard[row][col]) {
                cell.classList.add('correct');
                cell.classList.remove('incorrect');
            } else {
                cell.classList.add('incorrect');
                cell.classList.remove('correct');
                correct = false;
            }
        });
    
        if (correct) {
            alert('Gratulálunk, minden szám helyes!');
        }
    }
    
    document.getElementById('checkButton').addEventListener('click', checkBoard);
    
    createBoard();
}



function Amoba(){
    let container=document.getElementById(`container`)
    container.innerHTML=""
    container.innerHTML+=`
    <h1>Amőba (Tic-Tac-Toe)</h1>
        <div id="winner" class="winner"></div>
        <div id="gameBoard" class="game-board"></div>
        <button id="resetButton" class="reset-button">Új játék</button>
    `

    const gameBoard = document.getElementById('gameBoard');
    const winnerDisplay = document.getElementById('winner');
    const resetButton = document.getElementById('resetButton');

    let board;
    let currentPlayer;
    let gameActive;

    function initializeGame() {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = 'X';
        gameActive = true;
        winnerDisplay.textContent = '';
        gameBoard.innerHTML = '';

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        if (board[row][col] !== '' || !gameActive) {
            return;
        }

        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('disabled');

        if (checkWinner()) {
            winnerDisplay.textContent = `A győztes: ${currentPlayer}`;
            gameActive = false;
            return;
        }

        if (isBoardFull()) {
            winnerDisplay.textContent = 'Döntetlen!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winConditions = [
            // Rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // Columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            // Diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

        for (const condition of winConditions) {
            if (condition[0] && condition[0] === condition[1] && condition[0] === condition[2]) {
                return true;
            }
        }

        return false;
    }

    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    resetButton.addEventListener('click', initializeGame);

    initializeGame();


}