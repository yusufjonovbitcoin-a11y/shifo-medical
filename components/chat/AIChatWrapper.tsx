'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled (chat widget doesn't need to be in initial HTML)
const AIChat = dynamic(() => import('./AIChat').then(mod => ({ default: mod.AIChat })), {
  ssr: false,
});

export function AIChatWrapper() {
  return <AIChat />;
}

