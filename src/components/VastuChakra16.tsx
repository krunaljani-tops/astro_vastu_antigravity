'use client';

import React, { useState } from 'react';
import { BirthChartData, DirectionType } from '@/types/astrology';
import { VASTU_ZONES_16 } from '@/engine/vastu';
import { Compass, Info, ShieldAlert, Sparkles } from 'lucide-react';
import { VastuZoneRule } from '@/types/vastu';

interface VastuChakra16Props {
  chart: BirthChartData;
}

export const VastuChakra16: React.FC<VastuChakra16Props> = ({ chart }) => {
  const [selectedZone, setSelectedZone] = useState<VastuZoneRule>(VASTU_ZONES_16[1]); // Default Ishanya NE

  // Find planets residing in a given direction
  const getPlanetsInDirection = (direction: DirectionType) => {
    return chart.planets.filter((p) => p.primaryVastuDirection === direction);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>16-Zone Astro-Vastu Directional Chakra</span>
          </h3>
          <p className="text-xs text-slate-400">
            Click any quadrant to view classical shastra attributes, ruling deities, and planetary allocations.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-cosmic-900 border border-slate-700 text-slate-300">
            Selected: <strong className="text-amber-300">{selectedZone.direction}</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Interactive Visual Direction Grid */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm sm:max-w-md aspect-square p-3 rounded-2xl bg-cosmic-950/80 border border-amber-500/20 shadow-inner">
            {/* Row 1: NW, N, NE */}
            {/* North-West (NW) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'North-West')!;
              const planets = getPlanetsInDirection('North-West');
              const isSelected = selectedZone.direction === 'North-West';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">NW (Vayavya)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Moon</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* North (N) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'North')!;
              const planets = getPlanetsInDirection('North');
              const isSelected = selectedZone.direction === 'North';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">North (Kubera)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Mercury</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* North-East (NE) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'North-East')!;
              const planets = getPlanetsInDirection('North-East');
              const isSelected = selectedZone.direction === 'North-East';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">NE (Ishanya)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Jupiter</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* Row 2: West, Center, East */}
            {/* West (W) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'West')!;
              const planets = getPlanetsInDirection('West');
              const isSelected = selectedZone.direction === 'West';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">West (Varuna)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Saturn</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* Center (Brahmasthan) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'Center')!;
              const planets = getPlanetsInDirection('Center');
              const isSelected = selectedZone.direction === 'Center';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-amber-950/20 border-amber-500/40 hover:bg-amber-950/40'
                  }`}
                >
                  <span className="text-[10px] text-amber-400 uppercase font-bold">Brahmasthan</span>
                  <span className="text-xs font-bold text-amber-200 mt-0.5">Ketu</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* East (E) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'East')!;
              const planets = getPlanetsInDirection('East');
              const isSelected = selectedZone.direction === 'East';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">East (Purva)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Sun</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* Row 3: SW, S, SE */}
            {/* South-West (SW) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'South-West')!;
              const planets = getPlanetsInDirection('South-West');
              const isSelected = selectedZone.direction === 'South-West';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">SW (Nairruti)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Rahu</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* South (S) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'South')!;
              const planets = getPlanetsInDirection('South');
              const isSelected = selectedZone.direction === 'South';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">South (Dakshina)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Mars</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}

            {/* South-East (SE) */}
            {(() => {
              const zone = VASTU_ZONES_16.find((z) => z.direction === 'South-East')!;
              const planets = getPlanetsInDirection('South-East');
              const isSelected = selectedZone.direction === 'South-East';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition text-center ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">SE (Agneya)</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5">Venus</span>
                  <div className="text-[9px] text-amber-300 mt-1 font-mono">
                    {planets.map((p) => p.name.substring(0, 2)).join(', ') || '—'}
                  </div>
                </button>
              );
            })()}
          </div>
        </div>

        {/* Selected Zone Shastra Intelligence Panel */}
        <div className="lg:col-span-5 bg-cosmic-900/50 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-base font-bold text-white">{selectedZone.zone}</h4>
              <p className="text-xs text-amber-400 font-medium">
                Deity: {selectedZone.deity} • Element: {selectedZone.element}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
              {selectedZone.rulingPlanet}
            </span>
          </div>

          {/* User's natal planets here */}
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Your Natal Planets Here:</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {getPlanetsInDirection(selectedZone.direction).length > 0 ? (
                getPlanetsInDirection(selectedZone.direction).map((p) => (
                  <span
                    key={p.name}
                    className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                  >
                    {p.name} ({p.formattedDegree})
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic">No natal grahas situated in this sector</span>
              )}
            </div>
          </div>

          {/* Ideal Rooms */}
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Auspicious Activities / Rooms:</span>
            <ul className="mt-1 list-disc list-inside text-slate-200 space-y-0.5">
              {selectedZone.idealRooms.map((room, idx) => (
                <li key={idx}>{room}</li>
              ))}
            </ul>
          </div>

          {/* Taboo Items */}
          <div className="text-xs">
            <span className="text-rose-400 font-medium flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Taboo / Toxic Elements in this Zone:</span>
            </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {selectedZone.tabooItems.map((item, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Standard Remedies */}
          <div className="text-xs pt-2 border-t border-slate-800">
            <span className="text-emerald-400 font-medium">Prescribed Shastra Remedies:</span>
            <ul className="mt-1 space-y-1 text-slate-300">
              {selectedZone.standardRemedies.map((rem, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{rem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
