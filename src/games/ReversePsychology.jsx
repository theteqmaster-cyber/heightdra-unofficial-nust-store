"use client";
import { useState, useEffect } from 'react';

export default function ReversePsychology({ level, onWin, onLoss }) {
  const q = "Do NOT click the giant shiny button.";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Reverse Psychology 🧠</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '60px' }}>{q}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <button onClick={() => onLoss()} className="glass-panel" style={{ padding: '50px 100px', fontSize: '2rem', background: 'var(--accent-primary)', color: 'black', borderRadius: '40px', boxShadow: '0 0 50px var(--accent-primary)' }}>
          GIANT SHINY BUTTON
        </button>
        <button onClick={() => onWin(3, 1000)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', marginTop: '40px' }}>
          Ignore it
        </button>
      </div>
    </div>
  );
}
