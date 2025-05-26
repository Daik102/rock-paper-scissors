const container = document.querySelector('.container');
const monster = document.querySelector('.monster');
const dungeon = document.querySelector('.dungeon');
const results = document.querySelector('.results');
const star = document.querySelector('.star');
const btnContainer = document.querySelector('.btn-container');
const enterBtn = document.querySelector('.enter-btn');
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
      
      if (wins === 6) {
        descendBtn.textContent = 'Return';
        descendBtn.classList.add('return-btn');
      } else {
        descendBtn.textContent = 'Descend';
        descendBtn.classList.add('descend-btn');
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
          document.body.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;' + '<br><br>' + 'You saved the world!' + '<br>' + 'Thanks for playing' + '<br><br>' + '2025 Daik' + '<br><br>' + '&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;' + '<br><br>';
          document.body.style.padding = '10.8rem 0';

          const resetBtn = document.createElement('button');
          resetBtn.textContent = 'Reset';
          resetBtn.classList.add('reset-btn');
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
      tryAgainBtn.textContent = 'Try Again';
      tryAgainBtn.classList.add('try-again-btn');
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