"use client";
import { useState, useEffect } from 'react';

export default function SpeedMath({ level, onWin, onLoss }) {
  const [equation, setEquation] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [solved, setSolved] = useState(0);

  const targetToSolve = Math.floor(3 + level / 2.5);

  const generateEquation = () => {
    const maxNumber = 10 + level * 5;
    const a = Math.floor(Math.random() * maxNumber) + 1;
    const b = Math.floor(Math.random() * maxNumber) + 1;
    const isAddition = Math.random() > 0.5 || level < 5;
    if (isAddition) {
      setEquation(`${a} + ${b}`);
      setCorrectAnswer(a + b);
    } else {
      setEquation(`${Math.max(a, b)} - ${Math.min(a, b)}`);
      setCorrectAnswer(Math.max(a, b) - Math.min(a, b));
    }
  };

  useEffect(() => {
    generateEquation();
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onLoss();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onLoss]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer, 10) === correctAnswer) {
      const newSolved = solved + 1;
      setSolved(newSolved);
      setAnswer('');
      if (newSolved >= targetToSolve) {
        onWin(3, timeLeft * 50); // MVP 3 stars
      } else {
        generateEquation();
        setTimeLeft(t => t + Math.max(3, 8 - Math.floor(level / 5))); // Bonus time per solve
      }
    } else {
      setTimeLeft(t => t - 3); // Penalize wrong answer heavily
      setAnswer('');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '20px', fontSize: '1.5rem', color: timeLeft <= 5 ? '#ff4d4d' : 'var(--accent-primary)' }}>
        Time Left: {timeLeft}s
      </div>
      <div className="glass-panel" style={{ padding: '40px', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '30px', letterSpacing: '2px' }}>{equation} = ?</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            value={answer} 
            onChange={e => setAnswer(e.target.value)}
            style={{ 
              fontSize: '2.5rem', padding: '15px', width: '200px', textAlign: 'center', 
              background: 'rgba(255,255,255,0.05)', color: 'white', border: '2px solid var(--accent-primary)',
              borderRadius: '16px', outline: 'none'
            }}
            autoFocus
          />
        </form>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 'bold' }}>Solved: {solved} / {targetToSolve}</p>
    </div>
  );
}
