'use client';

import React, { useState } from 'react';
import { AstroVastuFullDiagnosticReport } from '@/types/vastu';
import {
  Sparkles,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Palette,
  BookOpen,
  Info,
  Check,
  X,
} from 'lucide-react';

interface DiagnosticReportViewProps {
  report: AstroVastuFullDiagnosticReport;
  lang?: 'hi' | 'en';
}

export const DiagnosticReportView: React.FC<DiagnosticReportViewProps> = ({ report, lang = 'hi' }) => {
  const isHi = lang === 'hi';
  const [confirmedItems, setConfirmedItems] = useState<Record<string, boolean>>({});

  const toggleConfirm = (id: string) => {
    setConfirmedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const confirmedCount = Object.values(confirmedItems).filter(Boolean).length;
  const totalVerificationCount = report.verificationChecklist.length;
  const alignmentScore =
    totalVerificationCount > 0 ? Math.round((confirmedCount / totalVerificationCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 🌟 USER-FRIENDLY QUICK TAKEAWAY HIGHLIGHT CARD 🌟 */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-amber-500/40 shadow-2xl bg-gradient-to-br from-amber-950/20 via-cosmic-900 to-cosmic-950">
        <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm sm:text-base mb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{isHi ? '🌟 सरल शब्दों में आपके लिए 3 मुख्य बातें' : '🌟 Quick Summary in Simple Words'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(isHi ? report.quickFriendlyTakeaways.hi : report.quickFriendlyTakeaways.en).map(
            (takeaway, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-cosmic-950/80 border border-amber-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start space-x-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{takeaway}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden bg-cosmic-950/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-500/20 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {isHi ? 'संपूर्ण विश्लेषण' : 'Diagnostic Synthesis'}
              </span>
              <span className="text-xs text-slate-400">
                {isHi ? '4 शास्त्रीय पद्धतियों पर आधारित' : '4 Classical Systems Integrated'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {isHi ? 'व्यक्तिगत एस्ट्रो-वास्तु डायग्नोस्टिक रिपोर्ट' : 'Personalized Astro-Vastu Diagnostic Report'}
            </h2>
          </div>

          {/* Quick Chart Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-cosmic-900 border border-slate-700 text-slate-300">
              {isHi ? 'लग्न:' : 'Lagna:'}{' '}
              <strong className="text-amber-300">
                {isHi && report.chartSummaryHi ? report.chartSummaryHi.ascendantSign : report.chartSummary.ascendantSign}
              </strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-cosmic-900 border border-slate-700 text-slate-300">
              {isHi ? 'वर्तमान दशा:' : 'Active Dasha:'}{' '}
              <strong className="text-emerald-300">
                {isHi && report.chartSummaryHi ? report.chartSummaryHi.currentDasha : report.chartSummary.currentDasha}
              </strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-cosmic-900 border border-slate-700 text-slate-300">
              {isHi ? 'मातृ पद:' : 'A4 Matri Pada:'}{' '}
              <strong className="text-yellow-300">
                {isHi && report.chartSummaryHi ? report.chartSummaryHi.a4Sign : report.chartSummary.a4Sign}
              </strong>
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {isHi && report.executiveSynthesisHi ? report.executiveSynthesisHi : report.executiveSynthesis}
        </p>
      </div>

      {/* SECTION 1: Near-House Surroundings Prediction */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>
                {isHi
                  ? '1. घर के आस-पास का बाहरी वातावरण (आस-पड़ोस का माहौल)'
                  : '1. Near-House Surroundings Prediction (External Vastu)'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'जैमिनी मातृ पद (A4) व चतुर्थ भाव से निर्धारित कि आपके घर के आसपास क्या स्थित है।'
                : 'Derived from Jaimini A4 (Matri Pada), 4th Bhava Lord, and BNN Trinal alignments.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {report.nearHouseSurroundings.map((surrounding, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-cosmic-900/60 border border-slate-800 hover:border-amber-500/30 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {isHi && surrounding.directionHi ? surrounding.directionHi : `${surrounding.direction} Sector`}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 font-mono">
                  {isHi ? 'सटीकता: उच्च' : `Confidence: ${surrounding.confidence}`}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {isHi && surrounding.detailHi ? surrounding.detailHi : surrounding.detail}
              </p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 font-mono">
                {surrounding.sourceRule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Internal Home Misalignments */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>
                {isHi
                  ? '2. घर के अंदर के वास्तु दोष व कबाड़ की पहचान'
                  : '2. Internal Home Misalignments & Clutter Triggers'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'वर्तमान महादशा व नवतारा चक्र के अनुसार किन कोनों में कबाड़, सीलन या खराब सामान हो सकता है।'
                : 'Pinpointed directions triggered by Active Dasha lords, Navatara 3/5/7 malefic Taras, and BNN trines.'}
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {report.internalHomeMisalignments.map((trigger, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-cosmic-900/60 border border-slate-800 hover:border-rose-500/30 transition space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-white">
                    {isHi && trigger.zoneNameHi ? trigger.zoneNameHi : trigger.zoneName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      trigger.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {isHi ? (trigger.severity === 'Critical' ? 'अति गंभीर दोष' : 'मध्यम प्रभाव') : `${trigger.severity} Severity`}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {trigger.triggeringSystem} ({trigger.triggerPlanet})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-cosmic-950/70 border border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">
                    {isHi ? 'ज्योतिषीय कारण (कुंडली का योग):' : 'Underlying Astrological Cause:'}
                  </span>
                  <span className="text-slate-300 leading-relaxed">
                    {isHi && trigger.causeHi ? trigger.causeHi : trigger.cause}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-cosmic-950/70 border border-slate-800/80">
                  <span className="text-rose-400 font-medium block mb-1">
                    {isHi ? 'घर में संभावित लक्षण (क्या खराब पड़ा है):' : 'Predicted Physical Symptom:'}
                  </span>
                  <span className="text-rose-200 font-medium leading-relaxed">
                    {isHi && trigger.predictedSymptomHi ? trigger.predictedSymptomHi : trigger.predictedSymptom}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-amber-300/90 font-mono">
                {trigger.classicalRemedyCitation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Interactive Verification Step */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 shadow-xl bg-cosmic-950/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                {isHi
                  ? '3. घर के लक्षणों का मिलान (जांचें कि क्या आपके घर में ऐसा है)'
                  : '3. Interactive Physical Symptoms Verification Step'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'नीचे दिए गए लक्षणों को अपने घर में देखें और "हाँ / मिला" पर क्लिक करके पुष्टि करें।'
                : 'Confirm whether the predicted physical manifestations exist in your current residence.'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">
                {isHi ? 'लक्षण मिलान स्कोर' : 'Verification Match'}
              </div>
              <div className="text-lg font-bold text-emerald-400">
                {alignmentScore}% {isHi ? 'सटीक मिला' : 'Confirmed'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cosmic-900 border border-emerald-500/40 flex items-center justify-center font-bold text-sm text-emerald-300">
              {confirmedCount}/{totalVerificationCount}
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {report.verificationChecklist.map((item) => {
            const isChecked = !!confirmedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleConfirm(item.id)}
                className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition select-none gap-3 ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md'
                    : 'bg-cosmic-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs sm:text-sm">
                    <div className="text-slate-200 font-medium">
                      {isHi && item.symptomStatementHi ? item.symptomStatementHi : item.symptomStatement}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {isHi ? 'दिशा:' : 'Direction:'}{' '}
                      <strong className="text-amber-300">
                        {isHi && item.directionHi ? item.directionHi : item.direction}
                      </strong>{' '}
                      • {isHi && item.contextHi ? item.contextHi : item.context}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                    isChecked
                      ? 'bg-emerald-500 text-cosmic-950'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isChecked ? (isHi ? '✓ हाँ, मौजूद है' : '✓ Confirmed') : (isHi ? 'हाँ / मिला' : 'Confirm')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: 3-Tier Personalized Remedies */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="pb-4 border-b border-slate-800">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>
              {isHi
                ? '4. तीन चरणों में आसान व्यक्तिगत वास्तु उपाय (बिना तोड़-फोड़ के)'
                : '4. Three-Tier Personalized Astro-Vastu Remedies'}
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            {isHi
              ? 'चरण 1: कबाड़ हटाना • चरण 2: रंगों व वस्तुओं से संतुलन • चरण 3: सरल शास्त्रीय व आध्यात्मिक उपाय।'
              : 'Tier 1: Physical Decluttering • Tier 2: Elemental/Color Calibration • Tier 3: Classical Shastra Propitiation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Tier 1: Physical Decluttering */}
          <div className="p-5 rounded-2xl bg-cosmic-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <Trash2 className="w-5 h-5" />
              <h4 className="font-bold text-sm text-white">
                {isHi ? 'चरण 1: कबाड़ व पुरानी वस्तुएं हटाना' : 'Tier 1: Physical Decluttering'}
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'इन वस्तुओं को तुरंत हटाने से घर की नकारात्मक ऊर्जा खत्म होगी:'
                : 'Remove the exact material objects triggering energetic dead-weight:'}
            </p>

            <div className="space-y-3">
              {report.threeTierRemedies.tier1PhysicalDeclutter.map((t1, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cosmic-950/70 border border-slate-800 text-xs">
                  <div className="font-semibold text-amber-300 mb-1">
                    {isHi && t1.actionHi ? t1.actionHi : t1.action}
                  </div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {(isHi && t1.itemsToRemoveHi ? t1.itemsToRemoveHi : t1.itemsToRemove).map(
                      (item, i) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: Elemental & Color Vastu */}
          <div className="p-5 rounded-2xl bg-cosmic-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Palette className="w-5 h-5" />
              <h4 className="font-bold text-sm text-white">
                {isHi ? 'चरण 2: रंग और दिशा संतुलन' : 'Tier 2: Elemental / Color Vastu'}
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'कमरे में कौन सा रंग शुभ है और कौन सा रंग नहीं होना चाहिए:'
                : 'Calibrate architectural colors and elemental resonance:'}
            </p>

            <div className="space-y-3">
              {report.threeTierRemedies.tier2ElementalColorVastu.map((t2, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cosmic-950/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-cyan-300">
                    {isHi && t2.directionHi ? t2.directionHi : t2.direction}
                  </div>
                  <div>
                    <span className="text-slate-400">{isHi ? 'शुभ रंग: ' : 'Prescribed: '}</span>
                    <strong className="text-emerald-300">
                      {isHi && t2.prescribedColorHi ? t2.prescribedColorHi : t2.prescribedColor}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">{isHi ? 'बचें इस रंग से: ' : 'Avoid: '}</span>
                    <strong className="text-rose-300">
                      {isHi && t2.avoidColorHi ? t2.avoidColorHi : t2.avoidColor}
                    </strong>
                  </div>
                  <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                    {isHi ? 'उपयोगी वस्तु: ' : 'Corrective Object: '}
                    {isHi && t2.correctiveObjectHi ? t2.correctiveObjectHi : t2.correctiveObject}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3: Classical Remedies with Citations */}
          <div className="p-5 rounded-2xl bg-cosmic-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400">
              <BookOpen className="w-5 h-5" />
              <h4 className="font-bold text-sm text-white">
                {isHi ? 'चरण 3: सरल शास्त्रीय व आध्यात्मिक उपाय' : 'Tier 3: Classical Shastra Remedies'}
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'प्राचीन ग्रंथों के प्रमाणित उपाय जो आप आसानी से कर सकते हैं:'
                : 'Authentic astrological remedies referenced from the Knowledge Base:'}
            </p>

            <div className="space-y-3">
              {report.threeTierRemedies.tier3ClassicalRemedies.map((t3, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cosmic-950/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-emerald-300">{t3.system}</div>
                  <div className="text-slate-200 leading-relaxed">
                    {isHi && t3.remedyTextHi ? t3.remedyTextHi : t3.remedyText}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
                    {t3.citation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
