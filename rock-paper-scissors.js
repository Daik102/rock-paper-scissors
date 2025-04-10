let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomNum = Math.random();
  let computerChoice;
  
  if (randomNum <= 1 / 3) {
    computerChoice = "rock";
  } else if (randomNum > 1 / 3 && randomNum <= 2 / 3) {
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
  if (humanChoice === computerChoice) {
    console.log("Tie");
  } else if (humanChoice === "rock") {
      if (computerChoice === "paper") {
        youLose();
      } else if (computerChoice === "scissors") {
        youWin();
      }
  } else if (humanChoice === "paper") {
      if (computerChoice === "rock") {
        youWin();
      } else if (computerChoice === "scissors") {
        youLose();
      }
  } else if (humanChoice === "scissors") {
      if (computerChoice === "rock") {
        youLose();
      } else if (computerChoice === "paper") {
        youWin();
      }
  }
  console.log(`Your score: ${humanScore}`);
  console.log(`Computer's score: ${computerScore}`);
}

function youWin() {
  console.log("You win!");
  humanScore++;
}

function youLose() {
  console.log("You lose!");
  computerScore++;
}

let playCount = 0;

function playGame() {
  if (playCount >= 5) {
    return;
  } else {
    const computerSelection = getComputerChoice();
    const humanSelection = getHumanChoice();

    playRound(humanSelection, computerSelection);
    playCount++;
    playGame();
  }
}

playGame();