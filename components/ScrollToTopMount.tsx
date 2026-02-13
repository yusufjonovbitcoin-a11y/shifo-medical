'use client';

import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(
  () => import('@/components/ScrollToTop').then((m) => ({ default: m.ScrollToTop })),
  { ssr: false }
);

export default function ScrollToTopMount() {
  return <ScrollToTop />;
}

