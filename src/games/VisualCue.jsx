"use client";
import { useState, useEffect } from 'react';

export default function VisualCue({ level, onWin, onLoss }) {
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const delay = 1000 + Math.random() * 3000;
    const timer = setTimeout(() => {
      setShow(true);
      setStartTime(Date.now());
    }, delay);
    return () => clearTimeout(timer);
  }, [level]);

  const tap = () => {
    if (!show) {
      onLoss();
    } else {
      const reaction = Date.now() - startTime;
      if (reaction < (800 - (level * 15))) onWin(3, 1000);
      else onLoss();
    }
  };

  return (
    <div onClick={tap} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <h2 style={{ marginBottom: '40px' }}>Wait for the GLOW... then TAP!</h2>
      <div style={{ 
        width: '250px', 
        height: '250px', 
        borderRadius: '50%', 
        background: show ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
        boxShadow: show ? '0 0 100px var(--accent-primary)' : 'none',
        transition: 'all 0.1s'
      }}></div>
      {!show && <p style={{ marginTop: '30px', opacity: 0.5 }}>Concentrate...</p>}
      {show && <p style={{ marginTop: '30px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>TAP NOW!!!</p>}
    </div>
  );
}
