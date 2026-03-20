function getMonsterMove() {
  const randomNum = Math.random();
  let monsterMove = '';
  
  if (randomNum <= 1 / 3) {
    monsterMove = 'rock';
  } else if (randomNum <= 2 / 3) {
    monsterMove = 'paper';
  } else {
    monsterMove = 'scissors';
  }

  return monsterMove;
}

function getIconHTML(energy) {
  let iconHTML = '';

  if (energy) {
    let whiteEnergy = '';

    if (wins >= 3) {
      whiteEnergy = 'white-energy';
    }

    for (let i = 0; i < energy; i++) {
      iconHTML += `<div class="energy-bar ${whiteEnergy}"></div>`;
    }
  } else {
    let whiteIcon = '';

    if (wins >= 3) {
      whiteIcon = 'white-icon';
    }

    iconHTML = `
      <img class="icon skull-icon ${whiteIcon}" src="./icons/skull-crossbones.svg" alt="skull-crossbones">
    `;
  }

  return iconHTML;
}

function handleFlash() {
  if (wins < 3) {
    main.classList.add('black-flash');
  } else {
    main.classList.add('white-flash');
  }

  setTimeout(() => {
    main.classList.remove('black-flash', 'white-flash');
  }, 100);
}

function disableActionBtns() {
  const actionBtns = document.querySelectorAll('.action-btn');

  actionBtns.forEach((btn) => {
    btn.classList.add('initial-cursor');
    btn.blur();
  });
}

function handleDescendBtn(retry) {
  const backBtn = document.querySelector('.back-btn');
  const descendBtn = document.querySelector('.descend-btn');
  backBtn.classList.remove('hidden');
  descendBtn.classList.remove('hidden');

  if (wins >= 4 || retry && wins >= 3) {
    backBtn.classList.add('white-font', 'white-box-shadow');
    descendBtn.classList.add('white-font', 'white-box-shadow');
  }

  if (wins === 6) {
    descendBtn.textContent = 'Return';
  }

  if (retry) {
    descendBtn.textContent = 'Retry';
  }

  backBtn.addEventListener('click', resetGame);
  descendBtn.addEventListener('click', setupGame);
}

function playRound(e) {
  if (humanEnergy === 0 || monsterEnergy === 0 || message.textContent === 'Rock, Paper, Scissors, Shoot!' || fighting) {
    return;
  }

  message.textContent = 'Rock, Paper, Scissors, Shoot!';
  renderResult('dots-circle', 'dots-circle');
  
  setTimeout(() => {
    fighting = true;
    let humanMove = '';

    if (e.target.id) {
      humanMove = e.target.id;
    } else {
      humanMove = e.target.parentElement.id;
    }

    const monsterMove = getMonsterMove();

    if (humanMove === monsterMove) {
      message.textContent = 'Tie';
    } else if (
      humanMove === 'rock' && monsterMove === 'scissors' || 
      humanMove === 'paper' && monsterMove === 'rock' || 
      humanMove === 'scissors' && monsterMove === 'paper'
    ) {
      message.textContent = 'You win!';
    } else {
      message.textContent = `${currentMonster} win!`;
    }

    renderResult(humanMove, monsterMove);

    setTimeout(() => {
      fighting = false;

      if (message.textContent === 'You win!') {
        monsterEnergy -= 1;
        let monsterEnergyBar = getIconHTML(monsterEnergy);

        if (monsterEnergy === 0) {
          monsterEnergyBar = getIconHTML();
          handleFlash();
          star.innerHTML += '&#9734;';
          star.classList.add('rotate-star');

          setTimeout(() => {
            star.classList.remove('rotate-star');
          }, 1000);

          wins += 1;
          message.textContent = `You beat the ${currentMonster}!`;
          disableActionBtns();
          handleDescendBtn();
        }
        
        const monsterEnergyDisplay = document.querySelector('.monster-energy-display');
        monsterEnergyDisplay.innerHTML = monsterEnergyBar;
      } else if (message.textContent === `${currentMonster} win!`) {
        humanEnergy -= 1;
        let humanEnergyBar = getIconHTML(humanEnergy);

        if (humanEnergy === 0) {
          humanEnergyBar = getIconHTML();
          handleFlash();
          message.textContent = `You lost to the ${currentMonster}`;
          disableActionBtns();
          handleDescendBtn('retry');
        }

        const humanEnergyDisplay = document.querySelector('.human-energy-display');
        humanEnergyDisplay.innerHTML = humanEnergyBar;
      }
    }, 500);
  }, 500);
}

function renderBattleMode() {
  result.classList.remove('hidden');
  dungeon.classList.add('none');
  ground.classList.add('none');
  const actionArray = ['rock', 'paper', 'scissors'];
  btnContainer.innerHTML = '';

  for (const action of actionArray) {
    btnContainer.innerHTML += `
      <button class="btn action-btn" id="${action}"><img class="icon-in-btn" src="./icons/${action}.svg" alt="${action}"></button>
    `;
  }
}

function invertBtns() {
  const actionBtns = document.querySelectorAll('.action-btn');
  const iconInBtns = document.querySelectorAll('.icon-in-btn');
  actionBtns.forEach((btn) => btn.classList.add('white-box-shadow'));
  iconInBtns.forEach((icon) => icon.classList.add('white-icon'));
}

function renderEnding() {
  container.classList.add('none');
  document.body.classList.add('white-background');
  const ending = document.createElement('div');
  ending.classList.add('ending');
  ending.innerHTML = `
    <div>&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;</div>
    <div class="ending-message-container">
      <p>You saved the world!</p>
      <p>Thanks for playing</p>
    </div>
    <p class="small-font">2025 Daik</p>
    <div>&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;&#9734;</div>
    <button class="btn title-btn">Title</button>
  `;
  main.appendChild(ending);
}

