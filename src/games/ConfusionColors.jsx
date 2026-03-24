"use client";
import { useState, useEffect } from 'react';

const COLORS = [
  { name: 'RED', color: '#ff4d4d' },
  { name: 'BLUE', color: '#66fcf1' },
  { name: 'YELLOW', color: '#fcd116' },
  { name: 'GREEN', color: '#45a29e' },
  { name: 'PURPLE', color: '#b266ff' }
];

export default function ConfusionColors({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(15, 5 + level);

  const generate = () => {
    const textObj = COLORS[Math.floor(Math.random() * COLORS.length)];
    const colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
    setCurrent({ text: textObj.name, color: colorObj.color, answer: colorObj.name });
    setOptions(COLORS.map(c => c.name).sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (name) => {
    if (name === current.answer) {
      const s = score + 1;
      setScore(s);
      if (s >= targetScore) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Pick the COLOR of the word! ({score}/{targetScore})</h3>
      <h1 style={{ fontSize: '5rem', color: current.color, marginBottom: '40px', fontWeight: '900' }}>
        {current.text}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {options.map((name, i) => (
          <button key={i} onClick={() => select(name)} className="glass-panel" style={{ padding: '20px', fontSize: '1.2rem', color: 'white' }}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
