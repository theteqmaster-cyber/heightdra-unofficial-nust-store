"use client";
import GameWrapper from '@/components/GameWrapper';
import { use } from 'react';

export default function GamePage({ params }) {
  // In Next.js App Router, params is a promise we need to unwrap
  const unwrappedParams = use(params);
  const { type, level } = unwrappedParams;
  const levelNum = parseInt(level, 10) || 1;

  return (
    <div style={{ padding: '20px 0', flex: 1, display: 'flex' }}>
      <GameWrapper gameType={type} level={levelNum} />
    </div>
  );
}
