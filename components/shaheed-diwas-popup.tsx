'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const SHAHEED_DIWAS_DATE = '2026-03-23'

export default function ShaheedDiwasPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkDate = () => {
      const todayStr = new Date().toISOString().split('T')[0]
      
      // Only show on March 23rd
      if (todayStr === SHAHEED_DIWAS_DATE) {
        const lastShown = localStorage.getItem('shaheed_diwas_popup_last_shown')
        
        if (lastShown !== todayStr) {
          // Delay popup slightly for better overall experience
          const timer = setTimeout(() => {
            setIsOpen(true)
            localStorage.setItem('shaheed_diwas_popup_last_shown', todayStr)
          }, 1000)
          return () => clearTimeout(timer)
        }
      }
    }

    checkDate()
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div 
        className="relative max-w-xl w-full bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,153,51,0.3)] border border-orange-500/20 animate-in zoom-in duration-500"
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all z-20 backdrop-blur-sm border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative aspect-[4/5] md:aspect-[16/10] w-full">
          <Image
            src="/shaheed-diwas.png"
            alt="Shaheed Diwas Tribute - Bhagat Singh, Sukhdev, and Rajguru from Atul Automation"
            fill
            className="object-cover"
            priority
          />
          
          {/* Indian Tricolor Gradient Overlays */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-green-900/60 via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 inset-x-0 flex flex-col justify-end p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-white drop-shadow-lg">
               शहीद दिवस 🇮🇳
            </h3>
            <p className="text-sm md:text-base text-gray-200 mb-6 drop-shadow-md font-medium max-w-sm mx-auto">
              In memory of the supreme sacrifice of Bhagat Singh, Sukhdev Thapar, and Shivaram Rajguru. Their bravery will inspire generations.
            </p>
            
            <button
              onClick={() => setIsOpen(false)}
              className="group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r from-orange-600 via-white to-green-600 p-[1px] rounded-xl overflow-hidden shadow-2xl transition hover:scale-105 active:scale-95"
            >
              <div className="bg-zinc-950 px-8 py-3 rounded-[11px] transition group-hover:bg-transparent">
                <span className="text-white font-bold uppercase tracking-widest text-sm">
                   Saluting Our Heroes
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
