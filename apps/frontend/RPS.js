let playerScore= computerScore=Round=0;
let computerColor= playerColor="";
let playerChoices= document.querySelectorAll('.playerChoices div');
let computerChoices= document.querySelectorAll('.computerChoices div');
let startBtn = document.querySelector('#Start');
/*Listening for the Start of the Game */
let playChoice='';

startBtn.addEventListener('click',start)

function start(){
    /*Initialize Round each Time the game starts again */
    Round=0;
    while (Round !=5){};
}

function playerChoice(){
      
}

function computerChoice(){
/*Generate Random Number btwn 0-2 */
    let compChoice=Math.floor(Math.random()*3)
    switch (compChoice){
        case 0: compChoice="Rock";
            break;
        case 1: compChoice="Paper";
            break;
        case 2: compChoice="Scissor";
            break;
    }
    return compChoice;
}
function game(){
    let compChoice= computerChoice();
    if(playChoice=="Paper" && compChoice=="Rock" || playChoice=="Rock" && compChoice=="Scissor" || playChoice=="Scissor" && compChoice=="Paper"){
        playerWin(playChoice,compChoice);
    }   else if(compChoice=="Paper" && playChoice=="Rock" || compChoice=="Rock" && playChoice=="Scissor" || compChoice=="Scissor" && playChoice=="Paper") {
        computerWin(playChoice,compChoice);
    }
        else {
        Tie(playChoice,compChoice)
    }
    alert(Results())
}
function computerWin(PLAYER,COMPUTER){
    computerScore++;
    Round++;
    playerColor="The Player Won he sadly chose: " + PLAYER;
    computerColor="The Computer Lost he  perfectly chose: "+COMPUTER;
}
function playerWin(PLAYER,COMPUTER){
    playerScore++;
    Round++;
    playerColor="The Player Won he perfectly chose: " + PLAYER;
    computerColor="The Computer Lost he  sadly chose: "+COMPUTER;
}
function Tie(PLAYER,COMPUTER){
    Round++;
    playerColor="The Player did Tie he chose: " + PLAYER;
    computerColor=" So did The Computer by chosing: "+COMPUTER;
}
function Results(){
    return "The Round Number "+Round+ " has ended , THE Results are :  \n "+ playerColor + "\n" + computerColor + "\n The Players Score now is : "+ playerScore 
            + " And the Computer Score now is : " + computerScore;
}


