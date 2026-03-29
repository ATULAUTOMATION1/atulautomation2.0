'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import popups with no SSR to keep initial HTML light
const NavratriPopup = dynamic(() => import('@/components/navratri-popup'), { ssr: false });
const ShaheedDiwasPopup = dynamic(() => import('@/components/shaheed-diwas-popup'), { ssr: false });
const LeadCapturePopup = dynamic(() => import('@/components/ui/lead-capture-popup').then(mod => mod.LeadCapturePopup), { ssr: false });
const AprilFoolsPopup = dynamic(() => import('@/components/april-fools-popup'), { ssr: false });

export function PopupManager() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dates for popups (optimized to avoid unnecessary renders)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Shaheed Diwas: March 23
  const isShaheedDiwas = todayStr === '2026-03-23';
  
  // April Fools: April 1
  const isAprilFools = todayStr === '2026-04-01';
  
  // Navratri: March 19 to March 27 (9 days)
  const navratriStart = new Date('2026-03-19T00:00:00').getTime();
  const navratriEnd = new Date('2026-03-27T23:59:59').getTime();
  const now = today.getTime();
  const isNavratri = now >= navratriStart && now <= navratriEnd;

  return (
    <>
      {isAprilFools && <AprilFoolsPopup />}
      {isNavratri && <NavratriPopup />}
      {isShaheedDiwas && <ShaheedDiwasPopup />}
      <LeadCapturePopup />
    </>
  );
}
