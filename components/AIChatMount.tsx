'use client';

import dynamic from 'next/dynamic';

const AIChatWrapper = dynamic(
  () => import('@/components/chat/AIChatWrapper').then((m) => ({ default: m.AIChatWrapper })),
  { ssr: false }
);

export default function AIChatMount() {
  return <AIChatWrapper />;
}

