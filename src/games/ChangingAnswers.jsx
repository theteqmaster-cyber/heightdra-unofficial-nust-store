"use client";
import { useState, useEffect } from 'react';

export default function ChangingAnswers({ level, onWin, onLoss }) {
  const [options, setOptions] = useState(["Correct", "Wrong", "Maybe", "No"]);
  const [answer, setAnswer] = useState("Correct");

  useEffect(() => {
    const interval = setInterval(() => {
      setOptions(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 800 - (level * 10));
    return () => clearInterval(interval);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>DON'T MISS! Answers are shuffling!</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>Click: {answer}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => o === answer ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', transition: 'all 0.2s' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
