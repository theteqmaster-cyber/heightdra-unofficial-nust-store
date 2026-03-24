"use client";
import { useState, useEffect } from 'react';

export default function StayAwake({ level, onWin, onLoss }) {
  const [energy, setEnergy] = useState(100);
  const [time, setTime] = useState(0);
  const targetTime = 10;
  const drainRate = 1 + level / 2;

  useEffect(() => {
    const drain = setInterval(() => {
      setEnergy(e => {
        const next = e - drainRate;
        if (next <= 0) onLoss();
        return next;
      });
      setTime(t => t + 0.1);
    }, 100);
    return () => clearInterval(drain);
  }, [level, onLoss, drainRate]);

  useEffect(() => {
    if (time >= targetTime) onWin(3, 1000);
  }, [time, onWin]);

  const tap = () => setEnergy(e => Math.min(100, e + 15));

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>TAP TO STAY AWAKE! {(targetTime - time).toFixed(1)}s left</h3>
      <div style={{ width: '100%', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', marginBottom: '40px', overflow: 'hidden' }}>
        <div style={{ width: `${energy}%`, height: '100%', background: energy < 30 ? '#ff4d4d' : '#fcd116', transition: 'width 0.1s linear' }} />
      </div>
      <button 
        onClick={tap}
        style={{
          width: '200px', height: '200px', borderRadius: '50%', border: 'none',
          background: 'var(--accent-primary)', color: '#000', fontSize: '2rem', fontWeight: 'bold',
          cursor: 'pointer', boxShadow: '0 0 30px var(--accent-primary)', transition: 'transform 0.1s'
        }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        TAP!
      </button>
    </div>
  );
}
