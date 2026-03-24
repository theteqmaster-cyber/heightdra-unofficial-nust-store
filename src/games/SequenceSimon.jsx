"use client";
import { useState, useEffect } from 'react';

const COLORS = ['#ff4d4d', '#fcd116', '#66fcf1', '#b266ff'];

export default function SequenceSimon({ level, onWin, onLoss }) {
  const sequenceLength = Math.floor(3 + level / 2);
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [phase, setPhase] = useState('showing'); 
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    const seq = Array(sequenceLength).fill(0).map(() => Math.floor(Math.random() * 4));
    setSequence(seq);
    
    let i = 0;
    const interval = setInterval(() => {
      if (i >= seq.length) {
        clearInterval(interval);
        setActiveColor(null);
        setPhase('playing');
        return;
      }
      setActiveColor(seq[i]);
      setTimeout(() => setActiveColor(null), 300); 
      i++;
    }, Math.max(400, 1000 - level * 20));

    return () => clearInterval(interval);
  }, [level, sequenceLength]);

  const handleColorClick = (idx) => {
    if (phase !== 'playing') return;
    
    setActiveColor(idx);
    setTimeout(() => setActiveColor(null), 200);

    const newInput = [...playerInput, idx];
    setPlayerInput(newInput);

    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setPhase('lost');
      setTimeout(onLoss, 500);
      return;
    }

    if (newInput.length === sequence.length) {
      setPhase('won');
      setTimeout(() => onWin(3, 1000), 500);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px', color: 'var(--text-primary)', letterSpacing: '2px' }}>
        {phase === 'showing' ? 'WATCH THE SEQUENCE' : 'REPEAT THE PATTERN'}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', background: 'var(--panel-bg)', padding: '50px', borderRadius: '50%', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)' }}>
        {COLORS.map((color, idx) => (
          <div 
            key={idx}
            onClick={() => handleColorClick(idx)}
            style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: activeColor === idx ? color : `${color}20`,
              boxShadow: activeColor === idx ? `0 0 40px ${color}` : 'none',
              cursor: phase === 'playing' ? 'pointer' : 'default',
              transition: 'all 0.1s',
              border: `2px solid ${activeColor === idx ? color : 'rgba(255,255,255,0.1)'}`
            }}
          />
        ))}
      </div>
      <p style={{ marginTop: '30px', color: 'var(--text-secondary)' }}>
        Sequence: {playerInput.length} / {sequence.length}
      </p>
    </div>
  );
}
