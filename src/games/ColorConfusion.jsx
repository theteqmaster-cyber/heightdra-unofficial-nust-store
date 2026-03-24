"use client";
import { useState, useEffect } from 'react';

export default function ColorConfusion({ level, onWin, onLoss }) {
  const [word, setWord] = useState({ text: "", color: "" });
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const colors = ["RED", "BLUE", "GREEN", "YELLOW"];
    const w = colors[Math.floor(Math.random() * colors.length)];
    const c = colors[Math.floor(Math.random() * colors.length)];
    setWord({ text: w, color: c });
    setTarget(c);
    setOptions(colors.sort(() => Math.random() - 0.5));
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Pick the COLOR of the word (Not what it says!)</h3>
      <h1 style={{ fontSize: '6rem', color: word.color.toLowerCase(), marginBottom: '60px', fontWeight: '900' }}>
        {word.text}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === target ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', backgroundColor: `${o.toLowerCase()}22` }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
