"use client";
import { useState, useEffect } from 'react';

const SENSE = [
  { s1: "The sun rises in the east.", s2: "The sun rises in the fridge.", a: 1 },
  { s1: "I drink water when I'm hungry.", s2: "I drink water when I'm thirsty.", a: 2 },
  { s1: "Rain falls from the ground.", s2: "Rain falls from the sky.", a: 2 }
];

export default function WhichMakesSense({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent(SENSE[Math.floor(Math.random() * SENSE.length)]);
  }, [level]);

  const select = (idx) => {
    if (idx === current.a) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Which makes sense?</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        <button onClick={() => select(1)} className="glass-panel" style={{ padding: '30px', fontSize: '1.2rem', color: 'white' }}>{current.s1}</button>
        <button onClick={() => select(2)} className="glass-panel" style={{ padding: '30px', fontSize: '1.2rem', color: 'white' }}>{current.s2}</button>
      </div>
    </div>
  );
}
