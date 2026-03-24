"use client";
import { useState, useEffect } from 'react';

export default function FlipLogic({ level, onWin, onLoss }) {
  const [mode, setMode] = useState('NORMAL'); // NORMAL or REVERSE
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(8, 3 + Math.floor(level / 5));

  const generate = () => {
    const nextMode = Math.random() > 0.4 ? 'REVERSE' : 'NORMAL';
    setMode(nextMode);
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const isEven = (a + b) % 2 === 0;
    setQuestion(`Is ${a} + ${b} even?`);
    setAnswer(nextMode === 'NORMAL' ? isEven : !isEven);
    setOptions([true, false]);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (val) => {
    if (val === answer) {
      const next = score + 1;
      setScore(next);
      if (next >= targetScore) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ padding: '10px 30px', background: mode === 'REVERSE' ? '#ff4d4d' : 'var(--accent-primary)', color: 'black', borderRadius: '30px', display: 'inline-block', marginBottom: '30px', fontWeight: 'bold' }}>
        {mode === 'REVERSE' ? 'PICK THE WRONG ANSWER!' : 'PICK THE CORRECT ANSWER!'}
      </div>
      <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>{question}</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px 50px', fontSize: '1.5rem', color: 'white' }}>
            {o.toString().toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
