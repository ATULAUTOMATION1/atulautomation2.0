'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import popups with no SSR to keep initial HTML light
const NavratriPopup = dynamic(() => import('@/components/navratri-popup'), { ssr: false });
const ShaheedDiwasPopup = dynamic(() => import('@/components/shaheed-diwas-popup'), { ssr: false });
const LeadCapturePopup = dynamic(() => import('@/components/ui/lead-capture-popup').then(mod => mod.LeadCapturePopup), { ssr: false });
const AprilFoolsPopup = dynamic(() => import('@/components/april-fools-popup'), { ssr: false });
const HanumanJayantiPopup = dynamic(() => import('@/components/hanuman-jayanti-popup'), { ssr: false });
const LabourDayPopup = dynamic(() => import('@/components/labour-day-popup'), { ssr: false });
const BuddhaPurnimaPopup = dynamic(() => import('@/components/buddha-purnima-popup'), { ssr: false });
const MaharanaPratapPopup = dynamic(() => import('@/components/maharana-pratap-popup'), { ssr: false });
const GeetaQuotePopup = dynamic(() => import('@/components/geeta-popup'), { ssr: false });

export function PopupManager() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dates for popups (optimized to avoid unnecessary renders)
  // Convert to local YYYY-MM-DD string to avoid UTC offset bugs at midnight
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  
  // Shaheed Diwas: March 23
  const isShaheedDiwas = todayStr === '2026-03-23';
  
  // April Fools: April 1
  const isAprilFools = todayStr === '2026-04-01';

  // Hanuman Jayanti: April 2
  const isHanumanJayanti = todayStr === '2026-04-02';

  // Labour Day: May 1
  const isLabourDay = todayStr === '2026-05-01';

  // Buddha Purnima: May 1, 2026
  const isBuddhaPurnima = todayStr === '2026-05-01';
  
  // Maharana Pratap Jayanti: May 9
  const isMaharanaPratap = todayStr === '2026-05-09';
  
  // Navratri: March 19 to March 27 (9 days)
  const navratriStart = new Date('2026-03-19T00:00:00').getTime();
  const navratriEnd = new Date('2026-03-27T23:59:59').getTime();
  const now = today.getTime();
  const isNavratri = now >= navratriStart && now <= navratriEnd;

  return (
    <>
      {isMaharanaPratap && <MaharanaPratapPopup />}
      {isBuddhaPurnima && <BuddhaPurnimaPopup />}
      {isLabourDay && <LabourDayPopup />}
      {isAprilFools && <AprilFoolsPopup />}
      {isHanumanJayanti && <HanumanJayantiPopup />}
      {isNavratri && <NavratriPopup />}
      {isShaheedDiwas && <ShaheedDiwasPopup />}
      <GeetaQuotePopup />
      <LeadCapturePopup />
    </>
  );
}
