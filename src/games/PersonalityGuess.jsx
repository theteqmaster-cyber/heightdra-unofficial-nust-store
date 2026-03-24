"use client";
import { useState, useEffect } from 'react';

export default function PersonalityGuess({ level, onWin, onLoss }) {
  const options = ["The Procrastinator", "The Library Ghost", "The Tech Wizard", "The Social Butterfly"];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px', color: 'var(--accent-primary)' }}>Personality Check 🎭</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '60px' }}>What type of student are you?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => onWin(5, 2000)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
      <p style={{ marginTop: '40px', opacity: 0.6 }}>Final Game! Celebrating your unique vibes. 🎉</p>
    </div>
  );
}
