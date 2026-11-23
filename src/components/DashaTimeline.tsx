'use client';

import React from 'react';
import { VimshottariDashaState } from '@/types/astrology';
import { Clock, Calendar, Sparkles } from 'lucide-react';

interface DashaTimelineProps {
  vimshottari: VimshottariDashaState;
}

export const DashaTimeline: React.FC<DashaTimelineProps> = ({ vimshottari }) => {
  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return isoStr;
    }
  };

  const currentMD = vimshottari.fullPeriods.find((p) => p.isCurrent);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>Vimshottari Dasha & Antardasha Timeline</span>
          </h3>
          <p className="text-xs text-slate-400">
            Active Period:{' '}
            <strong className="text-amber-300 font-semibold">
              {vimshottari.currentMahadasha} Mahadasha • {vimshottari.currentAntardasha} Antardasha
            </strong>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
            {formatDate(vimshottari.adStartDate)} — {formatDate(vimshottari.adEndDate)}
          </span>
        </div>
      </div>

      {/* Mahadasha Period Bar Track */}
      <div className="mt-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          120-Year Vimshottari Mahadasha Sequence
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
          {vimshottari.fullPeriods.map((period) => (
            <div
              key={period.planet}
              className={`p-2 rounded-xl text-center border transition ${
                period.isCurrent
                  ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                  : 'bg-cosmic-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`text-xs font-bold ${
                  period.isCurrent ? 'text-amber-300' : 'text-slate-300'
                }`}
              >
                {period.planet}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {formatDate(period.startDate).split(' ')[1] || formatDate(period.startDate)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Antardashas within current Mahadasha */}
      {currentMD && currentMD.antardashas && (
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Antardashas under {currentMD.planet} Mahadasha</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
            {currentMD.antardashas.map((ad) => (
              <div
                key={ad.planet}
                className={`p-2 rounded-xl text-center border transition ${
                  ad.isCurrent
                    ? 'bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400'
                    : 'bg-cosmic-900/40 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`text-[11px] font-bold ${
                    ad.isCurrent ? 'text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  {currentMD.planet}-{ad.planet}
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">
                  {formatDate(ad.startDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
