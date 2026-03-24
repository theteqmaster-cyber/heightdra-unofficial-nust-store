"use client";
import { useState, useEffect } from 'react';

export default function BrokeStudent({ level, onWin, onLoss }) {
  const [options, setOptions] = useState(["Buy 1 egg", "Save for deposit", "Invest in crypto", "Stare at it"]);
  const answer = "Buy 1 egg";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>What do you do with $1? 💸</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === answer ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '30px', fontSize: '1.2rem', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
