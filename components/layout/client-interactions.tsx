'use client';

import dynamic from 'next/dynamic';

const SocialShare = dynamic(() => import('@/components/ui/social-share').then(mod => mod.SocialShare), { ssr: false });
const PopupManager = dynamic(() => import('@/components/layout/popup-manager').then(mod => mod.PopupManager), { ssr: false });

export function ClientInteractions() {
  return (
    <>
      <SocialShare variant="floating" />
      <PopupManager />
    </>
  );
}
