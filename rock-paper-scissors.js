const container = document.querySelector('.container');
const star = document.querySelector('.star');
const monster = document.querySelector('.monster');
const btnContainer = document.querySelector('.btn-container');
const enterBtn = document.querySelector('.enter-btn');
const results = document.querySelector('.results');
const dungeon = document.querySelector('.dungeon');
let humanScore = 0;
let computerScore = 0;
let tie = 0;
let wins = 0;
let finished;
let currentMonster = 'slime';
monster.innerHTML = 'You came to the entrance of the dungeon.';

enterBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = '#0000';
  container.style.padding = '10rem 0 0';
  container.style.backgroundColor = '#0000';
  dungeon.style.backgroundColor = '#0000';
  dungeon.style.borderBottom = 'none';
  dungeon.innerHTML = '';

  btnContainer.innerHTML = `
    <button class="btn" id="rock">Rock</button>
    <button class="btn" id="paper">Paper</button>
    <button class="btn" id="scissors">Scissors</button>
  `;
  monster.innerHTML = `You encountered a ${currentMonster}!`;

  const btns = document.querySelectorAll('.btn');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (finished) {
        return;
      }
      const humanSelection = e.target.id;
      const computerSelection = getComputerChoice();
      playRound(humanSelection, computerSelection);
    });
  });
});

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
    tie++;
    results.textContent = 'Tie';
  } else if (humanChoice === 'rock' && computerChoice === 'scissors' || humanChoice === 'paper' && computerChoice === 'rock' || humanChoice === 'scissors' && computerChoice === 'paper') {
    humanScore++;
    results.textContent = 'You win!';
  } else {
    computerScore++;
    results.textContent = 'You lose';
  }
  results.innerHTML += '<br>' + `You: ${humanScore}` + '<br>' + `${currentMonster}: ${computerScore}` + '<br>' + `Tie: ${tie}`;
  
  if (humanScore === 5) {
    wins++;
    finished = true;
    star.innerHTML += '&#9734;';
    results.innerHTML += '<br>' + `You beat the ${currentMonster}!`;
    
    const descendBtn = document.createElement('button');

    if (wins === 6) {
      descendBtn.classList = 'return-btn';
      descendBtn.textContent = 'Return';
    } else {
      descendBtn.classList = 'descend-btn';
      descendBtn.textContent = 'Descend';
    }
    container.appendChild(descendBtn);

    descendBtn.addEventListener('click', () => {
      if (wins === 1) {
        currentMonster = 'Goblin';
        document.body.style.background = '#ccc';
      } else if (wins === 2) {
        currentMonster = 'Lizard';
        document.body.style.background = '#999';
      } else if (wins === 3) {
        currentMonster = 'Skelton';
        document.body.style.background = '#666';
        document.body.style.color = '#fff';
      } else if (wins === 4) {
        currentMonster = 'Dark knight';
        document.body.style.background = '#333';
      } else if (wins === 5) {
        currentMonster = 'Dragon';
        document.body.style.background = '#000';
      } else if (wins === 6) {
        document.body.style.padding = '10.8rem 0';
        document.body.style.background = '#fff';
        document.body.style.color = '#000';
        document.body.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;' + '<br><br>' + 'You saved the world!' + '<br>' + 'Thanks for playing' + '<br><br>' + '2025 Daik' + '<br><br>' + '&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;' + '<br><br>';

        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.classList = 'reset-btn';
        document.body.appendChild(resetBtn);

        resetBtn.addEventListener('click', () => {
          location.reload();
        });
        return;
      }
      humanScore = 0;
      if (wins === 4) {
        computerScore = 1;
      } else if (wins === 5) {
        computerScore = 2;
      } else {
        computerScore = 0;
      }
      tie = 0;
      finished = false;
      results.textContent = '';
      container.removeChild(descendBtn);
      monster.textContent = `You encountered a ${currentMonster}!`;
    });
  } 
    
  if (computerScore === 5) {
    finished = true;
    results.innerHTML += '<br>' + `You lost to the ${currentMonster}`;

    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.textContent = 'Try Again';
    tryAgainBtn.classList ='try-again-btn';
    container.appendChild(tryAgainBtn);

    tryAgainBtn.addEventListener('click', () => {
      humanScore = 0;
      if (wins === 4) {
        computerScore = 1;
      } else if (wins === 5) {
        computerScore = 2; 
      } else {
        computerScore = 0;
      }
      tie = 0;
      finished = false;
      results.textContent = '';
      container.removeChild(tryAgainBtn);
    });
  }
}