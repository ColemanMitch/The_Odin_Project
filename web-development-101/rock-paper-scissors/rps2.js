let compWs = 0;
let userWs = 0;

const compScore = document.querySelector('#compscore');
const userScore = document.querySelector('#userscore');

const content = document.querySelector('.content');

const scores = document.createElement('div');
const result = document.createElement('div');

scores.classList.add('scores');
result.classList.add('result');

scores.textContent = '';

content.appendChild(scores);
content.appendChild(result);

userScore.textContent = userWs;
compScore.textContent = compWs;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function computerPlay() {
    let compRPSNum = getRandomInt(3);
    let compRPS = "";
    switch (compRPSNum) {
        case 0:
            compRPS = "rock";
            break;
        case 1:
            compRPS = "paper";
            break;
        case 2:
            compRPS = "scissors";
    }
    return compRPS;
}

function userPlay() {
    let rpsVals = ["rock", "paper", "scissors"];
    //let userRPS = prompt("Rock, paper, or scissors?");
    while (true) {
        if (!rpsVals.includes(userRPS.toLowerCase())) {
            alert("Please enter \"rock\",\"paper\", or \"scissors\"");
        } else {
            break;
        }
        userRPS = prompt("Let's try this again... rock, paper, or scissors?");
    }
    return userRPS.toLowerCase();
}


function playRound(computerSelection, userSelection) {
    

    while (compWs < 5 && userWs < 5) {
        if (userSelection == computerSelection) {
            console.log("Tie! You and the computer both picked ", computerSelection);
            scores.textContent = "Tie! You and the computer both picked " + computerSelection;

        } else {
            if (userSelection == "rock" && computerSelection == "scissors") {
                console.log("You win! Rock beats scissors!");
                scores.textContent = "You win! Rock beats scissors!";
                userWs++;
            }
            if (userSelection == "paper" && computerSelection == "rock") {
                console.log("You win! Paper beats rock!");
                scores.textContent = "You win! Paper beats rock!";

                userWs++;
            }
            if (userSelection == "scissors" && computerSelection == "paper") {
                console.log("You win! Scissors beats paper!");
                scores.textContent = "You win! Scissors beats paper!";
                userWs++;
            }
            if (computerSelection == "rock" && userSelection == "scissors") {
                console.log("You lose! Rock beats scissors!");
                scores.textContent = "You lose! Rock beats scissors!";
                compWs++;
            }
            if (computerSelection == "paper" && userSelection == "rock") {
                console.log("You lose! Paper beats rock!");
                scores.textContent = "You lose! Paper beats rock!";
                compWs++;
            }
            if (computerSelection == "scissors" && userSelection == "paper") {
                console.log("You lose! Scissors beats paper!");
                scores.textContent = "You lose! Scissors beats paper!";
                compWs++;
            }
        }
        userScore.textContent = userWs;
        compScore.textContent = compWs;
        return

        // return the winner?
        
    }
    console.log("yea bubee");
}

const rockBtn = document.querySelector('#rock');
rockBtn.addEventListener('click', () => {
    //alert("Hello rock");
    if (userWs < 5 && compWs < 5) {
        let userSelection = "rock";
        let computerSelection = computerPlay();
        playRound(computerSelection, userSelection);
        if (userWs == 5) {
            result.textContent = "You won! 5 games to " + compWs;
        }
        if (compWs == 5) {
            result.textContent = "You lost! 5 games to " + userWs;
        }
    }
});
const paperBtn = document.querySelector('#paper');
paperBtn.addEventListener('click', () => {
    if (userWs < 5 && compWs < 5) {
        let userSelection = "paper";
        let computerSelection = computerPlay();
        playRound(computerSelection, userSelection);
        if (userWs == 5) {
            result.textContent = "You won! 5 games to " + compWs;
        }
        if (compWs == 5) {
            result.textContent = "You lost! 5 games to " + userWs;
        }
    }
});
const scissorsBtn = document.querySelector('#scissors');
scissorsBtn.addEventListener('click', () => {
    if (userWs < 5 && compWs < 5) {
        let userSelection = "scissors";
        let computerSelection = computerPlay();
        playRound(computerSelection, userSelection);
        if (userWs == 5) {
            result.textContent = "You won! 5 games to " + compWs;
        }
        if (compWs == 5) {
            result.textContent = "You lost! 5 games to " + userWs;
        }
    }
});




function game() {
    // store computer and user wins

    let j;
    for (let i = 0; i < 5; i++) {
        let computerSelection = computerPlay(),
            userSelection = userPlay();
        j = playRound(computerSelection, userSelection);
        if (j == 0) {
            i--;
        } else {
            if (j < 0) {
                compWs++;
            } else {
                userWs++;
            }
        }
    }
    console.log(j);
    if (compWs < userWs) {
        console.log(`You won! ${userWs} games to ${compWs}`);
    } else if (compWs > userWs) {
        console.log(`You lost! ${compWs} games to ${userWs}`);
    }
    console.log(j);
}