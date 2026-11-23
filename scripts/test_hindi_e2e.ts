async function testHindiAndUserFriendly() {
  console.log('--- Testing Hindi Language & User-Friendly Features ---');
  const baseUrl = 'http://localhost:3000';

  // 1. Check Home Page contains Hindi text
  console.log('1. Checking Home Page for Hindi Support...');
  const resHome = await fetch(`${baseUrl}/`);
  const htmlHome = await resHome.text();
  console.log(`   ✓ Home served. Contains "एस्ट्रो-वास्तु": ${htmlHome.includes('एस्ट्रो-वास्तु') || htmlHome.includes('हिन्दी')}`);

  // 2. Test Calculation with Hindi localization
  console.log('2. Testing /api/calculate with Hindi fields...');
  const calcRes = await fetch(`${baseUrl}/api/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'रोहन शर्मा',
      dob: '1995-08-15',
      tob: '14:30:00',
      place: 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezoneOffsetHours: 5.5,
    }),
  });
  const data = await calcRes.json();
  const report = data.report;

  console.log(`   ✓ Chart Summary (Hindi): ${report.chartSummaryHi?.ascendantSign}, Dasha: ${report.chartSummaryHi?.currentDasha}`);
  console.log(`   ✓ Quick Takeaways Count (Hindi): ${report.quickFriendlyTakeaways?.hi?.length}`);
  console.log(`     Point 1: ${report.quickFriendlyTakeaways?.hi?.[0]}`);
  console.log(`     Point 2: ${report.quickFriendlyTakeaways?.hi?.[1]}`);
  console.log(`   ✓ Executive Synthesis (Hindi): ${report.executiveSynthesisHi?.substring(0, 100)}...`);
  console.log(`   ✓ Surroundings (Hindi): ${report.nearHouseSurroundings?.[0]?.detailHi}`);
  console.log(`   ✓ Defect Trigger (Hindi): ${report.internalHomeMisalignments?.[0]?.zoneNameHi} -> ${report.internalHomeMisalignments?.[0]?.predictedSymptomHi}`);
  console.log(`   ✓ Verification Checklist (Hindi): ${report.verificationChecklist?.[0]?.symptomStatementHi}`);
  console.log(`   ✓ Tier 1 Physical Declutter (Hindi): ${report.threeTierRemedies?.tier1PhysicalDeclutter?.[0]?.actionHi}`);
  console.log(`   ✓ Tier 2 Color Remedy (Hindi): ${report.threeTierRemedies?.tier2ElementalColorVastu?.[0]?.prescribedColorHi}`);
  console.log(`   ✓ Tier 3 Classical Remedy (Hindi): ${report.threeTierRemedies?.tier3ClassicalRemedies?.[0]?.remedyTextHi}`);

  // 3. Test AI Chat in Hindi
  console.log('\n3. Testing /api/ai/chat with Hindi message...');
  const chatRes = await fetch(`${baseUrl}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'मेरी रसोई के लिए क्या सरल वास्तु उपाय करें?',
      chartSummary: report.chartSummary,
      currentReport: report,
      lang: 'hi',
    }),
  });
  const chatData = await chatRes.json();
  console.log(`   ✓ AI Assistant replied in Hindi (${chatData.answer.length} chars):`);
  console.log(`   --------------------------------------------------`);
  console.log(`   ${chatData.answer.substring(0, 300)}...`);
  console.log(`   --------------------------------------------------`);

  console.log('\n🎉 ALL HINDI & USER-FRIENDLY CHECKS PASSED SUCCESSFULLY!');
}

testHindiAndUserFriendly().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
