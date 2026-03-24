"use client";
import { useState, useEffect } from 'react';

export default function MemoryMatrix({ level, onWin, onLoss }) {
  const gridSize = Math.min(6, Math.floor(3 + level / 8)); 
  const numTargets = Math.min(15, 3 + Math.floor(level / 2.5));

  const [phase, setPhase] = useState('showing'); 
  const [targets, setTargets] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Generate targets
    const newTargets = [];
    while(newTargets.length < numTargets) {
      const idx = Math.floor(Math.random() * (gridSize * gridSize));
      if (!newTargets.includes(idx)) newTargets.push(idx);
    }
    setTargets(newTargets);
    setPhase('showing');
    setGuesses([]);

    const showTime = Math.max(800, 2000 - level * 40);

    const timer = setTimeout(() => {
      setPhase('guessing');
    }, showTime); 

    return () => clearTimeout(timer);
  }, [level, gridSize, numTargets]);

  const handleTileClick = (idx) => {
    if (phase !== 'guessing') return;
    if (guesses.includes(idx)) return; // already guessed
    
    if (targets.includes(idx)) {
      const newGuesses = [...guesses, idx];
      setGuesses(newGuesses);
      if (newGuesses.length === targets.length) {
        setPhase('done');
        onWin(3, 1000); // hardcoded 3 stars for MVP
      }
    } else {
      setPhase('done');
      onLoss();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)', letterSpacing: '2px' }}>
        {phase === 'showing' ? 'MEMORIZE THE PATTERN' : 'RECALL THE PATTERN'}
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '12px',
        background: 'var(--panel-bg)',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        border: '1px solid var(--panel-border)'
      }}>
        {Array(gridSize * gridSize).fill(0).map((_, idx) => {
          const isTarget = targets.includes(idx);
          const isGuessed = guesses.includes(idx);
          const isShowing = phase === 'showing' && isTarget;
          
          let bgColor = 'rgba(255,255,255,0.03)';
          let boxShadow = 'none';
          let border = '1px solid rgba(255,255,255,0.1)';

          if (isShowing) {
            bgColor = 'var(--accent-primary)';
            boxShadow = '0 0 20px var(--accent-primary)';
            border = '1px solid var(--accent-primary)';
          } else if (isGuessed) {
            bgColor = 'var(--nust-accent)';
            boxShadow = '0 0 20px var(--nust-accent)';
            border = '1px solid var(--nust-accent)';
          } else if (phase === 'done' && isTarget) {
            bgColor = 'rgba(102, 252, 241, 0.2)'; 
          }

          const tileSize = gridSize > 4 ? '50px' : '70px';

          return (
            <div 
              key={idx}
              onClick={() => handleTileClick(idx)}
              style={{
                width: tileSize,
                height: tileSize,
                borderRadius: '12px',
                background: bgColor,
                boxShadow: boxShadow,
                border: border,
                cursor: phase === 'guessing' ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                transform: isShowing || isGuessed ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          );
        })}
      </div>
      <p style={{ marginTop: '25px', color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Found: {guesses.length} / {targets.length}
      </p>
    </div>
  );
}
