'use client';

import { useEffect } from 'react';

export default function SectionSnap() {
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.snap = 'true';
    return () => { delete html.dataset.snap; };
  }, []);

  return null;
}
