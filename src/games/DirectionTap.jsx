"use client";
import { useState, useEffect } from 'react';

const DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
const SYMBOLS = { UP: '↑', DOWN: '↓', LEFT: '←', RIGHT: '→' };

export default function DirectionTap({ level, onWin, onLoss }) {
  const [target, setTarget] = useState('UP');
  const [score, setScore] = useState(0);
  const targetScore = Math.min(20, 5 + level);
  const reversed = level > 15;

  const generate = () => {
    setTarget(DIRECTIONS[Math.floor(Math.random() * 4)]);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const handleKey = (dir) => {
    const correct = reversed ? (dir === getOpposite(target)) : (dir === target);
    if (correct) {
      const s = score + 1;
      setScore(s);
      if (s >= targetScore) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  const getOpposite = (d) => {
    if (d === 'UP') return 'DOWN';
    if (d === 'DOWN') return 'UP';
    if (d === 'LEFT') return 'RIGHT';
    return 'LEFT';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>{reversed ? 'TAP OPPOSITE!' : 'TAP DIRECTION!'} ({score}/{targetScore})</h3>
      <h1 style={{ fontSize: '6rem', color: '#66fcf1', marginBottom: '40px', textShadow: '0 0 20px #66fcf1' }}>{SYMBOLS[target]}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        <div /> <button onClick={() => handleKey('UP')} className="glass-panel" style={{ padding: '20px', fontSize: '2rem' }}>↑</button> <div />
        <button onClick={() => handleKey('LEFT')} className="glass-panel" style={{ padding: '20px', fontSize: '2rem' }}>←</button>
        <button onClick={() => handleKey('DOWN')} className="glass-panel" style={{ padding: '20px', fontSize: '2rem' }}>↓</button>
        <button onClick={() => handleKey('RIGHT')} className="glass-panel" style={{ padding: '20px', fontSize: '2rem' }}>→</button>
      </div>
    </div>
  );
}
