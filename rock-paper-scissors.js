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
  return computerChoice;
}

function getHumanChoice() {
  const initialInput = prompt("Enter your choice", "");
  const humanChoice = initialInput.toLowerCase();
  return humanChoice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === "rock") {
    if (computerChoice === "rock") {
      console.log("Tie");
    } else if (computerChoice === "paper") {
      console.log("You lose!");
      computerScore++;
    } else {
      console.log("You win!");
      humanScore++;
    }
  } else if (humanChoice === "paper") {
    if (computerChoice === "rock") {
      console.log("You win!");
      humanScore++;
    } else if (computerChoice === "paper") {
      console.log("Tie");
    } else {
      console.log("You lose!");
      computerScore++;
    }
  } else {
    if (computerChoice === "rock") {
      console.log("You lose!");
      computerScore++
    } else if (computerChoice === "paper") {
      console.log("You win!");
      humanScore++;
    } else {
      console.log("Tie");
    }
  }
  console.log(`Your score: ${humanScore}`);
  console.log(`Computer's score: ${computerScore}`);
}

const computerSelection = getComputerChoice();
const humanSelection = getHumanChoice();

playRound(humanSelection, computerSelection);