"use client";
import { useState, useEffect } from 'react';

export default function RandomOpinions({ level, onWin, onLoss }) {
  const q = "Is cereal a soup? 🧃";
  const options = ["Yes, obviously", "No, that's illegal", "Only with milk", "I don't care, I'm hungry"];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Random Opinions</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '100px' }}>{q}</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map(o => (
          <button key={o} onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '20px 40px', color: 'white', fontSize: '1.2rem' }}>{o}</button>
        ))}
      </div>
      <p style={{ marginTop: '30px' }}>Any choice wins, it's an opinion! 😂</p>
    </div>
  );
}
