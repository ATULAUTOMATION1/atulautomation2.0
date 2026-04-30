'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Heart, Hammer } from 'lucide-react'

const LABOUR_DAY_DATE = '2026-05-01'

const workerQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "No work is insignificant. All labour that uplifts humanity has dignity.", author: "Martin Luther King Jr." },
  { text: "The miracle is not that we do this work, but that we are happy to do it.", author: "Mother Teresa" },
]

export default function LabourDayPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const checkDate = () => {
      const today = new Date()
      const y = today.getFullYear()
      const m = String(today.getMonth() + 1).padStart(2, '0')
      const d = String(today.getDate()).padStart(2, '0')
      const todayStr = `${y}-${m}-${d}`

      if (todayStr === LABOUR_DAY_DATE) {
        const lastShown = localStorage.getItem('labour_day_popup_2026')

        if (lastShown !== todayStr) {
          const timer = setTimeout(() => {
            setIsOpen(true)
            localStorage.setItem('labour_day_popup_2026', todayStr)
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
      setQuoteIndex(prev => (prev + 1) % workerQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div
        className="relative max-w-xl w-full rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.25)] border border-amber-500/20 animate-in zoom-in duration-500"
        style={{
          background: 'linear-gradient(135deg, #0c1929 0%, #1a2744 40%, #2d1f0e 100%)',
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
            src="/labour-day.png"
            alt="International Labour Day Tribute – From Atul Automation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c1929]" />
        </div>

        {/* Content */}
        <div className="relative px-8 pb-8 -mt-6 text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mx-auto">
            <Hammer className="w-3.5 h-3.5" />
            May 1st, 2026
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Happy International<br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Workers&apos; Day
            </span>
          </h3>

          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            From the factory floors to the boardrooms, from fields to code editors — 
            <span className="text-amber-300 font-medium"> every hand that builds</span> this world deserves respect and gratitude. 
            <span className="text-white font-semibold"> Atul Automation</span> salutes your relentless spirit.
          </p>

          {/* Rotating Quote */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 transition-all duration-500 min-h-[80px] flex flex-col items-center justify-center">
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &ldquo;{workerQuotes[quoteIndex].text}&rdquo;
            </p>
            <p className="text-xs text-amber-400/80 mt-1.5 font-medium">
              — {workerQuotes[quoteIndex].author}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 p-[1.5px] rounded-xl overflow-hidden shadow-2xl shadow-amber-900/30 transition hover:scale-105 active:scale-95 block"
          >
            <div className="bg-zinc-950 px-8 py-3 rounded-[10px] transition group-hover:bg-transparent flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-red-400 group-hover:text-white transition" />
              <span className="text-white font-bold uppercase tracking-widest text-sm">
                Saluting Every Worker
              </span>
            </div>
          </button>

          <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
            With love from Atul Automation • atulautomation.com
          </p>
        </div>
      </div>
    </div>
  )
}
