let playerScore= computerScore=Round=0;
let computerColor= playerColor="";
let playerChoices= document.querySelectorAll('.playerChoices div');
let computerChoices= document.querySelectorAll('.computerChoices div');
let roundText = document.querySelector('#roundNumber');
let playerScoreText= document.querySelector('#playerScore');
let computerScoreText= document.querySelector('#computerScore');
let commentText= document.querySelector('#resultsComments p');
let playerNameText= document.querySelector('.playerName');
let startBtn = document.querySelector('#Start');
let playChoice='';
let compChoice='';
let currentTarget='';

initialize();

startBtn.addEventListener('mousedown',settingGame);

function initialize(){
    Round=0;
    playerScore=computerScore=0;
    playerNameText.textContent='PlayersName';
    computerScoreText.textContent = 'Score';
    playerScoreText.textContent = 'Score';
    roundText.textContent = `X / 5`;

}
function settingGame(){
    initialize();
    postPlayerName();
    roundText.textContent = `1/5`;
    checkRound();
}

function checkRound(){
    if(Round >= 5){
        disablePlayerChoice();
        startBtn.textContent= `Click to Play Again`;
    }
    else if(Round == 0){
        activatePlayerChoice();
    }
    if (Round <0){
        initialize();
    }
}

function getPlayerChoice(){
        currentTarget= this;
        playChoice= this.id.trim();
        playRound();
}


function activatePlayerChoice(){

    playerChoices.forEach((choice)=>{
        choice.addEventListener('click',getPlayerChoice);
    })

}


function disablePlayerChoice(){
    playerChoices.forEach((choice)=>{
        choice.removeEventListener('click',getPlayerChoice)
})
}

function postPlayerName(){
    while (playerNameText.textContent=="PlayersName"){
        playerNameText.textContent=prompt('What is your Name? \n  Brave Challenger!!')
    }
}


function getComputerChoice(){
/**Generate Random Number btwn 0-2 !!*/
    let randomChoice=Math.floor(Math.random()*3)
    switch (randomChoice){
        case 0: randomChoice="Rock";
            break;
        case 1: randomChoice="Paper";
            break;
        case 2: randomChoice="Scissor";
            break;
    }
    return randomChoice;
}

function playRound(){
    compChoice= getComputerChoice();
    if(playChoice=="Paper" && compChoice=="Rock" || playChoice=="Rock" && compChoice=="Scissor" || playChoice=="Scissor" && compChoice=="Paper"){
        playerWin(playChoice,compChoice);
    }   else if(compChoice=="Paper" && playChoice=="Rock" || compChoice=="Rock" && playChoice=="Scissor" || compChoice=="Scissor" && playChoice=="Paper") {
        computerWin(playChoice,compChoice);
    }
        else {
        Tie(playChoice,compChoice)
    }
}
 
function computerWin(PLAYER,COMPUTER){
    computerScore++;
    playerColor="The Player Won he sadly chose: " + PLAYER;
    computerColor="The Computer Lost he  perfectly chose: "+COMPUTER;
    activePlayerAnimation('Lost');
}

function playerWin(PLAYER,COMPUTER){
    playerScore++;
    playerColor="The Player Won he perfectly chose: " + PLAYER;
    computerColor="The Computer Lost he  sadly chose: "+COMPUTER;
    activePlayerAnimation('Won');
}

function Tie(PLAYER,COMPUTER){
    playerColor="The Player did Tie he chose: " + PLAYER;
    computerColor=" So did The Computer by chosing: "+COMPUTER;
    activePlayerAnimation('Tie');
}

function Results(){
    computerScoreText.textContent = computerScore;
    playerScoreText.textContent = playerScore;
    Round++;
    roundText.textContent = `${Round} / 5`;
    checkRound();/**CHECK FOR THE CURRENT ROUND first */
    return "The Round Number "+Round+ " has ended , THE Results are :  \n "+ playerColor + "\n" + computerColor + "\n The Players Score now is : "+ playerScore 
            + " And the Computer Score now is : " + computerScore;
}

function activePlayerAnimation(state){
    currentComputerTarget= document.getElementById(`computer${compChoice}`)
    if(state == 'Won'){
        currentTarget.classList.add('activePlayerChoiceWon');
        currentComputerTarget.classList.add('activeComputerChoiceLost');
    } else if(state == 'Lost'){
        currentTarget.classList.add('activePlayerChoiceLost');
        currentComputerTarget.classList.add('activeComputerChoiceWon');
    } else if(state == 'Tie'){
        currentTarget.classList.add('activePlayerChoiceTie');
        currentComputerTarget.classList.add('activeComputerChoiceTie');
    }
    disablePlayerChoice();
    setTimeout(disablePlayerAnimation,1000);
    
}

function disablePlayerAnimation(){
    currentComputerTarget.classList.remove('activeComputerChoiceLost','activeComputerChoiceTie','activeComputerChoiceWon')
    currentTarget.classList.remove('activePlayerChoiceTie','activePlayerChoiceWon','activePlayerChoiceLost');
    activatePlayerChoice();
    commentText.textContent = Results();
}


