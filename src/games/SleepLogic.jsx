"use client";
import { useState, useEffect } from 'react';

export default function SleepLogic({ level, onWin, onLoss }) {
  const q = "If you sleep at 3am and have 8am lecture...";
  const options = ["You're a legend", "You'll sleep at 12pm", "Coffee is the answer", "All of the above"];
  const answer = "All of the above";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Sleep Logic 😴</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '50px' }}>{q}</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === answer ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '20px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
