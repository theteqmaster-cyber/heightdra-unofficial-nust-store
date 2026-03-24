"use client";
import { useState, useEffect } from 'react';

export default function MathTrick({ level, onWin, onLoss }) {
  const [q, setQ] = useState("0 + 0 = ?");
  const [a, setA] = useState("0");
  const [options, setOptions] = useState(["0", "1", "10", "None"]);

  useEffect(() => {
    const tricks = [
      { q: "2 + 2 * 2", a: "6", o: ["8", "6", "4", "2"] },
      { q: "10 - 10 * 0", a: "10", o: ["0", "10", "100", "5"] },
      { q: "Dividing by zero gives?", a: "Error", o: ["Zero", "Infinity", "Error", "One"] }
    ];
    const s = tricks[Math.floor(Math.random() * tricks.length)];
    setQ(s.q);
    setA(s.a);
    setOptions(s.o.sort(() => Math.random() - 0.5));
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Don't fall for it!</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px' }}>{q}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === a ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
