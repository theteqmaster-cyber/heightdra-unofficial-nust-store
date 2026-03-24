"use client";
import { useState, useEffect } from 'react';

export default function ChaosChoices({ level, onWin, onLoss }) {
  const q = "Which one of these is the most correct?";
  const options = ["This one", "No, this one", "Probably this", "Actually this"];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Chaos Choices 🤡</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '80px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => Math.random() > 0.5 ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '40px', color: 'white', fontSize: '1.2rem' }}>{o}</button>
        ))}
      </div>
      <p style={{ marginTop: '30px', opacity: 0.5 }}>Pure chaos. 50/50 chance for any button. Good luck!</p>
    </div>
  );
}
