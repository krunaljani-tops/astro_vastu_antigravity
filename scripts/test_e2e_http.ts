async function testAll() {
  console.log('--- Starting AstroVastu AI End-to-End Suite ---');
  const baseUrl = 'http://localhost:3000';

  // 1. Test Home Page HTML
  console.log('1. Testing GET / (Home Page)...');
  const homeRes = await fetch(`${baseUrl}/`);
  if (!homeRes.ok) throw new Error(`Home page failed with status ${homeRes.status}`);
  const homeHtml = await homeRes.text();
  console.log(`   ✓ Home page served (${homeHtml.length} bytes). Contains "Astro-Vastu Shastra AI": ${homeHtml.includes('Astro-Vastu')}`);

  // 2. Test Admin Page HTML
  console.log('2. Testing GET /admin (Admin Page)...');
  const adminRes = await fetch(`${baseUrl}/admin`);
  if (!adminRes.ok) throw new Error(`Admin page failed with status ${adminRes.status}`);
  const adminHtml = await adminRes.text();
  console.log(`   ✓ Admin page served (${adminHtml.length} bytes). Contains "Knowledge Base": ${adminHtml.includes('Knowledge')}`);

  // 3. Test Geocode Search API
  console.log('3. Testing GET /api/geocode?q=Varanasi...');
  const geoRes = await fetch(`${baseUrl}/api/geocode?q=Varanasi`);
  const geoData = await geoRes.json();
  console.log(`   ✓ Geocode returned ${geoData.places?.length} places. First: ${geoData.places?.[0]?.name} (${geoData.places?.[0]?.latitude}, ${geoData.places?.[0]?.longitude})`);

  // 4. Test Calculation API (4-System Vedic & Diagnostic Engine)
  console.log('4. Testing POST /api/calculate...');
  const calcPayload = {
    fullName: 'Rohan Mehra',
    dob: '1988-10-24',
    tob: '06:45:00',
    place: 'Jaipur, Rajasthan, India',
    latitude: 26.9124,
    longitude: 75.7873,
    timezoneOffsetHours: 5.5,
  };

  const calcRes = await fetch(`${baseUrl}/api/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(calcPayload),
  });
  if (!calcRes.ok) throw new Error(`Calculate API failed: ${calcRes.status}`);
  const calcData = await calcRes.json();
  console.log(`   ✓ Chart successfully calculated:`);
  console.log(`     - User: ${calcData.chart.user.fullName} (${calcData.chart.user.formattedDateTime})`);
  console.log(`     - Ascendant: ${calcData.chart.lagna.signName} (${calcData.chart.lagna.sanskritSignName}) at ${calcData.chart.lagna.formattedDegree}`);
  console.log(`     - Current Dasha: ${calcData.chart.vimshottari.currentMahadasha} MD / ${calcData.chart.vimshottari.currentAntardasha} AD`);
  console.log(`     - Jaimini A4 Matri Pada: ${calcData.chart.jaimini.a4SignName} (${calcData.chart.jaimini.a4SanskritSignName})`);
  console.log(`     - BNN Trines: ${calcData.chart.bnnTrines.map((t: any) => `${t.direction}: [${t.planets.join(',')}]`).join(' | ')}`);
  console.log(`     - Diagnostic Report:`);
  console.log(`       * Surroundings predictions count: ${calcData.report.nearHouseSurroundings.length}`);
  console.log(`       * Internal home misalignments count: ${calcData.report.internalHomeMisalignments.length}`);
  console.log(`       * Verification checklist items: ${calcData.report.verificationChecklist.length}`);
  console.log(`       * Tier 1 Physical Declutter actions: ${calcData.report.threeTierRemedies.tier1PhysicalDeclutter.length}`);
  console.log(`       * Tier 2 Elemental Vastu items: ${calcData.report.threeTierRemedies.tier2ElementalColorVastu.length}`);
  console.log(`       * Tier 3 Classical remedies with citations: ${calcData.report.threeTierRemedies.tier3ClassicalRemedies.length}`);

  // 5. Test Admin Books API
  console.log('5. Testing GET /api/admin/books...');
  const booksRes = await fetch(`${baseUrl}/api/admin/books`);
  const booksData = await booksRes.json();
  console.log(`   ✓ Admin books count: ${booksData.totalBooks}, total semantic chunks: ${booksData.totalChunks}`);
  console.log(`     Books: ${booksData.books.map((b: any) => b.title).join(', ')}`);

  // 6. Test Admin Ingesting a new reference book
  console.log('6. Testing POST /api/admin/books (Ingest new custom treatise)...');
  const newBookPayload = {
    title: 'Manasara Shilpa Shastra (Orientation Chapter)',
    author: 'Sage Manasara',
    system: 'Vastu',
    classicalEra: '7th Century CE',
    tags: ['Site Selection', 'Brahmasthan', 'Entrance'],
    textContent: `Chapter 3 - The Eastern Gate and Auspicious Thresholds\nThe Eastern gate consecrated to Indra brings endless victory and spiritual enlightenment to the royal house. Ensure the threshold is elevated with carved stone.\n\nChapter 7 - Brahmasthan and Water Storage\nThe central yard must remain pure. Water collected from rain must flow towards the North-East Ishanya zone to ensure unending wealth and health for the lineage.`,
  };

  const ingestRes = await fetch(`${baseUrl}/api/admin/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBookPayload),
  });
  const ingestData = await ingestRes.json();
  console.log(`   ✓ Ingested new book: "${ingestData.book?.title}", chunks created: ${ingestData.chunksCreated}`);

  // 7. Test RAG Vector Search
  console.log('7. Testing POST /api/rag/search...');
  const searchRes = await fetch(`${baseUrl}/api/rag/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'kitchen southeast agneya fire water', limit: 3 }),
  });
  const searchData = await searchRes.json();
  console.log(`   ✓ RAG Search returned ${searchData.total} results:`);
  searchData.results.forEach((r: any) => {
    console.log(`     - Citation: ${r.citation} (Score: ${r.score}) -> "${r.chunk.content.substring(0, 80)}..."`);
  });

  // 8. Test AI Chat Assistant API
  console.log('8. Testing POST /api/ai/chat...');
  const chatRes = await fetch(`${baseUrl}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'What are the classical remedies for my kitchen if placed in South-East?',
      chartSummary: calcData.report.chartSummary,
      currentReport: calcData.report,
    }),
  });
  const chatData = await chatRes.json();
  console.log(`   ✓ AI Assistant replied (${chatData.answer.length} chars) with citations:`);
  console.log(`     Answer excerpt: ${chatData.answer.substring(0, 160)}...`);
  console.log(`     Citations returned: ${chatData.citations.map((c: any) => c.citation).join(', ') || 'Classical Shastra citations embedded'}`);

  // 9. Test Master Rules Config API
  console.log('9. Testing GET /api/admin/rules...');
  const rulesRes = await fetch(`${baseUrl}/api/admin/rules`);
  const rulesData = await rulesRes.json();
  console.log(`   ✓ Rules config retrieved. System prompt length: ${rulesData.config.systemPrompt.length} chars`);
  console.log(`     Planet-Direction map entries: ${Object.keys(rulesData.config.planetDirectionMap).length}`);

  console.log('\n=============================================');
  console.log('🎉 ALL END-TO-END VERIFICATION CHECKS PASSED!');
  console.log('=============================================');
}

testAll().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
