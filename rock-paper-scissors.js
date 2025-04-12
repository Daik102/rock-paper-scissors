let humanScore = 0;
let computerScore = 0;
const results = document.querySelector('.results');

function getComputerChoice() {
  const randomNum = Math.random();
  let computerChoice = '';
  
  if (randomNum <= 1 / 3) {
    computerChoice = 'rock';
  } else if (randomNum <= 2 / 3) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  return computerChoice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    results.textContent = 'Tie';
  } else if (humanChoice === 'rock' && computerChoice === 'scissors' || humanChoice === 'paper' && computerChoice === 'rock' || humanChoice === 'scissors' && computerChoice === 'paper') {
    results.textContent = 'You win!';
    humanScore++;
  } else {
    results.textContent = 'You lose!';
    computerScore++;
  }
  results.innerHTML += '<br>' + `Your score: ${humanScore}` + '<br>' + `Computer's score: ${computerScore}`;
  if (humanScore === 5) {
    results.innerHTML += '<br>' + 'Congrats! You won the game!';
  } else if (computerScore === 5) {
    results.innerHTML += '<br>' + 'You lost the game';
  }
}

const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const humanSelection = e.target.id;
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  });
});