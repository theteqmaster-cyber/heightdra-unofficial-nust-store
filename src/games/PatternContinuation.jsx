"use client";
import { useState, useEffect } from 'react';

const SHAPES = ['●', '■', '▲', '◆', '✖', '★'];

export default function PatternContinuation({ level, onWin, onLoss }) {
  const [seq, setSeq] = useState([]);
  const [options, setOptions] = useState([]);
  const [target, setTarget] = useState("");

  const generate = () => {
    const s1 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const s2 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const pattern = [s1, s1, s2, s1, s1, s2, s1]; // Easy AAB AAB A style
    const t = s1;
    
    // Harder patterns for high levels
    if (level > 15) {
      const s3 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      setSeq([s1, s2, s3, s1, s2, s3]);
      setTarget(s1);
    } else {
      setSeq(pattern);
      setTarget(t);
    }

    setOptions(SHAPES.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (s) => {
    if (s === target) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>What comes next in the sequence?</h3>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
        {seq.map((s, i) => (
          <div key={i} className="glass-panel" style={{ width: '60px', height: '60px', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s}</div>
        ))}
        <div className="glass-panel" style={{ width: '60px', height: '60px', fontSize: '2rem', border: '2px dashed var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {options.map((s, i) => (
          <button key={i} onClick={() => select(s)} className="glass-panel" style={{ padding: '20px', fontSize: '2rem', color: 'white', cursor: 'pointer' }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
