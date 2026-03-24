"use client";
import { useState, useEffect } from 'react';

const LOGIC_POOL = [
  { q: "4 + 5 = 9", a: true },
  { q: "10 - 3 = 6", a: false },
  { q: "Is 'Apple' a fruit?", a: true },
  { q: "Does 2 * 2 = 5?", a: false },
  { q: "Is the sky green?", a: false },
  { q: "Is 11 > 10?", a: true },
  { q: "Is 'Cat' a bird?", a: false },
  { q: "Does 100 / 10 = 10?", a: true }
];

export default function TrueFalse({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState(null);
  const [streak, setStreak] = useState(0);
  const targetStreak = Math.min(10, 3 + Math.floor(level / 5));

  const generate = () => {
    const q = LOGIC_POOL[Math.floor(Math.random() * LOGIC_POOL.length)];
    setCurrent(q);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const answer = (val) => {
    if (val === current.a) {
      const next = streak + 1;
      setStreak(next);
      if (next >= targetStreak) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>Streak: {streak}/{targetStreak}</h3>
      <div className="glass-panel" style={{ padding: '60px', borderRadius: '24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem' }}>{current?.q}</h2>
      </div>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <button onClick={() => answer(true)} className="glass-panel" style={{ padding: '20px 60px', fontSize: '1.5rem', background: 'var(--accent-primary)', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>TRUE</button>
        <button onClick={() => answer(false)} className="glass-panel" style={{ padding: '20px 60px', fontSize: '1.5rem', background: '#ff4d4d', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>FALSE</button>
      </div>
    </div>
  );
}
