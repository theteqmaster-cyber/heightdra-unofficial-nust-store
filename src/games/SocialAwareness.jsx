"use client";
import { useState, useEffect } from 'react';

export default function SocialAwareness({ level, onWin, onLoss }) {
  const q = "What does 'seen 2:14pm' mean if it's now 8:00pm? 😂";
  const options = ["They are busy", "They don't like me", "They died", "They are typing... for 6 hours"];
  const answer = "They are typing... for 6 hours";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Social Awareness 👀</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '60px' }}>{q}</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === answer ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '25px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}
