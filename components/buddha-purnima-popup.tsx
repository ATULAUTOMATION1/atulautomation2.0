'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Sparkles } from 'lucide-react'

const BUDDHA_PURNIMA_DATE = '2026-05-01'

const teachings = [
  { text: "Peace comes from within. Do not seek it without.", emoji: "🕊️" },
  { text: "Three things cannot be long hidden: the Sun, the Moon, and the Truth.", emoji: "☀️" },
  { text: "An idea that is developed and put into action is more important than an idea that exists only as an idea.", emoji: "🪷" },
]

export default function BuddhaPurnimaPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [teachingIndex, setTeachingIndex] = useState(0)

  useEffect(() => {
    const today = new Date()
    const y = today.getFullYear()
    const m = String(today.getMonth() + 1).padStart(2, '0')
    const d = String(today.getDate()).padStart(2, '0')
    const todayStr = `${y}-${m}-${d}`

    if (todayStr === BUDDHA_PURNIMA_DATE) {
      const lastShown = localStorage.getItem('buddha_purnima_popup_2026')
      if (lastShown !== todayStr) {
        // Delay a bit so it doesn't clash with Labour Day popup
        const timer = setTimeout(() => {
          setIsOpen(true)
          localStorage.setItem('buddha_purnima_popup_2026', todayStr)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setTeachingIndex(prev => (prev + 1) % teachings.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-700">
      <div
        className="relative max-w-xl w-full rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(168,130,255,0.2)] border border-purple-400/15 animate-in zoom-in duration-600"
        style={{
          background: 'linear-gradient(160deg, #0f0a1e 0%, #1a1035 45%, #0d1b2a 100%)',
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
        <div className="relative w-full aspect-[16/10]">
          <Image
            src="/buddha-purnima.png"
            alt="Buddha Purnima Tribute – From Atul Automation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0a1e]" />
        </div>

        {/* Content */}
        <div className="relative px-8 pb-8 -mt-8 text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/20 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            बुद्ध पूर्णिमा 2026
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Happy<br />
            <span className="bg-gradient-to-r from-purple-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
              Buddha Purnima
            </span>
            <span className="ml-2">🙏</span>
          </h3>

          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            On this sacred full moon day, we celebrate the birth, enlightenment, and nirvana of 
            <span className="text-amber-300 font-medium"> Gautama Buddha</span> — 
            the beacon of peace, compassion, and wisdom for all humanity.
          </p>

          {/* Rotating Teaching */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 transition-all duration-700 min-h-[76px] flex flex-col items-center justify-center">
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              {teachings[teachingIndex].emoji} &ldquo;{teachings[teachingIndex].text}&rdquo;
            </p>
            <p className="text-xs text-purple-400/70 mt-1.5 font-medium">
              — Gautama Buddha
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-500 p-[1.5px] rounded-xl overflow-hidden shadow-2xl shadow-purple-900/30 transition hover:scale-105 active:scale-95 block"
          >
            <div className="bg-zinc-950 px-8 py-3 rounded-[10px] transition group-hover:bg-transparent flex items-center justify-center gap-2">
              <span className="text-lg">🪷</span>
              <span className="text-white font-bold uppercase tracking-widest text-sm">
                Embrace Peace
              </span>
            </div>
          </button>

          <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
            With reverence from Atul Automation • atulautomation.com
          </p>
        </div>
      </div>
    </div>
  )
}
