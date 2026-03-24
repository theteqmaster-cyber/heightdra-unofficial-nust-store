"use client";
import { useState, useEffect } from 'react';

export default function BalanceEquation({ level, onWin, onLoss }) {
  const [data, setData] = useState({ left: "x + 5", right: "12", x: "7" });

  useEffect(() => {
    const val = Math.floor(Math.random() * 15) + 5;
    const add = Math.floor(Math.random() * 10) + 1;
    setData({ left: `x + ${add}`, right: `${val + add}`, x: val.toString() });
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)', marginBottom: '40px' }}>⚖️ BALANCE EQUATION</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px' }}>{data.left} = {data.right}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {[data.x, (parseInt(data.x)+3).toString(), (parseInt(data.x)-2).toString(), "10"].sort().map(o => (
          <button key={o} onClick={() => o === data.x ? onWin(5, 2000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', border: '1px solid rgba(252,209,22,0.2)' }}>x = {o}</button>
        ))}
      </div>
    </div>
  );
}
