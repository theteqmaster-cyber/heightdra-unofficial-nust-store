"use client";
import { useState, useEffect } from 'react';

const COLORS = ['#ff4d4d', '#fcd116', '#66fcf1', '#b266ff', '#45a29e', '#ffffff'];

export default function ColorRecall({ level, onWin, onLoss }) {
  const sequenceLength = Math.min(15, 2 + Math.floor(level / 3));
  const [sequence, setSequence] = useState([]);
  const [input, setInput] = useState([]);
  const [phase, setPhase] = useState('memorize');
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const seq = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * COLORS.length));
    setSequence(seq);
    let i = 0;
    const flashInterval = Math.max(200, 1000 - level * 30);
    
    const interval = setInterval(() => {
      if (i >= seq.length) {
        clearInterval(interval);
        setActiveIdx(-1);
        setPhase('input');
        return;
      }
      setActiveIdx(seq[i]);
      setTimeout(() => setActiveIdx(-1), flashInterval * 0.7);
      i++;
    }, flashInterval);

    return () => clearInterval(interval);
  }, [level, sequenceLength]);

  const btnClick = (idx) => {
    if (phase !== 'input') return;
    const nextInput = [...input, idx];
    setInput(nextInput);
    if (idx !== sequence[input.length]) {
      onLoss();
    } else if (nextInput.length === sequence.length) {
      onWin(3, 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        {phase === 'memorize' ? 'WATCH SEQUENCE' : 'REPEAT SEQUENCE'}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {COLORS.map((c, i) => (
          <div 
            key={i}
            onClick={() => btnClick(i)}
            style={{
              width: '80px', height: '80px', borderRadius: '12px',
              background: activeIdx === i ? c : `${c}20`,
              boxShadow: activeIdx === i ? `0 0 20px ${c}` : 'none',
              border: `2px solid ${activeIdx === i ? c : 'rgba(255,255,255,0.1)'}`,
              cursor: phase === 'input' ? 'pointer' : 'default',
              transition: 'all 0.1s'
            }}
          />
        ))}
      </div>
      <p style={{ marginTop: '20px' }}>Length: {input.length} / {sequence.length}</p>
    </div>
  );
}
