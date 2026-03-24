"use client";
import { useState, useEffect } from 'react';

const COMMON = [
  { q: "Can you put an elephant in a fridge?", a: "Yes, open door, put in, close door", o: ["No way", "Yes, open door, put in, close door", "Only if it's a big fridge", "Elephants don't like cold"] },
  { q: "How do you put a giraffe in the fridge?", a: "Open door, remove elephant, put in giraffe, close door", o: ["Same way as elephant", "Open door, remove elephant, put in giraffe, close door", "Giraffes are too tall", "Ask John"] },
  { q: "The Lion King is hosting an animal conference. One animal doesn't attend. Who?", a: "The Giraffe (still in the fridge)", o: ["The Elephant", "The Hyena", "The Giraffe (still in the fridge)", "The Mouse"] }
];

export default function CommonSense({ level, onWin, onLoss }) {
  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent({ ...COMMON[idx], options: [...COMMON[idx].o].sort(() => Math.random() - 0.5) });
  }, [idx]);

  const select = (o) => {
    if (o === COMMON[idx].a) {
      if (idx === COMMON.length - 1) onWin(3, 1000);
      else setIdx(idx + 1);
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Logic Chain: Step {idx + 1}</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>{current.q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.options?.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
