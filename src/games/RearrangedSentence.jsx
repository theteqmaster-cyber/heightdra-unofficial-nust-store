"use client";
import { useState, useEffect } from 'react';

const SENTENCES = [
  { s: "Fast the ran dog.", a: "The dog ran fast.", o: ["The fast dog ran.", "The dog ran fast.", "Fast ran the dog."] },
  { s: "Blue is sky the.", a: "The sky is blue.", o: ["Sky is the blue.", "Blue is the sky.", "The sky is blue."] }
];

export default function RearrangedSentence({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    const s = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setCurrent({ ...s, options: [...s.o].sort(() => Math.random() - 0.5) });
  }, [level]);

  const select = (o) => {
    if (o === current.a) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>What's the correct sentence?</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', color: 'var(--accent-primary)' }}>"{current.s}"</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {current.options?.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px', color: 'white', fontSize: '1.1rem' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