function renderResult(humanMove, monsterMove) {
  let whiteIcon = '';
    
  if (wins >= 3) {
    whiteIcon = 'white-icon';
  }

  if (!humanMove) {
    humanMove = 'hat';
    const lowercasedMonsterArray = ['slime', 'goblin', 'lizard', 'skelton', 'dark-knight', 'dragon'];
    monsterMove = lowercasedMonsterArray[wins];
  }

  let humanEnergyBar = getIconHTML(humanEnergy);
  let monsterEnergyBar = getIconHTML(monsterEnergy);

  result.innerHTML = `
    <div class="result-board">
      <div class="icon-container">
        <p class="name">You</p>
        <img class="icon action-icon ${whiteIcon}" src="./icons/${humanMove}.svg" alt="${humanMove}">
        <div class="energy-display human-energy-display">${humanEnergyBar}</div>
      </div>
      <div class="sword-container"><img class="icon sword-icon ${whiteIcon}" src="./icons/sword-cross.svg" alt=""></div>
      <div class="icon-container">
        <p class="name">${currentMonster}</p>
        <img class="icon action-icon ${whiteIcon}" src="./icons/${monsterMove}.svg" alt="${monsterMove}">
        <div class="energy-display monster-energy-display">${monsterEnergyBar}</div>
      </div>
    </div>
    <div class="btn-container">
      <button class="btn back-btn hidden">Back</button>
      <button class="btn descend-btn hidden">Descend</button>
    </div>
  `;

  if (humanMove === 'dots-circle') {
    const actionIcons = document.querySelectorAll('.action-icon');
    actionIcons.forEach((icon) => icon.classList.add('rotate-circle'));
  }
}

function setupGame() {
  const numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
  main.classList.add(`win-${numberArray[wins]}`);

  if (wins === 0) {
    renderBattleMode();
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach((btn) => btn.addEventListener('click', playRound));
  } else if (wins === 3) {
    invertBtns();
  } else if (wins === 6) {
    renderEnding();
    const titleBtn = document.querySelector('.title-btn');
    titleBtn.addEventListener('click', () => resetGame('ending'));
    return;
  }

  const monsterArray = ['Slime', 'Goblin', 'Lizard', 'Skelton', 'Dark knight', 'Dragon'];
  currentMonster = monsterArray[wins];
  message.textContent = `You encountered a ${currentMonster}!`;
  const actionBtns = document.querySelectorAll('.action-btn');
  actionBtns.forEach((btn) => btn.classList.remove('initial-cursor'));
  btnIndex = 0;
  humanEnergy = 5;
  monsterEnergy = wins + 3;
  renderResult();
}

function resetGame(condition) {
  wins = 0;
  main.classList = 'main';
  
  if (condition === 'ending') {
    document.body.classList.remove('white-background');
    const ending = document.querySelector('.ending');
    main.removeChild(ending);
  }
  
  star.innerHTML = '&nbsp;';
  message.innerHTML = 'You came to the dungeon.';
  const enterBtn = document.createElement('button');
  enterBtn.classList.add('btn', 'enter-btn');
  enterBtn.textContent = 'Enter';
  btnContainer.innerHTML = '';
  btnContainer.appendChild(enterBtn);
  result.classList.add('hidden');
  renderResult();
  container.classList.remove('none');
  dungeon.classList.remove('none');
  ground.classList.remove('none');
  enterBtn.addEventListener('click', setupGame);
}

function handleKeydown(e) {
  const key = e.key;
  const enterBtn = document.querySelector('.enter-btn');
  const titleBtn = document.querySelector('.title-btn');
  const backBtn = document.querySelector('.back-btn');
  const descendBtn = document.querySelector('.descend-btn');
  const actionBtns = document.querySelectorAll('.action-btn');
  let activeElement = document.activeElement;

  if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
    if (activeElement === document.body) {
      if (enterBtn) {
        enterBtn.focus();
      } else if (titleBtn) {
        titleBtn.focus();
      } else if (!backBtn.classList.contains('hidden')) {
        backBtn.focus();
      } else {
        actionBtns[0].focus();
      }
    }
    
    if (activeElement === enterBtn) {
      link.focus();
    } else if (activeElement === link) {
      enterBtn.focus();
    } else if (activeElement === backBtn) {
      descendBtn.focus();
    } else if (activeElement === descendBtn) {
      backBtn.focus();
    }

    actionBtns.forEach((btn) => {
      if (activeElement === btn) {
        if (key === 'ArrowLeft' || e.key === 'ArrowUp') {
          btnIndex -= 1;

          if (btnIndex < 0) {
            btnIndex += actionBtns.length;
          }
        } else {
          btnIndex += 1;
          
          if (btnIndex >= actionBtns.length) {
            btnIndex -= actionBtns.length;
          }
        }
        
        actionBtns[btnIndex].focus();
      }
    });
  } 
}

const main = document.querySelector('.main');
const container = document.querySelector('.container');
const star = document.querySelector('.star');
const message = document.querySelector('.message');
const btnContainer = document.querySelector('.btn-container');
const result = document.querySelector('.result');
const dungeon = document.querySelector('.dungeon');
const ground = document.querySelector('.ground');
const link = document.querySelector('.link');
let wins = 0;
let humanEnergy = 0;
let monsterEnergy = 0;
let currentMonster = '';
let btnIndex = 0;
let fighting;

resetGame();
document.addEventListener('keydown', handleKeydown);
