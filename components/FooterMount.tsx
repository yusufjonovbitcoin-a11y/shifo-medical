'use client';

import dynamic from 'next/dynamic';

const Footer = dynamic(
  () => import('@/components/Footer').then((m) => ({ default: m.Footer })),
  { ssr: false }
);

export default function FooterMount() {
  return <Footer />;
}

