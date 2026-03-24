"use client";
import { useState, useEffect } from 'react';

export default function PhoneAddiction({ level, onWin, onLoss }) {
  const q = "How many hours on your phone today?";
  const options = ["1-2 (Liars)", "3-5 (Normal)", "6-9 (True Student)", "10+ (Legendary)"];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Phone Addiction Test 📱</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '80px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
