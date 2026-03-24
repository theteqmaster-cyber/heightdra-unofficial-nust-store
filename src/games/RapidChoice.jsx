"use client";
import { useState, useEffect } from 'react';

export default function RapidChoice({ level, onWin, onLoss }) {
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(15, 5 + Math.floor(level / 3));
  const [timeLeft, setTimeLeft] = useState(3);

  const generate = () => {
    const possible = ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE"];
    const t = possible[Math.floor(Math.random() * possible.length)];
    setTarget(t);
    const opts = [t, possible[(possible.indexOf(t) + 1) % possible.length]];
    setOptions(opts.sort(() => Math.random() - 0.5));
    setTimeLeft(Math.max(1, 4 - level / 10));
  };

  useEffect(() => {
    generate();
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) onLoss();
    const t = setInterval(() => setTimeLeft(x => Math.max(0, x - 0.1)), 100);
    return () => clearInterval(t);
  }, [timeLeft]);

  const select = (o) => {
    if (o === target) {
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
      <h3 style={{ marginBottom: '10px' }}>Match the text! ({score}/{targetScore})</h3>
      <div style={{ height: '5px', width: '100%', background: 'rgba(255,255,255,0.1)', marginBottom: '30px' }}>
        <div style={{ height: '100%', background: '#66fcf1', width: `${timeLeft * 10}%`, transition: 'width 0.1s linear' }} />
      </div>
      <h1 style={{ fontSize: '4rem', marginBottom: '40px' }}>{target}</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px 40px', fontSize: '1.5rem', color: 'white', cursor: 'pointer' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
