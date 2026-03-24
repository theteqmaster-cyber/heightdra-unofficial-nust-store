"use client";
import { useState, useEffect } from 'react';

export default function WhatComesNextWeird({ level, onWin, onLoss }) {
  const [pattern, setPattern] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const p = [
      { q: "M, T, W, T, ?", a: "F", o: ["S", "F", "M", "W"] }, // Days
      { q: "1, 2, 4, 8, ?", a: "16", o: ["10", "12", "16", "20"] },
      { q: "J, F, M, A, ?", a: "M", o: ["J", "S", "M", "A"] } // Months
    ];
    const sel = p[Math.floor(Math.random() * p.length)];
    setPattern(sel.q);
    setAnswer(sel.a);
    setOptions(sel.o.sort(() => Math.random() - 0.5));
  }, [level]);

  const select = (o) => {
    if (o === answer) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>What comes next?</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px', color: 'var(--accent-primary)' }}>{pattern}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '30px', fontSize: '1.5rem', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
