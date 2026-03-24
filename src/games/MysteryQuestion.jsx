"use client";
import { useState, useEffect } from 'react';

export default function MysteryQuestion({ level, onWin, onLoss }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Mystery Question 📦</h3>
      <div style={{ 
        padding: '60px', 
        background: revealed ? 'none' : 'rgba(255,255,255,0.05)', 
        borderRadius: '30px', 
        marginBottom: '40px',
        border: '1px dashed rgba(255,255,255,0.2)'
      }}>
        {revealed ? (
          <h2 style={{ fontSize: '2.5rem' }}>Are you having fun?</h2>
        ) : (
          <h2 style={{ opacity: 0.2 }}>QUESTION HIDDEN</h2>
        )}
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="play-btn-main">REVEAL</button>
      ) : (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '20px 40px', color: 'white' }}>YES</button>
          <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '20px 40px', color: 'white' }}>ABSOLUTELY</button>
        </div>
      )}
    </div>
  );
}
