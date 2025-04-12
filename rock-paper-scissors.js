document.body.style.marginTop = '60px';
document.body.style.fontSize = '28px';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.textAlign = 'center';
const monster = document.querySelector('.monster');
const results = document.querySelector('.results');
const star = document.querySelector('.star');
const buttons = document.querySelectorAll('button');
let humanScore = 0;
let computerScore = 0;
let tie = 0;
let wins = 0;
let finished;
let currentMonster = 'slime';
monster.innerHTML = 'You encountered a slime!';

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
    tie++;
  } else if (humanChoice === 'rock' && computerChoice === 'scissors' || humanChoice === 'paper' && computerChoice === 'rock' || humanChoice === 'scissors' && computerChoice === 'paper') {
    results.textContent = 'You win!';
    humanScore++;
  } else {
    results.textContent = 'You lose';
    computerScore++;
  }
  results.innerHTML += '<br>' + `You: ${humanScore}` + '<br>' + `${currentMonster}: ${computerScore}` + '<br>' + `Tie: ${tie}`;
  if (humanScore === 5 || computerScore === 5) {
    if (humanScore === 5) {
      results.innerHTML += '<br>' + `You beat the ${currentMonster}!`;
      star.innerHTML += '&#9734;';
      wins++;
      const descendBtn = document.createElement('button');
      descendBtn.style.fontSize = '20px';
      descendBtn.style.padding = '4px 8px';
      descendBtn.style.background = '#000';
      descendBtn.style.color = '#fff';
      descendBtn.style.borderRadius = '4px';
      if (wins === 6) {
        descendBtn.textContent = 'Return';
      } else {
        descendBtn.textContent = 'Descend';
      }
      document.body.appendChild(descendBtn);
      descendBtn.addEventListener('click', () => {
        if (wins === 1) {
          document.body.style.background = '#ccc';
          currentMonster = 'Goblin';
        } else if (wins === 2) {
          document.body.style.background = '#999';
          currentMonster = 'Lizard';
        } else if (wins === 3) {
          document.body.style.background = '#666';
          document.body.style.color = '#fff';
          currentMonster = 'Skelton';
        } else if (wins === 4) {
          document.body.style.background = '#333';
          currentMonster = 'Dark knight';
        } else if (wins === 5) {
          document.body.style.background = '#000';
          currentMonster = 'Dragon';
        } else if (wins === 6) {
          document.body.style.background = '#fff';
          document.body.style.color = '#000';
          document.body.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;' + '<br><br>' + 'You saved the world!' + '<br>' + 'Thanks for playing' + '<br><br>' + 'Daik 2025' + '<br><br>' + '&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;' + '<br><br>';

          const resetBtn = document.createElement('button');
          resetBtn.textContent = 'Reset';
          resetBtn.style.fontSize = '20px';
          resetBtn.style.padding = '4px 8px';
          resetBtn.style.background = '#fff';
          resetBtn.style.color = '#000';
          resetBtn.style.borderRadius = '4px';
          document.body.appendChild(resetBtn);

          resetBtn.addEventListener('click', () => {
            location.reload();
          });
          return;
        }
        finished = false;
        humanScore = 0;
        if (wins === 4) {
          computerScore = 1;
        } else if (wins === 5) {
          computerScore = 2;
        } else {
          computerScore = 0;
        }
        tie = 0;
        results.textContent = '';
        document.body.removeChild(descendBtn);
        monster.textContent = `You encountered a ${currentMonster}!`;
      });
    } else {
      results.innerHTML += '<br>' + `You lost to the ${currentMonster}`;
      const tryAgainBtn = document.createElement('button');
      tryAgainBtn.style.fontSize = '20px';
      tryAgainBtn.style.padding = '4px 8px';
      tryAgainBtn.style.background = '#fff';
      tryAgainBtn.style.color = '#000';
      tryAgainBtn.style.borderRadius = '4px';
      tryAgainBtn.textContent = 'Try Again';
      document.body.appendChild(tryAgainBtn);
      tryAgainBtn.addEventListener('click', () => {
        finished = false;
        humanScore = 0;
        if (wins === 4) {
          computerScore = 1;
        } else if (wins === 5) {
          computerScore = 2; 
        } else {
          computerScore = 0;
        }
        tie = 0;
        results.textContent = '';
        document.body.removeChild(tryAgainBtn);
      });
    }
    finished = true;
  }
}

const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
  btn.style.fontSize = '20px';
  btn.style.padding = '4px 8px';
  btn.style.background = '#000';
  btn.style.color = '#fff';
  btn.style.margin = '0 2px';
  btn.style.borderRadius = '4px';
  btn.addEventListener('click', (e) => {
    if (finished) {
      return;
    }
    const humanSelection = e.target.id;
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  });
});