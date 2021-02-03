const gameBoard = document.getElementById("gameBoard");
let gameBoardArr = Array(9).fill('');
let numMoves = 0;
let AIplayer = null;
let scores = {
    'X': -1,
    'O': 1,
    'tie': 0
};

// IIFE to build game board
(function () {
        for (var i = 0; i < 3; i++) {
            let row = document.createElement("div");
            row.className = "row";

            for (var j = 0; j < 3; j++) {
                let box = document.createElement("div");
                box.className = "box";
                box.setAttribute("data-row", String(i));
                box.setAttribute("data-column", String(j));
                box.setAttribute("data-index", String(j + (i * 3)));
                row.appendChild(box);
            }

            //console.log(row)
            gameBoard.appendChild(row);

        }
    }());

function playGame() {
    AIplayer = false;
    startButton = document.getElementById('startButton');
    startButton.setAttribute("style", "visibility: hidden");
    startAIButton = document.getElementById('startAIButton');
    startAIButton.setAttribute("style", "visibility: hidden");
    restartButton = document.getElementById('restartButton');
    restartButton.setAttribute("style", "visibility: visible");
    restartButton.setAttribute("onClick", "javascript: location.reload();");

    boxes = document.querySelectorAll(".box");
    let playByPlay = document.getElementById('playByPlay')
    numMoves = 0;
    //if (numMoves !== 0) {numMoves++;}

    playByPlay.innerHTML = numMoves % 2 === 0 ? 'Player 1\'s (X\'s) move:' : 'Player 2\'s (O\'s) move:';

    console.log(numMoves);

    function placeXorO() {
        //playByPlay.innerHTML = (numMoves%2 === 0)? 'Player 1\'s (X\'s) move' : 'Player 2\'s (O\'s) move';
        console.log('here');

        if (this.innerHTML === '' && numMoves % 2 === 0) {
            console.log(this)
            this.innerHTML = 'X';
            gameBoardArr[this.getAttribute("data-index")] = 1;
            numMoves++;
            playByPlay.innerHTML = 'Player 2\'s (O\'s) move:';

            console.log(numMoves);
            evaluateWinner();
        } else if (this.innerHTML === '' && numMoves % 2 !== 0) {
            this.innerHTML = 'O';
            gameBoardArr[this.getAttribute("data-index")] = -1;
            console.log(gameBoardArr);
            numMoves++;
            playByPlay.innerHTML = 'Player 1\'s (X\'s) move:';

            console.log(numMoves)
            evaluateWinner();
        }
    }

    boxes.forEach(
        function (box) {
            box.addEventListener("click", placeXorO, false);
        }
    );
}


function playAIGame() {
    AIplayer = true;
    startButton = document.getElementById('startButton');
    startButton.setAttribute("style", "visibility: hidden");
    startAIButton = document.getElementById('startAIButton');
    startAIButton.setAttribute("style", "visibility: hidden");
    restartButton = document.getElementById('restartButton');
    restartButton.setAttribute("style", "visibility: visible");
    restartButton.setAttribute("onClick", "javascript: location.reload();");

    boxes = document.querySelectorAll(".box");
    let playByPlay = document.getElementById('playByPlay')
    numMoves = 0;
    playByPlay.innerHTML = 'Player 1\'s (X\'s) move:';


    function placeX() {
        if (this.innerHTML === '') { // && numMoves % 2 == 0) {
            console.log(this)
            this.innerHTML = 'X';
            gameBoardArr[this.getAttribute("data-index")] = 1;
            console.log(numMoves);
            numMoves++;
            evaluateWinner();
            if (checkWinner() === null) {
                aiMove(gameBoardArr);
            }
            // ai move which also increase num moves by 1 and calls evalWinner
        }
    }

    boxes.forEach(
        function (box) {
            box.addEventListener("click", placeX, false);
        }
    );
}

function aiMove(board) {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            console.log(i);
            board[i] = -1;
            let score = minimax(board, 1, false);
            console.log('score = ', score);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }

        }

    }
    console.log(move);
    gameBoardArr[move] = -1;
    let box = document.querySelector(`[data-index="${move}"]`);
    box.innerHTML = 'O';
    numMoves++;
    evaluateWinner();
}



function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    //console.log('yeh');
    //console.log('result', result);
    if (result === 1) {
        result = 'X';
    } else if (result === -1) {
        result = 'O';
    }

    if (result !== null) {
        return scores[result];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = -1;
                //console.log(board);
                let score = minimax(board, depth + 1, false);
                //console.log(score);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }

        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 1;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}




