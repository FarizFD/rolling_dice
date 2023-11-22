import React, { useState } from 'react';
import '../App.css';
import dice1 from '../Asset/dice-1.png';
import dice2 from '../Asset/dice-2.png';
import dice3 from '../Asset/dice-3.png';
import dice4 from '../Asset/dice-4.png';
import dice5 from '../Asset/dice-5.png';
import dice6 from '../Asset/dice-6.png';

const App = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScores, setCurrentScores] = useState([0, 0]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [diceImage, setDiceImage] = useState(null);
  const [winner,setWinner] = useState(null)

  const switchPlayer = () => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[activePlayer] += currentScores[activePlayer];
      return newScores;
    });

    setCurrentScores([0, 0]);
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  const rollDice = () => {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;

      setCurrentScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[activePlayer] += dice;
        return newScores;
      });

      setDiceImage(getDiceImageSrc(dice));

      if (dice === 1) {
        switchPlayer();
      } else if (currentScores[activePlayer] >= 30 || scores[activePlayer] + currentScores[activePlayer] >= 30) {
        // Display success message
        setPlaying(false);
        // const winnerName = `Player ${activePlayer + 1}`;
        // alert(`${winnerName} wins with a score of ${scores[activePlayer] + currentScores[activePlayer]}! 🏆`);
        setWinner(activePlayer) 
    }
    }
  };

  const holdScore = () => {
    if (playing) {
      switchPlayer();
    }
  };

  const newGame = () => {
    setScores([0, 0]);
    setCurrentScores([0, 0]);
    setActivePlayer(0);
    setPlaying(true);
    setDiceImage(null);
  };

  const getDiceImageSrc = (diceNumber) => {
    const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
    return diceImages[diceNumber - 1];
  };

  return (
    <main className={winner !== null ? 'winner' : ''}>
      <section className={`player player--0 ${activePlayer === 0 && 'player--active'}`}>
        <h2 className="name" id="name--0">
          Player 1
        </h2>
        <p className="score" id="score--0">{`Score: ${scores[0]}`}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">{`Current Score: ${currentScores[0]}`}</p>
        </div>
      </section>

      <section className={`player player--1 ${activePlayer === 1 && 'player--active'}`}>
        <h2 className="name" id="name--1">
          Player 2
        </h2>
        <p className="score" id="score--1">{`Score: ${scores[1]}`}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">{`Current Score: ${currentScores[1]}`}</p>
        </div>
      </section>

      <img
        className={`dice ${playing ? '' : 'hidden'}`}
        src={diceImage}
        alt="Playing dice"
        style={{}}
      />
      <button className={`btn btn--new ${playing ? '' : 'hidden'}`} onClick={newGame}>
        🔄 New game
      </button>
      <button className={`btn btn--roll ${playing ? '' : 'hidden'}`} onClick={rollDice}>
        🎲 Roll dice
      </button>
      <button className={`btn btn--hold ${playing ? '' : 'hidden'}`} onClick={holdScore}>
        📥 Hold
      </button>
      {/* Success message for winning player */}
      {!playing && <p className="success-message">{`Player ${activePlayer + 1} wins! 🎉`}</p>}
    </main>
  );
};

export default App;