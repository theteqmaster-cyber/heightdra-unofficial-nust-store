"use client";
import { useState, useEffect } from 'react';

export default function ConfidenceTest({ level, onWin, onLoss }) {
  const [val, setVal] = useState(50);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Confidence Test 🧠</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '60px' }}>How sure are you that you will win the next game?</h2>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={val} 
        onChange={(e) => setVal(e.target.value)} 
        style={{ width: '80%', marginBottom: '40px' }}
      />
      <div style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '40px' }}>{val}%</div>
      <button onClick={() => onWin(3, 1000)} className="play-btn-main">SUBMIT CONFIDENCE</button>
    </div>
  );
}