function evaluateWinner() {
    let playByPlay = document.getElementById('playByPlay')
    let boxes = document.querySelectorAll(".box");
    let startButton = document.getElementById('startButton');


    // Rows
    if (Math.abs(gameBoardArr.slice(0, 3).reduce((a, b) => a + b, 0)) === 3) { // top row
        console.log('Winner');
        for (let i = 0; i < 3; i++) {
            console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[0] === 1) ? 'X\'s wins!' : 'O\'s wins!'
        //checkWinner = gameBoardArr[0] === 1 ? 'X' : 'O';
        gameOver();
        //playAgain();


    } else if (Math.abs(gameBoardArr.slice(3, 6).reduce((a, b) => a + b, 0)) === 3) { // middle row
        console.log('Winner');
        for (let i = 3; i < 6; i++) {
            console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[3] === 1) ? 'X\'s wins!' : 'O\'s wins!';
        //checkWinner = gameBoardArr[3] === 1 ? 'X' : 'O';
        gameOver();



    } else if (Math.abs(gameBoardArr.slice(6, 9).reduce((a, b) => a + b, 0)) === 3) { // bottom row
        console.log('Winner');
        for (let i = 6; i < 9; i++) {
            //console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[6] === 1) ? 'X\'s wins!' : 'O\'s wins!';
        //checkWinner = gameBoardArr[6] === 1 ? 'X' : 'O';
        gameOver();




    }

    // Columns
    else if (Math.abs(gameBoardArr[0] + gameBoardArr[3] + gameBoardArr[6]) === 3) { // first columnR
        console.log('Winner');
        for (let i = 0; i <= 6; i += 3) {
            //console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[0] === 1) ? 'X\'s wins!' : 'O\'s wins!'
        //checkWinner = gameBoardArr[0] === 1 ? 'X' : 'O';
        gameOver();


    } else if (Math.abs(gameBoardArr[1] + gameBoardArr[4] + gameBoardArr[7]) === 3) { // second column
        console.log('Winner');
        for (let i = 1; i <= 7; i += 3) {
            //console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[1] === 1) ? 'X\'s wins!' : 'O\'s wins!'
        //checkWinner = gameBoardArr[1] === 1 ? 'X' : 'O';
        gameOver();


    } else if (Math.abs(gameBoardArr[2] + gameBoardArr[5] + gameBoardArr[8]) === 3) { // third column
        console.log('Winner');
        for (let i = 2; i <= 8; i += 3) {
            //console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[2] === 1) ? 'X\'s wins!' : 'O\'s wins!'
        //checkWinner = gameBoardArr[2] === 1 ? 'X' : 'O';
        gameOver();

    }

    // Diagonals
    else if (Math.abs(gameBoardArr[0] + gameBoardArr[4] + gameBoardArr[8]) === 3) { // diag down L to R
        console.log('Winner');
        for (let i = 0; i <= 8; i += 4) {
            //console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[4] === 1) ? 'X\'s wins!' : 'O\'s wins!'
        //checkWinner = gameBoardArr[0] === 1 ? 'X' : 'O';
        gameOver();
    } else if (Math.abs(gameBoardArr[2] + gameBoardArr[4] + gameBoardArr[6]) === 3) { // diag down R to L
        console.log('Winner');
        for (let i = 2; i <= 6; i += 2) {
            //console.log(boxes[i])
            boxes[i].setAttribute('style', 'background-color:green');
        }
        playByPlay.innerHTML = (gameBoardArr[4] === 1) ? 'X\'s wins!' : 'O\'s wins!'
        //checkWinner = gameBoardArr[0] === 1 ? 'X' : 'O';
        gameOver();
    } else if ((gameBoardArr.reduce((a, b) => a + b, 0)) === Math.abs(1)) {
        console.log('Tie game');
        playByPlay.innerHTML = 'Tie game';
        //checkWinner = 'tie';
        gameOver();
        //prompt('Play again?');
    }
}

function gameOver() {
    document.body.innerHTML = document.body.innerHTML;
    let startButton = document.getElementById('startButton');
    startButton.style.visibility = "visible";
    let startAIButton = document.getElementById('startAIButton');
    startAIButton.style.visibility = "visible";
    startButton.setAttribute("onClick", "javascript: playAgain();");
    startAIButton.setAttribute("onClick", "javascript: playAIAgain();");

    if (AIplayer) {
        startButton.innerHTML = 'Play against a human?';
        startAIButton.innerHTML = 'Play against the AI again?';
    } else {
        startAIButton.innerHTML = 'Play against the AI?';
        startButton.innerHTML = 'Play against a human again?';
    }
}

function playAgain() {
    AIplayer = null;
    gameBoardArr = Array(9).fill('');
    playByPlay.innerHTML = '';
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(
        function (box) {
            box.innerHTML = '';
            box.setAttribute('style', 'background-color:""');
        }
    )
    playGame();
}

function playAIAgain() {
    AIplayer = null;
    gameBoardArr = Array(9).fill('');
    playByPlay.innerHTML = '';
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(
        function (box) {
            box.innerHTML = '';
            box.setAttribute('style', 'background-color:""');
        }
    )
    playAIGame();
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(gameBoardArr[0 + i * 3], gameBoardArr[1 + i * 3], gameBoardArr[2 + i * 3])) {
            winner = gameBoardArr[0 + i * 3];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(gameBoardArr[0 + i], gameBoardArr[3 + i], gameBoardArr[6 + i])) {
            winner = gameBoardArr[0 + i];
        }
    }

    // Diagonal
    if (equals3(gameBoardArr[0], gameBoardArr[4], gameBoardArr[8])) {
        winner = gameBoardArr[0];
    }
    if (equals3(gameBoardArr[2], gameBoardArr[4], gameBoardArr[6])) {
        winner = gameBoardArr[2];
    }

    let openSpots = 0;
    for (let i = 0; i < 9; i++) {
        if (gameBoardArr[i] == '') {
            openSpots++;
        }

    }

    if (winner === null && openSpots === 0) {
        return 'tie';
    } else {
        return winner;
    }
}