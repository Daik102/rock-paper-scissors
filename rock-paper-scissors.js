let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomNum = Math.random();
  let computerChoice;
  
  if (randomNum <= 1 / 3) {
    computerChoice = "rock";
  } else if (randomNum > 1 / 3 && randomNum <= 2 /3) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }
  console.log(computerChoice);
}

getComputerChoice();

function getHumanChoice() {
  const humanChoice = prompt("Enter your choice", "");
  console.log(humanChoice);
}

getHumanChoice();

function playRound() {
  
}