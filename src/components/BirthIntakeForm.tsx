'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles, Compass } from 'lucide-react';
import { GeoPlace } from '@/services/geocoding';

export interface BirthFormSubmitData {
  fullName: string;
  dob: string;
  tob: string;
  place: string;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number;
}

interface BirthIntakeFormProps {
  onSubmit: (data: BirthFormSubmitData) => void;
  isLoading: boolean;
  lang?: 'hi' | 'en';
}

export const BirthIntakeForm: React.FC<BirthIntakeFormProps> = ({ onSubmit, isLoading, lang = 'hi' }) => {
  const isHi = lang === 'hi';
  const [fullName, setFullName] = useState('रोहन शर्मा');
  const [dob, setDob] = useState('1995-08-15');
  const [tob, setTob] = useState('14:30:00');
  const [placeQuery, setPlaceQuery] = useState('New Delhi, India');
  const [selectedPlace, setSelectedPlace] = useState<GeoPlace>({
    name: 'New Delhi',
    formattedAddress: 'New Delhi, Delhi, India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
    country: 'India',
  });

  const [placeSuggestions, setPlaceSuggestions] = useState<GeoPlace[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (placeQuery.length < 2) {
      setPlaceSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingPlaces(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(placeQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setPlaceSuggestions(data.places || []);
          setShowDropdown(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearchingPlaces(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [placeQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPlace = (place: GeoPlace) => {
    setSelectedPlace(place);
    setPlaceQuery(place.formattedAddress);
    setShowDropdown(false);
  };

  const handleQuickSample = (name: string, date: string, time: string, pName: string, lat: number, lon: number, tz: number) => {
    setFullName(name);
    setDob(date);
    setTob(time);
    setPlaceQuery(pName);
    setSelectedPlace({
      name: pName,
      formattedAddress: pName,
      latitude: lat,
      longitude: lon,
      timezone: tz,
      country: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName,
      dob,
      tob,
      place: selectedPlace.formattedAddress || placeQuery,
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      timezoneOffsetHours: selectedPlace.timezone,
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{isHi ? 'जन्म विवरण भरें (जन्म कुंडली व वास्तु)' : 'Natal Birth Details Intake'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {isHi
              ? 'अपनी जन्म तारीख, समय व शहर डालें — सटीक वैदिक गणित द्वारा आपके घर के वास्तु दोष व उपाय तुरंत तैयार होंगे।'
              : 'Computes exact Lahiri Sidereal Lagna, Dasha periods, Navatara Chakra, and Jaimini Karakas.'}
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {isHi ? 'उदाहरण देखें:' : 'Quick Presets:'}
          </span>
          <button
            type="button"
            onClick={() => handleQuickSample(isHi ? 'रोहन शर्मा' : 'Rohan Sharma', '1995-08-15', '14:30:00', 'New Delhi, India', 28.6139, 77.2090, 5.5)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition"
          >
            {isHi ? 'नमूना: दिल्ली (1995)' : 'Sample: Delhi (1995)'}
          </button>
          <button
            type="button"
            onClick={() => handleQuickSample(isHi ? 'प्रिया पटेल' : 'Priya Patel', '1992-11-20', '08:15:00', 'Mumbai, India', 19.0760, 72.8777, 5.5)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition"
          >
            {isHi ? 'नमूना: मुंबई (1992)' : 'Sample: Mumbai (1992)'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'पूरा नाम' : 'Full Name'}</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isHi ? 'उदा. रोहन शर्मा' : 'e.g. Rohan Sharma'}
              className="w-full bg-cosmic-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'जन्म तारीख' : 'Date of Birth'}</span>
            </label>
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-cosmic-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition [color-scheme:dark]"
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'जन्म समय (घंटे:मिनट:सेकंड)' : 'Time of Birth (24h)'}</span>
            </label>
            <input
              type="time"
              step="1"
              required
              value={tob}
              onChange={(e) => setTob(e.target.value)}
              className="w-full bg-cosmic-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition [color-scheme:dark]"
            />
          </div>

          {/* Place of Birth with Autocomplete */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'जन्म स्थान / शहर' : 'Place of Birth'}</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={placeQuery}
                onChange={(e) => {
                  setPlaceQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={isHi ? 'शहर का नाम लिखें...' : 'Search city or town...'}
                className="w-full bg-cosmic-900/90 border border-slate-700/80 rounded-xl pl-3.5 pr-8 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
              {isSearchingPlaces && (
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {showDropdown && placeSuggestions.length > 0 && (
              <div className="absolute z-50 mt-1 w-full glass-panel bg-cosmic-950 border border-amber-500/30 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
                {placeSuggestions.map((place, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPlace(place)}
                    className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-amber-500/10 hover:text-amber-300 border-b border-slate-800/80 last:border-b-0 flex items-center justify-between transition"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{place.name}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{place.formattedAddress}</div>
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono ml-2">
                      UTC{place.timezone >= 0 ? `+${place.timezone}` : place.timezone}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resolved Geo Info Preview Pill */}
        <div className="bg-cosmic-900/40 rounded-xl p-3 border border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 text-slate-300">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'भौगोलिक स्थिति:' : 'Resolved Coordinates:'}</span>
            </span>
            <span className="font-mono text-amber-300">
              {selectedPlace.latitude.toFixed(4)}° N, {selectedPlace.longitude.toFixed(4)}° E
            </span>
            <span className="text-slate-600">•</span>
            <span>
              {isHi ? 'समय अंतर:' : 'Timezone:'}{' '}
              <strong className="text-emerald-400 font-mono">
                UTC{selectedPlace.timezone >= 0 ? `+${selectedPlace.timezone}` : selectedPlace.timezone}h
              </strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {isHi ? 'अयनांश: चित्रापक्ष / लाहिरी (सटीक निरयण)' : 'Ayanamsha: Chitrapaksha / Lahiri Sidereal'}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-cosmic-950 hover:from-amber-400 hover:to-yellow-300 transition-all duration-300 shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 group"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-cosmic-950 border-t-transparent rounded-full animate-spin" />
              <span>{isHi ? 'आपकी कुंडली व वास्तु का विश्लेषण हो रहा है...' : 'Computing 4-System Astro-Vastu Diagnostic...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>{isHi ? 'सरल एस्ट्रो-वास्तु रिपोर्ट देखें (घर के दोष व उपाय)' : 'Generate 4-System Astro-Vastu Diagnostic Report'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
