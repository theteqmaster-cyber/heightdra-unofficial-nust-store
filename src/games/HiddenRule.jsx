"use client";
import { useState, useEffect } from 'react';

export default function HiddenRule({ level, onWin, onLoss }) {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Figure out the hidden rule... 🎯</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[...Array(9)].map((_, i) => (
          <button key={i} onClick={() => {
            const next = clicks + 1;
            setClicks(next);
            if (next === 3) onWin(3, 1000);
          }} className="glass-panel" style={{ padding: '40px', color: 'white' }}>
            ?
          </button>
        ))}
      </div>
      <p style={{ marginTop: '30px', opacity: 0.5 }}>Hint: It's all about the count.</p>
    </div>
  );
}
