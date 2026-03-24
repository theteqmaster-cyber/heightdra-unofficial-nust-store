"use client";
import { useState, useEffect } from 'react';

export default function MathWordSwitch({ level, onWin, onLoss }) {
  const [mode, setMode] = useState('WORD'); // WORD or MATH
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(15, 5 + level);
  const [options, setOptions] = useState([]);

  const generate = () => {
    const nextMode = Math.random() > 0.5 ? 'WORD' : 'MATH';
    setMode(nextMode);
    
    if (nextMode === 'MATH') {
      const a = Math.floor(Math.random() * 20);
      const b = Math.floor(Math.random() * 20);
      setQuestion(`${a} + ${b} = ?`);
      const ans = a + b;
      setAnswer(ans);
      setOptions([ans, ans + 2, ans - 3, ans + 10].sort(() => Math.random() - 0.5));
    } else {
      const words = ["UNIVERSITY", "SCIENCE", "STUDENT", "COFFEE", "LAPTOP"];
      const w = words[Math.floor(Math.random() * words.length)];
      setQuestion(`Is '${w}' spelled correctly?`);
      setAnswer(true);
      setOptions([true, false]);
    }
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (val) => {
    if (val === answer) {
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
      <div style={{ padding: '10px 20px', background: mode === 'MATH' ? '#fcd11622' : '#66fcf122', borderRadius: '12px', display: 'inline-block', marginBottom: '20px', color: mode === 'MATH' ? '#fcd116' : '#66fcf1' }}>
        MODE: {mode}
      </div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>{question}</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px 40px', fontSize: '1.5rem', color: 'white' }}>
            {o.toString()}
          </button>
        ))}
      </div>
    </div>
  );
}
