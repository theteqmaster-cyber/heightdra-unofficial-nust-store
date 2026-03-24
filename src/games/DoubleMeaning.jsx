"use client";
import { useState, useEffect } from 'react';

const MEANINGS = [
  { w: "Bark", m1: "Sound a dog makes", m2: "Outer layer of a tree", a: "Both" },
  { w: "Bat", m1: "Tool for baseball", m2: "Flying mammal", a: "Both" },
  { w: "Crane", m1: "A large bird", m2: "A construction machine", a: "Both" }
];

export default function DoubleMeaning({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent(MEANINGS[Math.floor(Math.random() * MEANINGS.length)]);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Double Meaning!</h3>
      <h1 style={{ fontSize: '5rem', color: 'var(--accent-primary)', marginBottom: '40px' }}>{current.w}</h1>
      <div style={{ display: 'grid', gap: '20px' }}>
        <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px', fontSize: '1.2rem', color: 'white' }}>
          Meaning 1: {current.m1}<br/>AND<br/>Meaning 2: {current.m2}
        </button>
        <button onClick={() => onLoss()} className="glass-panel" style={{ padding: '30px', fontSize: '1.2rem', color: 'white' }}>
          It only means one of these
        </button>
      </div>
    </div>
  );
}
