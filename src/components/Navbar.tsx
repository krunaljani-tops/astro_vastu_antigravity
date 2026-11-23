'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, BookOpen, Home, Languages, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentLang?: 'hi' | 'en';
  onLangChange?: (lang: 'hi' | 'en') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang = 'hi', onLangChange }) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition">
            <div className="w-full h-full bg-cosmic-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 bg-clip-text text-transparent">
                AstroVastu AI
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {currentLang === 'hi' ? 'एस्ट्रो-वास्तु' : '4-System Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {currentLang === 'hi'
                ? 'कुंडली व वास्तु शास्त्र का सरल व सटीक विश्लेषण'
                : 'Parashari • Navatara • Bhrigu Nandi Nadi • Jaimini'}
            </p>
          </div>
        </Link>

        {/* Navigation Links + Language Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Switcher Pill Button */}
          {onLangChange && (
            <div className="flex items-center bg-cosmic-950/90 p-1 rounded-xl border border-amber-500/30 shadow-inner">
              <button
                type="button"
                onClick={() => onLangChange('hi')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  currentLang === 'hi'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-cosmic-950 shadow-md'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                <span>हिन्दी</span>
              </button>
              <button
                type="button"
                onClick={() => onLangChange('en')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-cosmic-950 shadow-md'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                <span>English</span>
              </button>
            </div>
          )}

          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                pathname === '/'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{currentLang === 'hi' ? 'वास्तु रिपोर्ट' : 'Diagnostic Portal'}</span>
            </Link>

            <Link
              href="/admin"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                pathname === '/admin'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{currentLang === 'hi' ? 'शास्त्र ज्ञान केंद्र' : 'Admin RAG'}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
