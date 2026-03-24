"use client";
import { useState, useEffect } from 'react';

export default function GuessNumber({ level, onWin, onLoss }) {
  const maxRange = 10 + (level * 10);
  const maxAttempts = Math.max(3, 10 - Math.floor(level / 5));
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("Enter a number");

  useEffect(() => {
    setTarget(Math.floor(Math.random() * maxRange) + 1);
    setAttempts(0);
    setFeedback(`Guess between 1 and ${maxRange}`);
    setGuess("");
  }, [level, maxRange]);

  const handleGuess = (e) => {
    e.preventDefault();
    const num = parseInt(guess);
    if (isNaN(num)) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === target) {
      setFeedback("CORRECT!");
      onWin(3, (maxAttempts - newAttempts + 1) * 500);
    } else if (newAttempts >= maxAttempts) {
      setFeedback(`Game Over! The number was ${target}`);
      onLoss();
    } else {
      setFeedback(num < target ? "Higher! ↑" : "Lower! ↓");
      setGuess("");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Range: 1 to {maxRange}</h2>
      <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', marginBottom: '30px' }}>
          {feedback}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Attempts: {attempts} / {maxAttempts}
        </p>
        <form onSubmit={handleGuess}>
          <input 
            type="number"
            autoFocus
            value={guess}
            onChange={e => setGuess(e.target.value)}
            style={{
              fontSize: '3rem', padding: '10px', width: '200px', textAlign: 'center',
              background: 'rgba(0,0,0,0.3)', color: 'white', border: '2px solid var(--accent-primary)',
              borderRadius: '16px', outline: 'none'
            }}
          />
        </form>
      </div>
    </div>
  );
}
