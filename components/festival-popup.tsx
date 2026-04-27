'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

// Dates typically overlap for these two festivals. We'll show this popup if the current date is around April.
export default function FestivalPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      src: '/parshuram-jayanti.webp',
      alt: 'Happy Parshuram Jayanti from Atul Automation',
      title: 'भगवान परशुराम जयंती',
      description: 'May the courage and spiritual grace of Lord Parshuram inspire and guide you to success. Happy Parshuram Jayanti!',
      gradient: 'from-orange-500/20',
      bottomGradient: 'from-orange-900/60 via-black/40',
      buttonColors: 'from-orange-600 via-white to-red-600',
      buttonText: 'Embrace The Courage'
    },
    {
      src: '/akshaya-tritiya.webp',
      alt: 'Happy Akshaya Tritiya from Atul Automation',
      title: 'शुभ अक्षय तृतीया',
      description: 'Wishing you endless prosperity, infinite success, and eternal joy. Happy Akshaya Tritiya from Atul Automation!',
      gradient: 'from-yellow-400/20',
      bottomGradient: 'from-yellow-900/60 via-black/40',
      buttonColors: 'from-yellow-500 via-amber-200 to-amber-600',
      buttonText: 'Claim Prosperity'
    }
  ]

  useEffect(() => {
    // Only show today (Assuming we just want it to trigger today, so we do a general check)
    // Could check date, but since user requested deploying now, we'll just show it once per session or day.
    const todayStr = new Date().toISOString().split('T')[0]
    
    const lastShown = localStorage.getItem('festival_popup_last_shown')
    
    if (lastShown !== todayStr) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('festival_popup_last_shown', todayStr)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0))
    }, 4000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  const slide = slides[currentSlide]

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div 
        className="relative max-w-xl w-full bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,180,51,0.2)] border border-yellow-500/20 animate-in zoom-in duration-500 transition-all"
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all z-20 backdrop-blur-sm border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative aspect-[4/5] md:aspect-[16/10] w-full transition-all duration-700">
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover animate-in fade-in duration-700"
            priority
          />
          
          {/* Gradients */}
          <div className={ `absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b ${slide.gradient} to-transparent pointer-events-none transition-colors duration-700` } />
          <div className={ `absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${slide.bottomGradient} to-transparent pointer-events-none transition-colors duration-700` } />
          
          <div className="absolute bottom-0 inset-x-0 flex flex-col justify-end p-8 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white drop-shadow-lg shadow-black animate-in slide-in-from-bottom flex justify-center items-center gap-3">
               {slide.title}
            </h3>
            <p className="text-sm md:text-base text-gray-100 mb-6 drop-shadow-md font-medium max-w-sm mx-auto animate-in slide-in-from-bottom">
              {slide.description}
            </p>
            
            <button
              onClick={() => setIsOpen(false)}
              className={ `group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r ${slide.buttonColors} p-[1px] rounded-xl overflow-hidden shadow-2xl transition hover:scale-105 active:scale-95 animate-in slide-in-from-bottom` }
            >
              <div className="bg-zinc-950 px-8 py-3 rounded-[11px] transition group-hover:bg-transparent">
                <span className="text-white font-bold uppercase tracking-widest text-sm drop-shadow-md">
                   {slide.buttonText}
                </span>
              </div>
            </button>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              <button onClick={() => setCurrentSlide(0)} className={`w-2 h-2 rounded-full transition-all ${currentSlide === 0 ? 'bg-white w-4' : 'bg-white/50'}`} />
              <button onClick={() => setCurrentSlide(1)} className={`w-2 h-2 rounded-full transition-all ${currentSlide === 1 ? 'bg-white w-4' : 'bg-white/50'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
