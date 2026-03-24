"use client";
import { useState, useEffect } from 'react';

export default function CountFast({ level, onWin, onLoss }) {
  const count = Math.min(30, 5 + level * 2);
  const [items, setItems] = useState([]);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    const icons = ['🍕', '🍔', '🍟', '🍦', '🍩'];
    const i = icons[Math.floor(Math.random() * icons.length)];
    setItems(Array.from({ length: count }, () => i));
  }, [level, count]);

  const check = (e) => {
    e.preventDefault();
    if (parseInt(guess) === count) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>How many items?</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
        {items.map((icon, i) => (
          <span key={i} style={{ fontSize: '1.5rem' }}>{icon}</span>
        ))}
      </div>
      <form onSubmit={check}>
        <input 
          autoFocus
          type="number"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          style={{ fontSize: '2rem', padding: '10px', width: '150px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', color: 'white', border: '2px solid var(--accent-primary)', borderRadius: '12px' }}
        />
      </form>
    </div>
  );
}
