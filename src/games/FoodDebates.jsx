"use client";
import { useState, useEffect } from 'react';

export default function FoodDebates({ level, onWin, onLoss }) {
  const q = "Does pineapple belong on pizza? 🍕";
  const options = ["Yes, it's gourmet", "No, it's a crime", "I only eat crust", "Depends who's paying"];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Food Debates</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '80px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
      <p style={{ marginTop: '30px', opacity: 0.6 }}>Every student has an opinion, every opinion is a win. 😂</p>
    </div>
  );
}
