"use client";
import { useState, useEffect } from 'react';

export default function LuckyGuess({ level, onWin, onLoss }) {
  const options = ["Option A", "Option B", "Option C", "Option D"];
  const [luckyIndex, setLuckyIndex] = useState(0);

  useEffect(() => {
    setLuckyIndex(Math.floor(Math.random() * 4));
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>No logic — just vibes. Pick the lucky button! 🎲</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => i === luckyIndex ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '40px', color: 'white', fontSize: '1.2rem' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
