"use client";
import { useState, useEffect } from 'react';

export default function CaseSwitch({ level, onWin, onLoss }) {
  const [target, setTarget] = useState("");
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("UPPER"); // to UPPER or to LOWER
  const [score, setScore] = useState(0);
  const targetScore = Math.min(10, 3 + Math.floor(level / 5));

  const generate = () => {
    const words = ["NEXT", "REACT", "NUST", "CHILL", "ZONE", "CODE", "GAME"];
    const m = Math.random() > 0.5 ? "UPPER" : "LOWER";
    setMode(m);
    const word = words[Math.floor(Math.random() * words.length)];
    setTarget(m === "UPPER" ? word.toLowerCase() : word.toUpperCase());
    setInput("");
  };

  useEffect(() => {
    generate();
  }, [level]);

  const check = (e) => {
    const val = e.target.value;
    setInput(val);
    const expected = mode === "UPPER" ? target.toUpperCase() : target.toLowerCase();
    if (val === expected) {
      const next = score + 1;
      setScore(next);
      if (next >= targetScore) onWin(3, 1000);
      else generate();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>Convert to {mode}! ({score}/{targetScore})</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '40px', color: 'var(--accent-primary)' }}>{target}</h1>
      <input 
        autoFocus
        value={input}
        onChange={check}
        style={{
          fontSize: '2rem', padding: '15px', width: '300px', textAlign: 'center',
          background: 'rgba(0,0,0,0.3)', color: 'white', border: '2px solid var(--accent-primary)',
          borderRadius: '12px', outline: 'none'
        }}
        placeholder="Type here..."
      />
    </div>
  );
}
