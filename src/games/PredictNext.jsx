"use client";
import { useState, useEffect } from 'react';

export default function PredictNext({ level, onWin, onLoss }) {
  const q = "Predict the topic of the NEXT question:";
  const options = ["Math", "History", "Campus", "Random"];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Meta Trivia 🔮</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '80px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
      <p style={{ marginTop: '30px', opacity: 0.6 }}>Your prediction was correct! (Obviously) 😂</p>
    </div>
  );
}
