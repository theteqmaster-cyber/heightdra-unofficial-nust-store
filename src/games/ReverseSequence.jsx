"use client";
import { useState, useEffect } from 'react';

const COLORS = ['#ff4d4d', '#fcd116', '#66fcf1', '#b266ff'];

export default function ReverseSequence({ level, onWin, onLoss }) {
  const sequenceLength = Math.min(10, 3 + Math.floor(level / 5));
  const [sequence, setSequence] = useState([]);
  const [input, setInput] = useState([]);
  const [phase, setPhase] = useState('memorize');
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const seq = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * COLORS.length));
    setSequence(seq);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= seq.length) {
        clearInterval(interval);
        setActiveIdx(-1);
        setPhase('input');
        return;
      }
      setActiveIdx(seq[i]);
      setTimeout(() => setActiveIdx(-1), 600);
      i++;
    }, 1000);
    return () => clearInterval(interval);
  }, [level, sequenceLength]);

  const btnClick = (idx) => {
    if (phase !== 'input') return;
    const nextInput = [...input, idx];
    setInput(nextInput);
    
    // Check backwards
    const targetIdx = sequence.length - 1 - input.length;
    if (idx !== sequence[targetIdx]) {
      onLoss();
    } else if (nextInput.length === sequence.length) {
      onWin(3, 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: '#ff4d4d' }}>
        {phase === 'memorize' ? 'WATCH SEQUENCE' : 'INPUT IN REVERSE! ↩️'}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {COLORS.map((c, i) => (
          <div 
            key={i}
            onClick={() => btnClick(i)}
            style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: activeIdx === i ? c : `${c}20`,
              boxShadow: activeIdx === i ? `0 0 30px ${c}` : 'none',
              border: `3px solid ${activeIdx === i ? c : 'rgba(255,255,255,0.1)'}`,
              cursor: phase === 'input' ? 'pointer' : 'default',
              transition: 'all 0.1s'
            }}
          />
        ))}
      </div>
      <p style={{ marginTop: '20px' }}>Remaining: {sequence.length - input.length}</p>
    </div>
  );
}
