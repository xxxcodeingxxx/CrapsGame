'use strict';

// Selecting DOM Elements
const player1_DomEl = document.querySelector('.player--0');
const player2_DomEl = document.querySelector('.player--1');
const score1_DomEl = document.getElementById('score--0');
const score2_DomEl = document.getElementById('score--1');
const currentScore1_DomEl = document.getElementById('current--0');
const currentScore2_DomEl = document.getElementById('current--1');
const dice1_DomEl = document.querySelector('.dice--0');
const dice2_DomEl = document.querySelector('.dice--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1_DomEl.classList.toggle('player--active'); // Removes class if there & Adds class if not there...toggles
  player2_DomEl.classList.toggle('player--active'); // Same as above.....
};

let scores, currentScore, activePlayer, playing;

// starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1_DomEl.textContent = 0;
  score2_DomEl.textContent = 0;
  currentScore1_DomEl.textContent = 0;
  currentScore2_DomEl.textContent = 0;
  dice1_DomEl.classList.add('hidden');
  dice2_DomEl.classList.add('hidden');
  player1_DomEl.classList.remove('player--winner');
  player2_DomEl.classList.remove('player--winner');
  player1_DomEl.classList.add('player--active');
  player2_DomEl.classList.remove('player--active');
  document
    .querySelector(`.player-winner--${activePlayer}`)
    .classList.add('hidden');
};

// Initialize Game
init();

// Rolling Dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;
    const diceTotal = dice + dice2;
    console.log(diceTotal);
    // 2. Display Dice
    dice1_DomEl.classList.remove('hidden');
    dice2_DomEl.classList.remove('hidden');
    dice1_DomEl.src = `dice-${dice}.png`;
    dice2_DomEl.src = `dice-${dice2}.png`;

    // 3. Check for rolled 7 or 11 if true, switch to next player

    if (diceTotal === 7 || diceTotal === 11) {
      // Add dice to current score
      switchPlayer();
    } else {
      // Switch to next player
      currentScore += diceTotal; // Equals currentScore + currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    //    If so game over

    if (scores[activePlayer] >= 100) {
      playing = false;
      dice1_DomEl.classList.add('hidden');
      dice2_DomEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player-winner--${activePlayer}`)
        .classList.remove('hidden');
      document.getElementById(`score--${activePlayer}`).classList.add('name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player...
      switchPlayer();
    }
  }
});

// Reset the game at any point an time in game
btnNew.addEventListener('click', init);
