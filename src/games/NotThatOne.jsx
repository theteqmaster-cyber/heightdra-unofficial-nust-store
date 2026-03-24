"use client";
import { useState, useEffect } from 'react';

export default function NotThatOne({ level, onWin, onLoss }) {
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const items = ["Apple", "Banana", "Car", "Grape"];
    const fruit = items.slice(0, 2).concat(items.slice(3));
    const nonFruit = "Car";
    setOptions(items.sort(() => Math.random() - 0.5));
    setTarget(nonFruit);
  }, [level]);

  const select = (o) => {
    if (o === target) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Pick the ODD one out (The one that DOESN'T fit):</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '30px', color: 'white', fontSize: '1.2rem' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
