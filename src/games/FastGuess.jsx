"use client";
import { useState, useEffect } from 'react';

export default function FastGuess({ level, onWin, onLoss }) {
  const [timeLeft, setTimeLeft] = useState(3000 - (level * 50));
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const questions = [
      { q: "2 + 2?", a: "4", o: ["3", "4", "5", "22"] },
      { q: "Color of sky?", a: "Blue", o: ["Red", "Green", "Blue", "Yellow"] }
    ];
    const s = questions[Math.floor(Math.random() * questions.length)];
    setQ(s.q);
    setA(s.a);
    setOptions(s.o.sort(() => Math.random() - 0.5));

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onLoss();
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', color: '#ff4d4d', marginBottom: '20px' }}>TIME: {(timeLeft/1000).toFixed(1)}s</div>
      <h2 style={{ fontSize: '3rem', marginBottom: '50px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === a ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
