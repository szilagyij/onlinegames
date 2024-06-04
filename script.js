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



function Uno(){

    document.getElementById(`container`).innerHTML=""
    document.getElementById(`container`).innerHTML+=`
    <h1 id="jelenlegi"></h1>
    <div class="mainboard" id="mainboard">
            
            <div class="insideboard" id="insideboard">
                <img src="table.png" alt="" class="asztal">
                <div class="pickup" id="pickup">
                    <img src="pickupcard.png" alt="pickupcard" class="img-fluid pickupcard">
                </div>
                <div class="current" id="current">
                    
                </div>
            </div>
            <div class="popup" id="popup">
                <p>Melyik legyen?</p>
                <div class="red color-box" id="red" style="background-color: red;"></div>
                <div class="green color-box" id="green" style="background-color: green;"></div>
                <div class="blue color-box" id="blue" style="background-color: blue;"></div>
                <div class="yellow color-box" id="yellow" style="background-color: yellow;"></div>
            </div>
            <div class="player1" id="player1">
    
            </div>
    
            <div class="player2" id="player2">
    
            </div>
    
            <div class="player3" id="player3">
    
            </div>
    
            <div class="player4" id="player4">
    
            </div>
    
        </div>
    `
    const unoKartyak = [
        "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9",
        "r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9",
        "g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9",
        "y0", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9",
        "bs", "rs", "gs", "ys", // Színváltó kártyák 
        "bp", "rp", "gp", "yp", // Kihagyó kártyák
        "bd", "rd", "gd", "yd", // Kettős húzás kártyák
        "bf", "rf", "gf", "yf",// Négyszeres húzás kártyák
        "br", "rr", "gr", "yr" //reverse, visszafordító
    ];
    
    
    let player1cards = [];
    let player2cards = [];
    let player3cards = [];
    let player4cards = [];
    let currentmove="player1"
    let nextmove="player2"
    let pluscard=false;
    let selectedcolor="none";
    let alreadyblocked=false;
    let reversed=false;
    
    let jelenlegi =document.getElementById(`jelenlegi`);
    document.getElementById('pickup').addEventListener('click', function() {
        let rnd = Math.floor(Math.random() * unoKartyak.length);
        let currentCards = eval(`${currentmove}cards`);
        currentCards.push(unoKartyak[rnd]);
        showcard(); 
    });
    
    function winner(gamewinner){
        alert(`A játék győztese:${gamewinner}`)
    }
    
    function filltombs() {
        randomcardgen(player1cards);
        randomcardgen(player2cards);
        randomcardgen(player3cards);
        randomcardgen(player4cards);
    }
    
    
    
        function randomcardgen(name) {
            for (let i = 0; i < 7; i++) {
                let rnd = Math.floor(Math.random() * unoKartyak.length);
                name.push(unoKartyak[rnd]);
            }
        }
        
        function starter(){
            let startercard=Math.floor(Math.random() * unoKartyak.length);
            document.getElementById('current').innerHTML = `<img id="currentCard" src="cards/${unoKartyak[startercard]}.png" alt="pickupcard" class="img-fluid pickupcard">`;
        }
    
        function openPopup() {
            document.getElementById("popup").style.visibility = "visible";
        }
        function closePopup() {
            document.getElementById("popup").style.visibility = "hidden";
        }
        
        
    
        document.getElementById(`popup`).addEventListener('click', function(event) {
            selectedcolor="none"
            if (event.target.classList.contains('color-box')) {
                selectedcolor = event.target.style.backgroundColor;
                closePopup();
            }
        });
    
    const container=document.getElementById(`player1`)
    
    function mindenegben(event,i,player,nextplayer,lastplayer){
        let currentCard = document.getElementById('currentCard');
        let clickedCardUrl = event.target.src;
      
                if (currentCard.src.split('/')[4][1]=='p' &! alreadyblocked) {
                    alreadyblocked=true
                    currentmove=nextplayer
                    alert("Blokkolva")
                    showcard()
                }
                else{
                    alreadyblocked=false
                    showcard()
                }
    
                if (clickedCardUrl.split('/')[4][1]=='r') 
                {
                    if (reversed) {
                        reversed=false
                    }
                    else{
                        reversed=true
                    }
                }
    
        
                if (clickedCardUrl.split('/')[4][1]=='s' || clickedCardUrl.split('/')[4][1]=='f') {
                    openPopup();
                }
        if (selectedcolor=="none" &! alreadyblocked) {       //nincs szín kérve, nemvagyunk blokkolva
    
                    if (clickedCardUrl.split('/')[4][1]=='r') 
                    {
                        if (reversed) {
                            currentmove=lastplayer
                        }
                        else{
                            currentmove=nextmove
                        }
                        if (reversed) {
                            let indexToRemove = player.indexOf(player[i]);
                            if (indexToRemove !== -1) {
                                    player.splice(indexToRemove, 1);      
                                    console.log(`A kártyát eltávolítottuk a ${currentmove} kártyáiból.`);;
                                    document.getElementById(`currentCard`).src = clickedCardUrl; 
                                    if (player.length==0) {
                                        winner(currentmove)
                                        location.reload();
                                    }
                                    else{
                                        currentmove=lastplayer         
                                        showcard();
                                    }
                                }
                        }    
                        else{                 
                            let indexToRemove = player.indexOf(player[i]);
                            if (indexToRemove !== -1) {
                                    player.splice(indexToRemove, 1);      
                                    console.log(`A kártyát eltávolítottuk a ${currentmove} kártyáiból.`);
                                    document.getElementById(`currentCard`).src = clickedCardUrl; 
                                    if (player.length==0) {
                                        winner(currentmove)
                                        location.reload();
                                    }
                                    else{
                                        currentmove=nextmove
                                        showcard();
                                    }
                                }
                            }
                        
                    }
                    else{
                        if (reversed) {
                            if (currentCard.src.split('/')[4][0] === clickedCardUrl.split('/')[4][0] || currentCard.src.split('/')[4][1] === clickedCardUrl.split('/')[4][1]|| clickedCardUrl.split('/')[4][1]=='r' ||  clickedCardUrl.split('/')[4][1]=='d' || clickedCardUrl.split('/')[4][1]=='f' || clickedCardUrl.split('/')[4][1]=='p' || clickedCardUrl.split('/')[4][1]=='s') {
                                let indexToRemove = player.indexOf(player[i]);
                                if (indexToRemove !== -1) {
                                        player.splice(indexToRemove, 1);
                                        if (clickedCardUrl.split('/')[4][1]=='f' || clickedCardUrl.split('/')[4][1]=='d') {
                                            pluscard=true
                                        }
                                        console.log(`A kártyát eltávolítottuk a ${currentmove} kártyáiból.`);
                                        document.getElementById(`currentCard`).src = clickedCardUrl; 
                                        if (player.length==0) {
                                            winner(currentmove)
                                            location.reload();
                                        }
                                        else{
                                            currentmove=lastplayer
                                            showcard();
                                        }
                                    }             
                                } 
                            else {
                                alert("A kártya nem lerakható")
                            }
                        }
                        else
                        {
                            if (currentCard.src.split('/')[4][0] === clickedCardUrl.split('/')[4][0] || currentCard.src.split('/')[4][1] === clickedCardUrl.split('/')[4][1]|| clickedCardUrl.split('/')[4][1]=='r' ||  clickedCardUrl.split('/')[4][1]=='d' || clickedCardUrl.split('/')[4][1]=='f' || clickedCardUrl.split('/')[4][1]=='p' || clickedCardUrl.split('/')[4][1]=='s') {
                                let indexToRemove = player.indexOf(player[i]);
                                if (indexToRemove !== -1) {
                                        player.splice(indexToRemove, 1);
                                        if (clickedCardUrl.split('/')[4][1]=='f' || clickedCardUrl.split('/')[4][1]=='d') {
                                            pluscard=true
                                        }
                                        console.log(`A kártyát eltávolítottuk a ${currentmove} kártyáiból.`);
                                        document.getElementById(`currentCard`).src = clickedCardUrl; 
                                        if (player.length==0) {
                                            winner(currentmove)
                                            location.reload();
                                        }
                                        else{
                                            currentmove=nextplayer
                                            showcard();
                                        }
                                    }             
                                } 
                            else {
                                alert("A kártya nem lerakható")
                            }
                        }
    
    
                    } 
                }
        
        else{
            if (reversed) {
                if (clickedCardUrl.split('/')[4][0]==selectedcolor[0]) {
                    let indexToRemove = player.indexOf(player[i]);
                    if (indexToRemove !== -1) {
                        player.splice(indexToRemove, 1);
                        console.log(`A kártyát eltávolítottuk a ${currentmove} kártyáiból.`);
                        selectedcolor="none"
                        document.getElementById(`currentCard`).src = clickedCardUrl; 
                        if (player.length==0) {
                            winner(currentmove)
                            location.reload();
                        }
                        else{
                            currentmove=lastplayer
                            showcard();
                        }
                    }
                }
            }
            else{
                if (clickedCardUrl.split('/')[4][0]==selectedcolor[0]) {
                    let indexToRemove = player.indexOf(player[i]);
                    if (indexToRemove !== -1) {
                        player.splice(indexToRemove, 1);
                        console.log(`A kártyát eltávolítottuk a ${currentmove} kártyáiból.`);
                        selectedcolor="none"
                        document.getElementById(`currentCard`).src = clickedCardUrl; 
                        if (player.length==0) {
                            winner(currentmove)
                            location.reload();
                        }
                        else{
                            currentmove=nextplayer
                            showcard();
                        }
                    }
                }
            }
            
        }
    
    
    
        if (pluscard &! alreadyblocked) { 
            if (currentCard.src.split('/')[4][1]=='d') {
                for (let i = 0; i < 2; i++) {
                    let rnd = Math.floor(Math.random() * unoKartyak.length);
                    player.push(unoKartyak[rnd]);
                    pluscard=false
                }    
            }
            else if (currentCard.src.split('/')[4][1]=='f') {
                for (let i = 0; i < 4; i++) {
                    let rnd = Math.floor(Math.random() * unoKartyak.length);
                    player.push(unoKartyak[rnd]);
                    pluscard=false
                }
            }
        }
    
            
    
    }
    
    function showcard(){
        switch (currentmove) {
        case "player1":
            jelenlegi.innerHTML = "Jelenlegi játékos: Player 1";
            container.innerHTML = '';
            for (let i = 0; i < player1cards.length; i++) {
                const img=document.createElement("img");
                img.src=`cards/${player1cards[i]}.png`;
                img.classList.add("card")
                container.appendChild(img)
                img.addEventListener('click', (event) => {
                    mindenegben(event,i,player1cards,"player2","player4")
                });
            }
            break;
        case "player2":
    
            jelenlegi.innerHTML = "Jelenlegi játékos: Player 2";
            container.innerHTML = '';
            container.innerHTML = '';
    
            for (let i = 0; i < player2cards.length; i++) {
                const img=document.createElement("img");
                img.src=`cards/${player2cards[i]}.png`;
                img.classList.add("card")
                container.appendChild(img)
                img.addEventListener('click', (event) => {
                    mindenegben(event,i,player2cards,"player3","player1")
                });
            }
            break;
        case "player3":
            jelenlegi.innerHTML = "Jelenlegi játékos: Player 3";
            container.innerHTML = '';
            for (let i = 0; i < player3cards.length; i++) {
                const img=document.createElement("img");
                img.src=`cards/${player3cards[i]}.png`;
                img.classList.add("card")
                container.appendChild(img)
                img.addEventListener('click', (event) => {
                    mindenegben(event,i,player3cards,"player4","player2")  
                });
            }
    
            break;
        case "player4":
            jelenlegi.innerHTML = "Jelenlegi játékos: Player 4";
            container.innerHTML = '';
            for (let i = 0; i < player4cards.length; i++) {
                const img=document.createElement("img");
                img.src=`cards/${player4cards[i]}.png`;
                img.classList.add("card")
                container.appendChild(img)
                img.addEventListener('click', (event) => {
                    mindenegben(event,i,player4cards,"player1","player3")
                });
            }
    
            break;
        }
    }
    closePopup();
    filltombs(); 
    starter();
    showcard();
    
    console.log(player1cards)
    console.log(player2cards)
    console.log(player3cards)
    console.log(player4cards)
    


}