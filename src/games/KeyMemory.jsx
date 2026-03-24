"use client";
import { useState, useEffect } from 'react';

const KEYS = "QWERTYUIOPASDFGHJKLZXCVBNM";

export default function KeyMemory({ level, onWin, onLoss }) {
  const count = Math.min(10, 3 + Math.floor(level / 5));
  const [sequence, setSequence] = useState([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState('memorize');

  useEffect(() => {
    const s = Array.from({ length: count }, () => KEYS[Math.floor(Math.random() * KEYS.length)]).join("");
    setSequence(s);
    const time = Math.max(1000, 3000 - level * 100);
    setTimeout(() => setPhase('input'), time);
  }, [level, count]);

  const check = (e) => {
    const val = e.target.value.toUpperCase();
    setInput(val);
    if (val === sequence) {
      onWin(3, 1000);
    } else if (val.length >= sequence.length || !sequence.startsWith(val)) {
      if (val !== sequence.substring(0, val.length)) onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>{phase === 'memorize' ? 'MEMORIZE KEYS!' : 'TYPE FROM MEMORY!'}</h3>
      {phase === 'memorize' ? (
        <h1 style={{ fontSize: '5rem', color: 'var(--accent-primary)', letterSpacing: '10px' }}>{sequence}</h1>
      ) : (
        <input 
          autoFocus
          value={input}
          onChange={check}
          style={{
            fontSize: '3rem', padding: '20px', width: '400px', textAlign: 'center',
            background: 'rgba(0,0,0,0.3)', color: 'white', border: '2px solid var(--accent-primary)',
            borderRadius: '16px', outline: 'none', letterSpacing: '10px'
          }}
        />
      )}
    </div>
  );
}
