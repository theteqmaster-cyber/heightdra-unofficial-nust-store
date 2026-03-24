"use client";
import { useState, useEffect } from 'react';

export default function MemoryTrivia({ level, onWin, onLoss }) {
  const [step, setStep] = useState(1);
  const [remember, setRemember] = useState("");

  useEffect(() => {
    const words = ["Apple", "Blue", "NUST", "Chill"];
    setRemember(words[Math.floor(Math.random() * words.length)]);
  }, [level]);

  if (step === 1) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>REMEMBER THIS WORD:</h2>
        <h1 style={{ fontSize: '5rem', color: 'var(--accent-primary)', margin: '40px 0' }}>{remember}</h1>
        <button onClick={() => setStep(2)} className="play-btn-main">I GOT IT</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '40px' }}>Question: Which word did you just see?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {["Apple", "Blue", "NUST", "Chill", "Water", "Library"].sort().map(w => (
          <button key={w} onClick={() => w === remember ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '20px', color: 'white' }}>{w}</button>
        ))}
      </div>
    </div>
  );
}
