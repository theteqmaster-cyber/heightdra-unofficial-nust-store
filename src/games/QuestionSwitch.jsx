"use client";
import { useState, useEffect } from 'react';

export default function QuestionSwitch({ level, onWin, onLoss }) {
  const [q, setQ] = useState("What is 1 + 1?");
  const [a, setA] = useState("2");
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQ("Wait... what is 2 + 2?");
      setA("4");
      setSwapping(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>{swapping ? "WATCH OUT! It changed!" : "Thinking..."}</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '60px', color: swapping ? '#ff4d4d' : 'white' }}>{q}</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {["2", "4", "6", "8"].map(o => (
          <button key={o} onClick={() => o === a ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '30px 50px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
