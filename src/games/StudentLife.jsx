"use client";
import { useState, useEffect } from 'react';

const LIFE = [
  { q: "How many meals skipped this week?", a: "Too many 😭", o: ["0", "1", "Too many 😭", "I only eat once a day"] },
  { q: "What's in your fridge right now?", a: "Water and hope", o: ["Fresh veggies", "Leftover pizza", "Water and hope", "Empty space"] }
];

export default function StudentLife({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent(LIFE[Math.floor(Math.random() * LIFE.length)]);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Student Life 🍜</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '50px' }}>{current.q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.o?.map((o, i) => (
          <button key={i} onClick={() => o === current.a ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '20px', color: 'white' }}>{o}</button>
        )) || LIFE[0].o.map(o => (
           <button key={o} onClick={() => o === current.a ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '20px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
