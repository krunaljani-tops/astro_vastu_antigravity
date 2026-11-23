'use client';

import React from 'react';
import { BirthChartData, PlanetPosition } from '@/types/astrology';
import { Table, AlertTriangle, ShieldCheck, Star } from 'lucide-react';

interface PlanetaryTableProps {
  chart: BirthChartData;
}

export const PlanetaryTable: React.FC<PlanetaryTableProps> = ({ chart }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-amber-400" />
            <span>Planetary Position & 4-System Classifications</span>
          </h3>
          <p className="text-xs text-slate-400">
            Computed under <strong className="text-slate-200">{chart.ayanamsha.name}</strong> ({chart.ayanamsha.formatted})
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
            Janma Nakshatra: {chart.lagna.nakshatra.name}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-cosmic-900/90 text-slate-400 border-b border-slate-800 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Planet</th>
              <th className="py-2.5 px-3">Rashi (Sign)</th>
              <th className="py-2.5 px-3">Degrees (DMS)</th>
              <th className="py-2.5 px-3">Nakshatra & Pada</th>
              <th className="py-2.5 px-3">Navatara (9-Tara)</th>
              <th className="py-2.5 px-3">Jaimini Karaka</th>
              <th className="py-2.5 px-3">BNN Direction</th>
              <th className="py-2.5 px-3">Vastu Zone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {chart.planets.map((planet) => {
              const isMalefic = planet.nakshatra.isMaleficTara;
              const isMD = chart.vimshottari.currentMahadasha === planet.name;
              const isAD = chart.vimshottari.currentAntardasha === planet.name;

              return (
                <tr
                  key={planet.name}
                  className={`hover:bg-white/[0.02] transition ${
                    isMD ? 'bg-amber-500/[0.04]' : ''
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-200">
                        {planet.name}
                        {planet.isRetrograde ? (
                          <span className="text-rose-400 text-[10px] ml-1 font-semibold" title="Retrograde">
                            ®
                          </span>
                        ) : null}
                      </span>
                      {isMD && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500 text-cosmic-950 font-bold text-[9px] uppercase">
                          MD
                        </span>
                      )}
                      {isAD && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold text-[9px] uppercase border border-amber-400/30">
                          AD
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">{planet.sanskritName}</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="text-slate-200 font-medium">{planet.signName}</div>
                    <div className="text-[10px] text-slate-400">
                      H{planet.house} • {planet.sanskritSignName}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-xs text-amber-200">
                    {planet.formattedDegree}
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="text-slate-200 font-medium">{planet.nakshatra.name}</div>
                    <div className="text-[10px] text-slate-400">
                      Pada {planet.nakshatra.pada} (Lord: {planet.nakshatra.padaLord})
                    </div>
                  </td>

                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isMalefic
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {isMalefic ? <AlertTriangle className="w-3 h-3 text-rose-400" /> : <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                      <span>{planet.nakshatra.taraName}</span>
                    </span>
                  </td>

                  <td className="py-2.5 px-3">
                    {planet.karaka !== '-' ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold font-mono">
                        {planet.karaka}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="text-slate-200 font-medium">{planet.bnnDirection}</div>
                    <div className="text-[10px] text-slate-400">{planet.element} Sign</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-amber-300 text-xs">
                      {planet.primaryVastuDirection}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
