"use client";
import { useState, useEffect } from 'react';

export default function PositionMemory({ level, onWin, onLoss }) {
  const gridSize = Math.min(7, 3 + Math.floor(level / 8));
  const dotCount = Math.min(12, 3 + Math.floor(level / 3));
  const [dots, setDots] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [phase, setPhase] = useState('memorize');

  useEffect(() => {
    const d = [];
    while(d.length < dotCount) {
      const idx = Math.floor(Math.random() * (gridSize * gridSize));
      if (!d.includes(idx)) d.push(idx);
    }
    setDots(d);
    
    const memoTime = Math.max(500, 2000 - level * 50);
    setTimeout(() => setPhase('guess'), memoTime);
  }, [level, gridSize, dotCount]);

  const tileClick = (idx) => {
    if (phase !== 'guess') return;
    if (guesses.includes(idx)) return;
    if (dots.includes(idx)) {
      const next = [...guesses, idx];
      setGuesses(next);
      if (next.length === dots.length) onWin(3, 1000);
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        {phase === 'memorize' ? 'REMEMBER POSITIONS' : 'RECALL POSITIONS'}
      </h3>
      <div style={{ 
        display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '10px',
        padding: '20px', background: 'var(--panel-bg)', borderRadius: '16px'
      }}>
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div 
            key={i}
            onClick={() => tileClick(i)}
            style={{
              width: '50px', height: '50px', borderRadius: '8px',
              background: (phase === 'memorize' && dots.includes(i)) || guesses.includes(i) ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
              border: '1px solid var(--panel-border)',
              cursor: phase === 'guess' ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
}
