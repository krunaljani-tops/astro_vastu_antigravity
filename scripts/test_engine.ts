import { calculateVedicBirthChart } from '../src/engine/calculator';
import { generateAstroVastuDiagnosticReport } from '../src/engine/vastu';

console.log('--- Testing AstroVastu Engine ---');

const testInput = {
  fullName: 'Aditya Sharma',
  dob: '1995-08-15',
  tob: '14:30:00',
  place: 'New Delhi, India',
  latitude: 28.6139,
  longitude: 77.2090,
  timezoneOffsetHours: 5.5,
};

const chart = calculateVedicBirthChart(testInput);

console.log(`User: ${chart.user.fullName}`);
console.log(`Ayanamsha: ${chart.ayanamsha.name} -> ${chart.ayanamsha.formatted}`);
console.log(`Lagna: ${chart.lagna.sanskritSignName} (${chart.lagna.signName}) at ${chart.lagna.formattedDegree}, Nakshatra: ${chart.lagna.nakshatra.name} Pada ${chart.lagna.nakshatra.pada}`);
console.log(`Moon: Nakshatra ${chart.planets.find(p => p.name === 'Moon')?.nakshatra.name}, Sign: ${chart.planets.find(p => p.name === 'Moon')?.signName}`);
console.log(`Current Dasha: ${chart.vimshottari.currentMahadasha} MD / ${chart.vimshottari.currentAntardasha} AD`);
console.log(`Jaimini Atmakaraka (AK): ${chart.jaimini.atmakaraka}, Matrukaraka (MK): ${chart.jaimini.matrukaraka}`);
console.log(`Jaimini A4 Matri Pada Sign: ${chart.jaimini.a4SanskritSignName} (${chart.jaimini.a4SignName}), House from Lagna: ${chart.jaimini.a4HouseFromLagna}`);
console.log(`BNN Trines:`);
chart.bnnTrines.forEach(t => {
  console.log(`  Direction: ${t.direction} (${t.element}) -> Planets: ${t.planets.join(', ') || 'None'}`);
});

const report = generateAstroVastuDiagnosticReport(chart);
console.log('\n--- Diagnostic Report Generated ---');
console.log(`Near-House Surroundings Count: ${report.nearHouseSurroundings.length}`);
console.log(`Internal Home Misalignments: ${report.internalHomeMisalignments.length}`);
console.log(`Verification Items Count: ${report.verificationChecklist.length}`);
console.log(`Tier 1 Declutter Actions: ${report.threeTierRemedies.tier1PhysicalDeclutter.length}`);
console.log(`Tier 3 Classical Remedies: ${report.threeTierRemedies.tier3ClassicalRemedies.length}`);
console.log('Test PASSED successfully!');
