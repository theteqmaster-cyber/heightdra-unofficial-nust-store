"use client";
import { useState, useEffect } from 'react';

export default function RepeatOrNot({ level, onWin, onLoss }) {
  const [q, setQ] = useState("Is 2+2 still 4?");
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Repeat or Not? 🔁</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '80px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>Yes</button>
        <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>Probably</button>
      </div>
    </div>
  );
}
