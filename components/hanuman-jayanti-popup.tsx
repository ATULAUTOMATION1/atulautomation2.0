'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Flame } from 'lucide-react'

export default function HanumanJayantiPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the popup has been shown today using local Date to match manager
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    const lastShown = localStorage.getItem('hanuman_popup_last_shown')
    
    // Only show if it's April 2nd, 2026 and we haven't shown it today
    if (todayStr === '2026-04-02' && lastShown !== todayStr) {
      // Delay popup slightly for premium UX
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('hanuman_popup_last_shown', todayStr)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div 
        className="relative max-w-lg w-full bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-orange-500/20 animate-in zoom-in-95 duration-500"
      >
        {/* Glowing Orange Background Effect behind the image */}
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-orange-500/30 blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all shadow-md group"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Hero Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 border-b border-orange-500/10">
          <Image
            src="/images/events/hanuman.png"
            alt="Lord Hanuman Jayanti Tribute"
            fill
            className="object-cover object-top hover:scale-105 transition-transform duration-[20s] ease-linear"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 ring-1 ring-orange-500/50 shadow-lg shadow-orange-500/20">
                <Flame className="w-3.5 h-3.5" />
                <span className="translate-y-[1px]">April 2nd, 2026</span>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 pb-10 relative z-10 bg-gradient-to-b from-transparent to-zinc-950/50">
          <h2 className="text-3xl font-black mb-3 tracking-tight">
            Happy Hanuman{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Jayanti
            </span>
          </h2>
          
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            May Lord Hanuman bless your life with boundless strength, unwavering devotion, and the wisdom to automate every obstacle in your path. Wishing you a powerful and prosperous day.
          </p>

          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <span className="font-heading font-black text-lg tracking-tight hover:text-orange-500 transition-colors cursor-default">
                  Atul<span className="text-orange-500">Automation</span>
              </span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95"
            >
              Enter Site
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
