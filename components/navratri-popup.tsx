'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const NAVRATRI_START_DATE = new Date('2026-03-19T00:00:00').getTime()
const DAYS_COUNT = 9

export default function NavratriPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [dayIndex, setDayIndex] = useState<number | null>(null)

  useEffect(() => {
    const checkNavratri = () => {
      const now = new Date().getTime()
      const diffTime = now - NAVRATRI_START_DATE
      const currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
      
      if (currentDay >= 1 && currentDay <= DAYS_COUNT) {
        setDayIndex(currentDay)
        
        // Show only once per day
        const todayStr = new Date().toISOString().split('T')[0]
        const lastShown = localStorage.getItem('navratri_popup_last_shown')
        
        if (lastShown !== todayStr) {
          // Delay popup for better UX
          const timer = setTimeout(() => {
            setIsOpen(true)
            localStorage.setItem('navratri_popup_last_shown', todayStr)
          }, 1500)
          return () => clearTimeout(timer)
        }
      }
    }

    checkNavratri()
  }, [])

  if (!isOpen || dayIndex === null) return null

  const DEVI_NAMES = [
    'Maa Shailputri',
    'Maa Brahmacharini',
    'Maa Chandraghanta',
    'Maa Kushmanda',
    'Maa Skandamata',
    'Maa Katyayani',
    'Maa Kalaratri',
    'Maa Mahagauri',
    'Maa Siddhidatri'
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="relative max-w-lg w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-zoom-in"
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={`/navratri/day-${dayIndex}.png`}
            alt={`Happy Chaitra Navratri Day ${dayIndex} - ${DEVI_NAMES[dayIndex - 1]} tribute from Atul Automation`}
            fill
            className="object-cover"
            priority
          />
          
          {/* Subtle Overlay for the button */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 inset-x-0 flex justify-center px-6">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 uppercase tracking-wider"
            >
              Jai Mata Di 🙏
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
