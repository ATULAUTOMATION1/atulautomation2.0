'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Sword, Shield } from 'lucide-react'

const MAHARANA_PRATAP_DATE = '2026-05-09'

const pratapQuotes = [
  { text: "It's better to die than to bow down to an enemy of the motherland.", author: "Maharana Pratap" },
  { text: "A warrior's true wealth is his honor, his sword, and his freedom.", author: "Rajput Pride" },
  { text: "Time can test a warrior, but it can never erase his glory.", author: "Legend of Mewar" },
]

export default function MaharanaPratapPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const checkDate = () => {
      const today = new Date()
      const y = today.getFullYear()
      const m = String(today.getMonth() + 1).padStart(2, '0')
      const d = String(today.getDate()).padStart(2, '0')
      const todayStr = `${y}-${m}-${d}`

      if (todayStr === MAHARANA_PRATAP_DATE) {
        const lastShown = localStorage.getItem('maharana_pratap_popup_2026')

        if (lastShown !== todayStr) {
          const timer = setTimeout(() => {
            setIsOpen(true)
            localStorage.setItem('maharana_pratap_popup_2026', todayStr)
          }, 1200)
          return () => clearTimeout(timer)
        }
      }
    }

    checkDate()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % pratapQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div
        className="relative max-w-xl w-full rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(234,88,12,0.25)] border border-orange-500/20 animate-in zoom-in duration-500"
        style={{
          background: 'linear-gradient(135deg, #1e0f0a 0%, #3d1b0c 40%, #1a0b05 100%)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-20 backdrop-blur-sm border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9]">
          <Image
            src="/maharana-pratap.png"
            alt="Maharana Pratap Jayanti Tribute – From Atul Automation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e0f0a]" />
        </div>

        {/* Content */}
        <div className="relative px-8 pb-8 -mt-6 text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mx-auto">
            <Sword className="w-3.5 h-3.5" />
            May 9th, 2026
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Tribute to the Lion of Mewar<br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
              Maharana Pratap
            </span>
          </h3>

          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Honoring the epitome of courage, pride, and unmatched valor. 
            <span className="text-orange-300 font-medium"> The eternal spirit of freedom </span> lives on in his legacy. 
            <span className="text-white font-semibold"> Atul Automation</span> pays respectful homage.
          </p>

          {/* Rotating Quote */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 transition-all duration-500 min-h-[80px] flex flex-col items-center justify-center">
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &ldquo;{pratapQuotes[quoteIndex].text}&rdquo;
            </p>
            <p className="text-xs text-orange-400/80 mt-1.5 font-medium">
              — {pratapQuotes[quoteIndex].author}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 p-[1.5px] rounded-xl overflow-hidden shadow-2xl shadow-orange-900/30 transition hover:scale-105 active:scale-95 block"
          >
            <div className="bg-zinc-950 px-8 py-3 rounded-[10px] transition group-hover:bg-transparent flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-orange-400 group-hover:text-white transition" />
              <span className="text-white font-bold uppercase tracking-widest text-sm">
                Jai Rajputana
              </span>
            </div>
          </button>

          <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
            With respect from Atul Automation • atulautomation.com
          </p>
        </div>
      </div>
    </div>
  )
}
