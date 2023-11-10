/* Declaring Inputs */

let playerChoices = document.querySelectorAll('.playerChoices div');

/* Declaring Outputs */

let computerChoices = document.querySelectorAll('.computerChoices div');
let roundText = document.querySelector('#roundNumber');
let playerScoreText = document.querySelector('#playerScore');
let computerScoreText = document.querySelector('#computerScore');
let commentText = document.querySelector('#resultsComments p');
let playerNameText = document.querySelector('.playerName');
let startBtn = document.querySelector('#Start');


/*Declaring Global Variables */
let playerScore = computerScore = Round = 0;
let playChoice = '';
let compChoice = '';
let currentTarget = '';
let computerColor = playerColor = "";




/* Functionalities */
initialize();

startBtn.addEventListener('mousedown', settingGame);/* Game Start? Listener */

/*Initializing Required Variables for a new GAME */
function initialize() {
    Round = 0;
    playerScore = computerScore = 0;
    playerNameText.textContent = 'PlayersName';
    computerScoreText.textContent = 'Score';
    playerScoreText.textContent = 'Score';
    commentText.textContent='Are You now Able to Save Humanity?'

}

/*Preparing The Game To Start */
function settingGame() {
    initialize();
    postPlayerName();
    roundText.textContent = `1/5`;
    checkRound();
}

/*Check if Game of 5 Rounds is Over. */
function checkRound() {
    if (Round >= 5) {
        disablePlayerChoice();
        startBtn.textContent = `Click to Play Again`;
    }
    else if (Round == 0) {
        activatePlayerChoice();
    }
    if (Round < 0) {
        initialize();
    }
}


function getPlayerChoice() {
    currentTarget = this;
    playChoice = this.id.trim();
    playRound();
}

/* toStart to Listen to Players Input */
function activatePlayerChoice() {

    playerChoices.forEach((choice) => {
        choice.addEventListener('click', getPlayerChoice);
    })

}

/* toStop Listening to Players Input */
function disablePlayerChoice() {
    playerChoices.forEach((choice) => {
        choice.removeEventListener('click', getPlayerChoice)
    })
}

function postPlayerName() {
    while (playerNameText.textContent == "PlayersName") {
        playerNameText.textContent = prompt('What is your Name? \n  Brave Challenger!!')
    }
}

/* Generating The Choice of The Computer player */
function getComputerChoice() {
    /**Generate Random Number btwn 0-2 !!*/
    let randomChoice = Math.floor(Math.random() * 3)
    switch (randomChoice) {
        case 0: randomChoice = "Rock";
            break;
        case 1: randomChoice = "Paper";
            break;
        case 2: randomChoice = "Scissor";
            break;
    }
    return randomChoice;
}

/* A Round of the Game */
function playRound() {
    compChoice = getComputerChoice();
    if (playChoice == "Paper" && compChoice == "Rock" || playChoice == "Rock" && compChoice == "Scissor" || playChoice == "Scissor" && compChoice == "Paper") {
        playerWin(playChoice, compChoice);
    } else if (compChoice == "Paper" && playChoice == "Rock" || compChoice == "Rock" && playChoice == "Scissor" || compChoice == "Scissor" && playChoice == "Paper") {
        computerWin(playChoice, compChoice);
    }
    else {
        Tie(playChoice, compChoice)
    }
}
/* Actions to Take When Computer Wins */
function computerWin(PLAYER, COMPUTER) {
    computerScore++;
    playerColor = "You chose: " + PLAYER;
    computerColor = "The Computer Won he  perfectly chose: " + COMPUTER;
    activePlayerAnimation('Lost');
}
/* Actions to Take When Player Wins */
function playerWin(PLAYER, COMPUTER) {
    playerScore++;
    playerColor = "You Won you perfectly chose: " + PLAYER;
    computerColor = "The Computer chose: " + COMPUTER;
    activePlayerAnimation('Won');
}
/* Actions to Take When They Tie */
function Tie(PLAYER, COMPUTER) {
    playerColor = "The Player chose: " + PLAYER;
    computerColor = " So did The Computer by chosing: " + COMPUTER;
    activePlayerAnimation('Tie');
}
/* Updating The Results Layout */
function Results() {
    computerScoreText.textContent = computerScore;
    playerScoreText.textContent = playerScore;
    Round++;
    roundText.textContent = `${Round} / 5`;
    checkRound();/**CHECK FOR THE CURRENT ROUND first */
    if(Round == 5){
        if(playerScore>computerScore){
            return "The Round Number " + Round + " has ended \n " + playerColor + "\n" + computerColor 
            + "\n" + 'You Won The Game with  ' + playerScore + ' To ' + computerScore ;
        }
        else if (computerScore>playerScore){
            return "The Round Number " + Round + " has ended \n " + playerColor + "\n" + computerColor 
            + "\n" + 'You Lost The Game with  ' + playerScore + ' To ' + computerScore ;
        }
        else{
            return "The Round Number " + Round + " has ended \n " + playerColor + "\n" + computerColor 
            + "\n" + 'You and Computer had a Tie ' + playerScore + ' To ' + computerScore ;
        }
        
    }
    return "The Round Number " + Round + " has ended \n " + playerColor + "\n" + computerColor ;
}


/* CSS Animation for The Choices Played by The Two Parties. */
function activePlayerAnimation(state) {
    currentComputerTarget = document.getElementById(`computer${compChoice}`)
    if (state == 'Won') {
        currentTarget.classList.add('activePlayerChoiceWon');
        currentComputerTarget.classList.add('activeComputerChoiceLost');
    } else if (state == 'Lost') {
        currentTarget.classList.add('activePlayerChoiceLost');
        currentComputerTarget.classList.add('activeComputerChoiceWon');
    } else if (state == 'Tie') {
        currentTarget.classList.add('activePlayerChoiceTie');
        currentComputerTarget.classList.add('activeComputerChoiceTie');
    }
    disablePlayerChoice();
    setTimeout(disablePlayerAnimation, 1000);

}

function disablePlayerAnimation() {
    currentComputerTarget.classList.remove('activeComputerChoiceLost', 'activeComputerChoiceTie', 'activeComputerChoiceWon')
    currentTarget.classList.remove('activePlayerChoiceTie', 'activePlayerChoiceWon', 'activePlayerChoiceLost');
    activatePlayerChoice();
    commentText.textContent = Results();
}


