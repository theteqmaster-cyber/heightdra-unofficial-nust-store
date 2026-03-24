"use client";
import { useState, useEffect } from 'react';

export default function EquationBuilder({ level, onWin, onLoss }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [res, setRes] = useState(0);
  const [op, setOp] = useState('');
  const [options, setOptions] = useState([]);

  const generate = () => {
    const ops = ['+', '-', '*'];
    if (level > 10) ops.push('/');
    const selectedOp = ops[Math.floor(Math.random() * ops.length)];
    let valA, valB, result;

    if (selectedOp === '+') {
      valA = Math.floor(Math.random() * 20) + 1;
      valB = Math.floor(Math.random() * 20) + 1;
      result = valA + valB;
    } else if (selectedOp === '-') {
      valA = Math.floor(Math.random() * 30) + 10;
      valB = Math.floor(Math.random() * valA);
      result = valA - valB;
    } else if (selectedOp === '*') {
      valA = Math.floor(Math.random() * 10) + 1;
      valB = Math.floor(Math.random() * 10) + 1;
      result = valA * valB;
    } else {
      valB = Math.floor(Math.random() * 10) + 1;
      result = Math.floor(Math.random() * 10) + 1;
      valA = result * valB;
    }

    setA(valA);
    setB(valB);
    setRes(result);
    setOp(selectedOp);
    setOptions(['+', '-', '*', '/'].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generate();
  }, [level]);

  const selectOp = (o) => {
    let check = false;
    if (o === '+') check = (a + b === res);
    else if (o === '-') check = (a - b === res);
    else if (o === '*') check = (a * b === res);
    else if (o === '/') check = (a / b === res);

    if (check) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>
        {a} <span style={{ color: 'var(--accent-primary)', borderBottom: '2px solid' }}> ? </span> {b} = {res}
      </h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => selectOp(o)} className="glass-panel" style={{ padding: '20px 40px', fontSize: '2rem', color: 'white', cursor: 'pointer' }}>
            {o === '*' ? '×' : o === '/' ? '÷' : o}
          </button>
        ))}
      </div>
    </div>
  );
}
