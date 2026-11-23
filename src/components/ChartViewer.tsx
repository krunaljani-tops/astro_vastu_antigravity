'use client';

import React, { useState } from 'react';
import { BirthChartData, ChartHouse, PlanetPosition } from '@/types/astrology';
import { Eye, Layers, Compass, Sparkles } from 'lucide-react';

interface ChartViewerProps {
  chart: BirthChartData;
}

export const ChartViewer: React.FC<ChartViewerProps> = ({ chart }) => {
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');

  // Helper to format planet list in a house
  const renderPlanetsText = (planets: PlanetPosition[]) => {
    return planets.map((p) => {
      const isA4 = chart.jaimini.a4Lord === p.name;
      const isMD = chart.vimshottari.currentMahadasha === p.name;
      return (
        <span
          key={p.name}
          className={`inline-block mr-1 text-[10px] font-semibold ${
            isMD
              ? 'text-amber-300 underline decoration-amber-400 font-bold'
              : p.isRetrograde
              ? 'text-rose-300'
              : 'text-slate-200'
          }`}
          title={`${p.name} (${p.formattedDegree}) ${p.isRetrograde ? '[R]' : ''}`}
        >
          {p.name.substring(0, 2)}
          {p.isRetrograde ? '®' : ''}
        </span>
      );
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
      {/* Header with Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>D1 Lagna Vedic Natal Chart</span>
          </h3>
          <p className="text-xs text-slate-400">
            Ascendant:{' '}
            <strong className="text-amber-300 font-semibold">
              {chart.lagna.signName} ({chart.lagna.sanskritSignName}) {chart.lagna.formattedDegree}
            </strong>
          </p>
        </div>

        {/* Style Toggle */}
        <div className="flex items-center space-x-1 bg-cosmic-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setChartStyle('north')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              chartStyle === 'north'
                ? 'bg-amber-500 text-cosmic-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            North Indian
          </button>
          <button
            type="button"
            onClick={() => setChartStyle('south')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              chartStyle === 'south'
                ? 'bg-amber-500 text-cosmic-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            South Indian
          </button>
        </div>
      </div>

      {/* SVG Chart Display */}
      <div className="mt-4 flex flex-col items-center justify-center">
        {chartStyle === 'north' ? (
          /* North Indian Diamond Kundali SVG */
          <div className="w-full max-w-[360px] sm:max-w-[400px] aspect-square relative">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl font-sans"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary */}
              <rect
                x="10"
                y="10"
                width="380"
                height="380"
                fill="#0a0f1d"
                stroke="#d97706"
                strokeWidth="2.5"
                rx="8"
              />

              {/* Diagonal lines */}
              <line x1="10" y1="10" x2="390" y2="390" stroke="#b45309" strokeWidth="1.5" />
              <line x1="390" y1="10" x2="10" y2="390" stroke="#b45309" strokeWidth="1.5" />

              {/* Diamond lines connecting midpoints */}
              <polygon
                points="200,10 390,200 200,390 10,200"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />

              {/* Central Diamond Inner X */}
              <line x1="105" y1="105" x2="295" y2="295" stroke="#78350f" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="295" y1="105" x2="105" y2="295" stroke="#78350f" strokeWidth="1" strokeDasharray="3,3" />

              {/* House 1 (Top Center Diamond) */}
              <g className="cursor-pointer">
                <text x="200" y="45" fill="#fcd370" fontSize="11" textAnchor="middle" fontWeight="bold">
                  H1 • {chart.houses[0].sanskritSignName} ({chart.houses[0].signIndex})
                </text>
                <text x="200" y="65" fill="#fef08a" fontSize="10" textAnchor="middle" fontWeight="bold">
                  LAGNA {chart.houses[0].signIndex === chart.jaimini.a4SignIndex ? '• [A4]' : ''}
                </text>
                <text x="200" y="115" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="600">
                  {chart.houses[0].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 2 (Top Left Triangle) */}
              <g>
                <text x="100" y="45" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H2 ({chart.houses[1].signIndex})
                </text>
                <text x="90" y="90" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[1].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 3 (Left Top Triangle) */}
              <g>
                <text x="45" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H3 ({chart.houses[2].signIndex})
                </text>
                <text x="50" y="140" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[2].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 4 (Left Diamond) */}
              <g>
                <text x="105" y="195" fill="#fcd370" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H4 ({chart.houses[3].signIndex}) {chart.houses[3].signIndex === chart.jaimini.a4SignIndex ? '★A4' : ''}
                </text>
                <text x="105" y="225" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="600">
                  {chart.houses[3].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 5 (Left Bottom Triangle) */}
              <g>
                <text x="45" y="300" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H5 ({chart.houses[4].signIndex})
                </text>
                <text x="55" y="270" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[4].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 6 (Bottom Left Triangle) */}
              <g>
                <text x="100" y="365" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H6 ({chart.houses[5].signIndex})
                </text>
                <text x="90" y="320" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[5].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 7 (Bottom Center Diamond) */}
              <g>
                <text x="200" y="365" fill="#fcd370" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H7 ({chart.houses[6].signIndex}) {chart.houses[6].signIndex === chart.jaimini.a4SignIndex ? '★A4' : ''}
                </text>
                <text x="200" y="285" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="600">
                  {chart.houses[6].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 8 (Bottom Right Triangle) */}
              <g>
                <text x="300" y="365" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H8 ({chart.houses[7].signIndex})
                </text>
                <text x="310" y="320" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[7].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 9 (Right Bottom Triangle) */}
              <g>
                <text x="355" y="300" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H9 ({chart.houses[8].signIndex})
                </text>
                <text x="345" y="270" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[8].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 10 (Right Center Diamond) */}
              <g>
                <text x="295" y="195" fill="#fcd370" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H10 ({chart.houses[9].signIndex}) {chart.houses[9].signIndex === chart.jaimini.a4SignIndex ? '★A4' : ''}
                </text>
                <text x="295" y="225" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="600">
                  {chart.houses[9].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 11 (Right Top Triangle) */}
              <g>
                <text x="355" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H11 ({chart.houses[10].signIndex})
                </text>
                <text x="345" y="140" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[10].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>

              {/* House 12 (Top Right Triangle) */}
              <g>
                <text x="300" y="45" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  H12 ({chart.houses[11].signIndex})
                </text>
                <text x="310" y="90" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="600">
                  {chart.houses[11].planets.map((p) => p.name.substring(0, 2)).join(' ')}
                </text>
              </g>
            </svg>
          </div>
        ) : (
          /* South Indian Fixed Box Chart */
          <div className="w-full max-w-[360px] sm:max-w-[400px] aspect-square relative">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl font-sans"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="10" width="380" height="380" fill="#0a0f1d" stroke="#d97706" strokeWidth="2.5" rx="8" />
              {/* Inner box */}
              <rect x="105" y="105" width="190" height="190" fill="#070a13" stroke="#f59e0b" strokeWidth="1.5" />
              {/* Grid lines */}
              <line x1="105" y1="10" x2="105" y2="390" stroke="#b45309" strokeWidth="1.5" />
              <line x1="200" y1="10" x2="200" y2="105" stroke="#b45309" strokeWidth="1.5" />
              <line x1="200" y1="295" x2="200" y2="390" stroke="#b45309" strokeWidth="1.5" />
              <line x1="295" y1="10" x2="295" y2="390" stroke="#b45309" strokeWidth="1.5" />

              <line x1="10" y1="105" x2="390" y2="105" stroke="#b45309" strokeWidth="1.5" />
              <line x1="10" y1="200" x2="105" y2="200" stroke="#b45309" strokeWidth="1.5" />
              <line x1="295" y1="200" x2="390" y2="200" stroke="#b45309" strokeWidth="1.5" />
              <line x1="10" y1="295" x2="390" y2="295" stroke="#b45309" strokeWidth="1.5" />

              {/* Center text */}
              <text x="200" y="195" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="bold">
                D1 LAGNA
              </text>
              <text x="200" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">
                South Indian Chart
              </text>
            </svg>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Lagna (Ascendant)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>★A4 (Matri Pada)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-amber-300 font-bold underline">Underline</span>
            <span>= Current Dasha Lord</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-rose-400 font-bold">®</span>
            <span>= Retrograde</span>
          </span>
        </div>
      </div>
    </div>
  );
};
