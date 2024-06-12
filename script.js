'use strict';

const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
let score1 = document.querySelector('#score--0');
let score2 = document.querySelector('#score--1');
let diceElement = document.querySelector('.dice');

let currentScore, playing, scores, activePlayer;

const init = function () {
  //starting conditions
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0]; // global scores of both the players
  score1.textContent = 0;
  score2.textContent = 0;
  diceElement.classList.add('hidden');

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice, invoking the roll dice button
btnRollDice.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;

    // Check for rolled 1
    if (diceNumber !== 1) {
      currentScore = currentScore + diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else if (diceNumber === 1) {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if players score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
