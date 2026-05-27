'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Compass } from 'lucide-react';

const geetaQuotes = [
  {
    chapter: 'Chapter 2, Verse 47',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    english: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.',
    theme: 'Focus on Action, Not Results',
    image: '/blog/geeta-action.png'
  },
  {
    chapter: 'Chapter 6, Verse 5',
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    english: 'Elevate yourself through the power of your mind, and do not degrade yourself. For the mind can be the friend and also the enemy of the self.',
    theme: 'Power of the Mind',
    image: '/blog/geeta-mind.png'
  },
  {
    chapter: 'Chapter 2, Verse 50',
    sanskrit: 'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥',
    english: 'One who is united in consciousness rids oneself of both good and evil deeds in this life. Therefore, strive for Yoga, which is the art of all work.',
    theme: 'Excellence in Action',
    image: '/blog/geeta-wisdom.png'
  },
  {
    chapter: 'Chapter 2, Verse 14',
    sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
    english: 'The contact between the senses and their objects gives rise to cold and heat, pleasure and pain. They are fleeting and temporary; learn to tolerate them, O Bharata.',
    theme: 'Resilience and Equanimity',
    image: '/blog/geeta-resilience.png'
  },
  {
    chapter: 'Chapter 18, Verse 78',
    sanskrit: 'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥',
    english: 'Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the supreme archer, there will also be prosperity, victory, extraordinary power, and morality.',
    theme: 'Victory and Ethics',
    image: '/blog/geeta-victory.png'
  },
  {
    chapter: 'Chapter 3, Verse 19',
    sanskrit: 'तस्मादसक्तः सततम् कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥',
    english: 'Therefore, without attachment, constantly perform the actions that should be performed, for by performing action without attachment, man reaches the Supreme.',
    theme: 'Selfless Duty',
    image: '/blog/geeta-duty.png'
  },
  {
    chapter: 'Chapter 9, Verse 22',
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    english: 'For those who always worship Me with exclusive devotion, meditating on My form, to them I carry what they lack and preserve what they have.',
    theme: 'Faith and Protection',
    image: '/blog/geeta-faith.png'
  }
];

export default function GeetaQuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(geetaQuotes[0]);

  useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    const todayStr = `${y}-${m}-${d}`;

    // Select quote based on day of month to rotate daily
    const quoteIndex = today.getDate() % geetaQuotes.length;
    setCurrentQuote(geetaQuotes[quoteIndex]);

    const lastShown = localStorage.getItem('geeta_quote_popup_date');
    if (lastShown !== todayStr) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('geeta_quote_popup_date', todayStr);
      }, 3000); // 3-second delay after load
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div
        className="relative max-w-xl w-full rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.25)] border border-amber-500/20 animate-in zoom-in duration-500"
        style={{
          background: 'linear-gradient(135deg, #1c0d02 0%, #301705 50%, #150901 100%)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-20 backdrop-blur-sm border border-white/10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={currentQuote.image}
            alt={`Bhagavad Gita Wisdom - ${currentQuote.theme}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1c0d02]" />
        </div>

        {/* Content */}
        <div className="relative px-8 pb-8 -mt-6 text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mx-auto">
            <Compass className="w-3.5 h-3.5" />
            Daily Wisdom
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Shrimad Bhagavad Gita<br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              {currentQuote.theme}
            </span>
          </h3>

          <p className="text-xs text-amber-500/70 font-semibold tracking-wider uppercase">
            {currentQuote.chapter}
          </p>

          {/* Sanskrit Text */}
          <div className="bg-amber-950/30 border border-amber-900/30 rounded-2xl px-6 py-4">
            <p className="text-base md:text-lg text-amber-200/90 font-serif leading-relaxed whitespace-pre-line tracking-wide">
              {currentQuote.sanskrit}
            </p>
          </div>

          {/* English Translation */}
          <p className="text-sm text-zinc-300 leading-relaxed font-sans max-w-md mx-auto">
            &ldquo;{currentQuote.english}&rdquo;
          </p>

          {/* Action Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="group relative w-full sm:w-auto sm:mx-auto bg-gradient-to-r from-amber-600 to-amber-500 p-[1.5px] rounded-xl overflow-hidden shadow-2xl shadow-amber-900/30 transition hover:scale-105 active:scale-95 block"
          >
            <div className="bg-zinc-950 px-8 py-3 rounded-[10px] transition group-hover:bg-transparent flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:text-zinc-950 transition" />
              <span className="text-white group-hover:text-zinc-950 font-bold uppercase tracking-widest text-sm transition">
                Absorb wisdom
              </span>
            </div>
          </button>

          <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
            With respect from Atul Automation • atulautomation.com
          </p>
        </div>
      </div>
    </div>
  );
}
