'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, PartyPopper } from 'lucide-react'

// Set the target date: April 21st
// The year is ignored in the check so it works every year, or we can hardcode 2026.
const TARGET_MONTH = 4; // April
const TARGET_DAY = 21;

export default function CtoBirthdayPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const today = new Date()
    const isApril21 = today.getMonth() + 1 === TARGET_MONTH && today.getDate() === TARGET_DAY
    
    if (isApril21) {
      const todayStr = today.toISOString().split('T')[0]
      const lastShown = localStorage.getItem('cto_birthday_last_shown')
      
      if (lastShown !== todayStr) {
        const timer = setTimeout(() => {
          setIsOpen(true)
          localStorage.setItem('cto_birthday_last_shown', todayStr)
        }, 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div 
        className="relative max-w-md w-full bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-blue-500/20 animate-in zoom-in duration-500"
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all z-20 backdrop-blur-sm border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative aspect-[4/5] w-full bg-zinc-900">
          {/* Confetti / Party Vibe */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-blue-600/40 to-transparent pointer-events-none z-10" />
          
          <Image
            src="/cto-birthday.jpg"
            alt="Happy Birthday Gmohit!"
            fill
            className="object-cover"
            priority
          />
          
          {/* Bottom Gradient for Text */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 inset-x-0 flex flex-col justify-end p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PartyPopper className="w-6 h-6 text-yellow-400 animate-bounce" />
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                Happy Birthday!
              </h3>
              <PartyPopper className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
            
            <p className="text-lg md:text-xl font-medium text-blue-200 mb-6 drop-shadow-md">
              Wishing an amazing birthday to our visionary CTO, <span className="text-white font-bold">Gmohit</span>, from everyone at Atul Automation! 🚀
            </p>
            
            <button
              onClick={() => setIsOpen(false)}
              className="group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 p-[1px] rounded-xl overflow-hidden shadow-2xl transition hover:scale-105 active:scale-95"
            >
              <div className="bg-zinc-950 px-8 py-3 rounded-[11px] transition group-hover:bg-transparent">
                <span className="text-white font-bold tracking-widest text-sm drop-shadow-md">
                  CELEBRATE W/ US
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
