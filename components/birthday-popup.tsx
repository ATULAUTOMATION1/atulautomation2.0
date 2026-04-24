'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Sparkles, Gift } from 'lucide-react';

const IMAGES = [
  '/images/birthday/1.jpg',
  '/images/birthday/2.jpg',
  '/images/birthday/3.jpg'
];

export function BirthdayPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Check if the user has already closed it in this session to prevent spamming
    const hasSeen = sessionStorage.getItem('birthday_popup_seen');
    
    // Specifically trigger on April 25th 2026 (00:00 to 23:59 local browser time)
    const today = new Date();
    const isBirthdayWindow = today.getMonth() === 3 && today.getDate() === 25 && today.getFullYear() === 2026;

    if (!hasSeen && isBirthdayWindow) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('birthday_popup_seen', 'true');
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-card/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Carousel Container */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square bg-black overflow-hidden group shrink-0">
          {IMAGES.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: currentIndex === index ? 1 : 0,
                zIndex: currentIndex === index ? 10 : 0
              }}
            >
              <Image
                src={src}
                alt={`Birthday Carousel ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Golden Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />

          {/* Navigation Controls (Visible on hover) */}
          <div className="absolute inset-0 z-30 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={prevSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all transform hover:scale-110">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all transform hover:scale-110">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center gap-2">
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentIndex === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-30 p-8 text-center -mt-16 bg-gradient-to-b from-transparent to-card shrink-0">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-yellow-500/20 text-yellow-500 backdrop-blur-xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <Gift className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Happy Birthday!
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </h2>
          <p className="text-lg text-muted-foreground font-medium mb-1">
            To Our Visionary Co-Founder & Investor
          </p>
          <p className="text-sm text-muted-foreground/80 max-w-[280px] mx-auto">
            Wishing you a fantastic year ahead filled with innovation, success, and monumental achievements. 
          </p>
        </div>
      </div>
    </div>
  );
}
