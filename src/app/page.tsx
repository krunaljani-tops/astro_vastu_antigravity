'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { BirthIntakeForm, BirthFormSubmitData } from '@/components/BirthIntakeForm';
import { ChartViewer } from '@/components/ChartViewer';
import { PlanetaryTable } from '@/components/PlanetaryTable';
import { DashaTimeline } from '@/components/DashaTimeline';
import { VastuChakra16 } from '@/components/VastuChakra16';
import { DiagnosticReportView } from '@/components/DiagnosticReportView';
import { AstroVastuChat } from '@/components/AstroVastuChat';
import { BirthChartData } from '@/types/astrology';
import { AstroVastuFullDiagnosticReport } from '@/types/vastu';
import { Compass, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [chart, setChart] = useState<BirthChartData | null>(null);
  const [report, setReport] = useState<AstroVastuFullDiagnosticReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isHi = lang === 'hi';

  // Auto-calculate default chart on first load for immediate instant visual delight
  useEffect(() => {
    handleFormSubmit({
      fullName: isHi ? 'रोहन शर्मा' : 'Rohan Sharma',
      dob: '1995-08-15',
      tob: '14:30:00',
      place: 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezoneOffsetHours: 5.5,
    });
  }, []);

  const handleFormSubmit = async (data: BirthFormSubmitData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        setChart(result.chart);
        setReport(result.report);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to calculate astrological chart');
      }
    } catch (err: any) {
      setError(err.message || 'Network connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentLang={lang} onLangChange={setLang} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto pt-2 pb-2 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHi ? 'वैदिक वास्तु व ज्योतिष का सरल संगम' : 'Vedic Spatial Diagnostic Intelligence'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
            {isHi ? 'एस्ट्रो-वास्तु समाधान AI' : 'Astro-Vastu Shastra AI'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isHi ? (
              <>
                अपनी जन्म कुंडली के आधार पर जानिए कि आपके घर के किस कोने में क्या वास्तु दोष है, और बिना किसी तोड़-फोड़ के केवल <strong className="text-amber-300">सफाई, रंगों व छोटे-छोटे घरेलू उपायों</strong> से अपने जीवन में सुख, शांति व समृद्धि कैसे लाएं।
              </>
            ) : (
              <>
                Uniting <strong className="text-amber-300">Parashari</strong>,{' '}
                <strong className="text-amber-300">Navatara 9-Tara Chakra</strong>,{' '}
                <strong className="text-amber-300">Bhrigu Nandi Nadi (BNN)</strong>, and{' '}
                <strong className="text-amber-300">Jaimini A4 Matri Pada</strong> with an Admin Reference Knowledge Base.
              </>
            )}
          </p>
        </div>

        {/* Natal Birth Details Intake Form */}
        <section id="intake-form">
          <BirthIntakeForm onSubmit={handleFormSubmit} isLoading={isLoading} lang={lang} />
        </section>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Render Calculated Results when Chart and Report exist */}
        {chart && report && (
          <div className="space-y-10 animate-fade-in">
            {/* Section: 4-System Astro-Vastu Diagnostic Report (Placed prominently first for user-friendly understanding!) */}
            <section className="space-y-6">
              <DiagnosticReportView report={report} lang={lang} />
            </section>

            {/* Section: Interactive AI Advisor Chat with RAG Citations */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {isHi ? 'वास्तु सहायक से सीधे सवाल पूछें' : 'Interactive Astro-Vastu AI Chat Assistant'}
                </h2>
              </div>
              <AstroVastuChat chart={chart} report={report} lang={lang} />
            </section>

            {/* Section: Astrological Foundations (Chart & Planetary Table) */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <Layers className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {isHi ? 'आपकी जन्म कुंडली व 16 वास्तु दिशा चक्र' : 'Astrological Foundations & Planetary Coordinates'}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* D1 Lagna Chart Visualizer */}
                <div className="lg:col-span-5">
                  <ChartViewer chart={chart} />
                </div>

                {/* Vimshottari Dasha & Antardasha Timeline */}
                <div className="lg:col-span-7 space-y-6">
                  <DashaTimeline vimshottari={chart.vimshottari} />
                  <VastuChakra16 chart={chart} />
                </div>
              </div>

              {/* Planetary Summary Table */}
              <div>
                <PlanetaryTable chart={chart} />
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
