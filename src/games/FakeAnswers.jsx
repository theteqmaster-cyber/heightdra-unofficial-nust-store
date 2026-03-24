"use client";
import { useState, useEffect } from 'react';

export default function FakeAnswers({ level, onWin, onLoss }) {
  const q = "What is 5 + 5?";
  const options = ["10", "Ten", "10.0", "None of these"];
  const [correctIdx, setCorrectIdx] = useState(0);

  useEffect(() => {
    setCorrectIdx(Math.floor(Math.random() * 3)); // One of the first 3 is "technically" correct
  }, [level]);

  const select = (idx) => {
    // Hidden trick: level affects which "variation" is correct
    if (idx === correctIdx) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>One of these is a FAKE. Pick the real one.</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '60px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(i)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
