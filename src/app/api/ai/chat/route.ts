import { NextRequest, NextResponse } from 'next/server';
import { RAGStore } from '@/engine/rag';

export async function POST(req: NextRequest) {
  try {
    const { message, chartSummary, currentReport, lang = 'hi' } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Retrieve relevant passages from RAG Knowledge Base
    const ragResults = RAGStore.search({
      query: message,
      limit: 3,
    });

    const citations = ragResults.map((r) => r.citation).join(', ');
    const retrievedPassages = ragResults
      .map((r) => `> ${r.citation}\n"${r.chunk.content}"`)
      .join('\n\n');

    const isHindi = lang === 'hi' || /[\u0900-\u097F]/.test(message);

    let aiResponse = '';
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const promptText = `
You are a warm, compassionate, and highly experienced Vedic Astrologer and Vastu Shastra Consultant speaking directly to an everyday family.
Language: ${isHindi ? 'HINDI (सरल, स्पष्ट और आम बोलचाल की हिन्दी भाषा में, जिसे कोई भी आसानी से समझ सके)' : 'ENGLISH (Simple, friendly, practical, and everyday language)'}.

User Question: "${message}"

User Kundali & Chart Summary:
- Lagna: ${chartSummary?.ascendantSign || 'Natal Chart'}
- Active Dasha: ${chartSummary?.currentDasha || 'Active Period'}
- A4 (Matri Pada / House Surroundings): ${chartSummary?.a4Sign || 'A4 House'}

Relevant Classical References retrieved from RAG Knowledge Base:
${retrievedPassages || 'Classical Vastu Shastra (Brihat Samhita, Vishwakarma Prakash, Bhrigu Nandi Nadi, Jaimini Sutras).'}

Instructions:
1. Explain in clear, simple terms without heavy confusing jargon.
2. Answer the user's specific room or direction question directly.
3. Give 2-3 simple, practical, actionable remedies they can do immediately at home without any demolition or breaking walls.
4. Keep the tone reassuring, respectful, and helpful. Mention book source in brackets like [विश्वकर्मा प्रकाश / Brihat Samhita].
`;

        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        }
      } catch (e) {
        console.warn('Gemini API call failed, falling back to local expert engine');
      }
    }

    // High-quality friendly Classical Fallback Engine (Hindi & English)
    if (!aiResponse) {
      const lowerMsg = message.toLowerCase();

      if (isHindi) {
        // Friendly Hindi responses
        if (lowerMsg.includes('kitchen') || lowerMsg.includes('रसोई') || lowerMsg.includes('खाना') || lowerMsg.includes('southeast') || lowerMsg.includes('आग्नेय')) {
          aiResponse = `### 🍳 आपकी रसोई (किचन) के लिए सरल व असरदार वास्तु सलाह

शास्त्रों (**विश्वकर्मा प्रकाश** व **भृगु नंदी नाड़ी**) के अनुसार, रसोईघर के लिए सबसे शुभ स्थान **दक्षिण-पूर्व (आग्नेय कोण)** होता है, क्योंकि यह अग्नि देव और शुक्र ग्रह का स्थान है।

**सरल शब्दों में समझें:**
- खाना बनाते समय आपका मुख **पूर्व दिशा (East)** की ओर होना सबसे शुभ है। इससे भोजन में सकारात्मक ऊर्जा रहती है और परिवार का स्वास्थ्य अच्छा रहता है।
- **सावधानी:** चूल्हा (अग्नि) और पानी का सिंक/मटका (जल) बिल्कुल पास-पास नहीं होने चाहिए। अग्नि और जल का टकराव घर में व्यर्थ खर्चे और तनाव बढ़ाता है।

**आप तुरंत क्या आसान उपाय कर सकते हैं:**
1. **सफाई उपाय:** चूल्हे के नीचे या सिंक के नीचे कोई गीला गंदा कपड़ा या फालतू डिब्बे न रखें।
2. **रंग का उपाय:** यदि रसोई का स्लैब काले पत्थर का है, तो गैस चूल्हे के नीचे एक हल्का हरा मार्बल (ग्रीन स्टोन) रख दें।
3. **शुभ उपाय:** शाम के समय रसोई में एक छोटा लाल या गुलाबी रंग का 0-वाट का बल्ब जलाकर रखें।

${citations ? `\n\n*प्राचीन ग्रंथ संदर्भ:* ${citations}` : ''}`;
        } else if (lowerMsg.includes('bedroom') || lowerMsg.includes('बेडरूम') || lowerMsg.includes('सोना') || lowerMsg.includes('नींद') || lowerMsg.includes('southwest') || lowerMsg.includes('नैऋत्य')) {
          aiResponse = `### 🛏️ बेडरूम और अच्छी नींद के लिए सरल वास्तु उपाय

**वृहत्संहिता (अध्याय 53)** के अनुसार, घर के मुखिया का बेडरूम **दक्षिण-पश्चिम (नैऋत्य कोण)** में होना सबसे उत्तम माना गया है। यह स्थिरता और सुकून की दिशा है।

**सोते समय सिर की सही दिशा:**
- सोते समय अपना सिर **दक्षिण (South)** या **पूर्व (East)** दिशा में रखें।
- कभी भी उत्तर (North) दिशा में सिर करके न सोएं, इससे सिर में भारीपन, बुरे सपने और बेचैनी होती है।

**आसान घरेलू उपाय:**
1. **कबाड़ हटाएं:** पलंग (बेड) के बॉक्स के अंदर पुराने लोहे के औजार, टूटे ताले, फटे जूते या खराब इलेक्ट्रॉनिक सामान कभी न रखें।
2. **रंग का उपाय:** बेडरूम की दीवारों पर हल्का बादामी, क्रीम या हल्का भूरा रंग रखें। गहरा नीला या काला रंग न लगाएं।
3. **स्थिरता उपाय:** कमरे के दक्षिण-पश्चिम कोने में पीतल का एक भारी हाथी या पीला शोपीस रखें। इससे मन शांत रहेगा और रिश्ते मजबूत होंगे।

${citations ? `\n\n*प्राचीन ग्रंथ संदर्भ:* ${citations}` : ''}`;
        } else if (lowerMsg.includes('puja') || lowerMsg.includes('मंदिर') || lowerMsg.includes('पूजा') || lowerMsg.includes('northeast') || lowerMsg.includes('ईशान')) {
          aiResponse = `### 🪔 घर के मंदिर (पूजा घर) के लिए पावन वास्तु नियम

**विश्वकर्मा प्रकाश** के अनुसार, घर का **उत्तर-पूर्व (ईशान कोण)** देवताओं और गुरु बृहस्पति का पवित्र स्थान है। यह घर का सबसे ऊर्जावान कोना है।

**मुख्य बातें जो ध्यान रखनी हैं:**
- मंदिर में भारी सामान, तिजोरी या झाड़ू-पोछा कभी न रखें।
- इस कोने में कभी भी शौचालय (टॉयलेट) नहीं होना चाहिए। इसे जितना हल्का और खुला रखेंगे, घर में उतनी ही बरकत और मानसिक शांति रहेगी।

**सरल उपाय:**
1. ईशान कोण को हमेशा साफ-सुथरा रखें।
2. एक पीतल या तांबे के लोटे में रोज सुबह ताजा पानी भरकर रखें।
3. सुबह-शाम शुद्ध गाय के घी या तिल के तेल का दीपक पूर्व या उत्तर की ओर मुख करके जलाएं।

${citations ? `\n\n*प्राचीन ग्रंथ संदर्भ:* ${citations}` : ''}`;
        } else if (lowerMsg.includes('dasha') || lowerMsg.includes('दशा') || lowerMsg.includes('ग्रह')) {
          aiResponse = `### 🔮 आपकी वर्तमान महादशा और घर का वास्तु संबंध

आपकी कुंडली में वर्तमान में **${chartSummary?.currentDasha || 'महादशा'}** चल रही है।

**यह आपके घर को कैसे प्रभावित करती है?**
- वैदिक एस्ट्रो-वास्तु का मूल सिद्धांत है कि जो ग्रह वर्तमान दशा में चल रहा होता है, घर में उस ग्रह से संबंधित दिशा जागृत हो जाती है।
- यदि उस दिशा में कबाड़, धूल या गलत रंग होगा, तो दशा का शुभ फल मिलने में रुकावट आती है।
- उस दिशा की अच्छी सफाई करने और हल्के शुभ रंग रखने से कुंडली के ग्रह अपने आप अनुकूल फल देने लगते हैं।

**सलाह:** घर के मुख्य द्वार की चौखट को साफ रखें और घर में रोज सुबह 10 मिनट खिड़कियां खोलकर ताजी हवा और धूप आने दें।

${citations ? `\n\n*प्राचीन ग्रंथ संदर्भ:* ${citations}` : ''}`;
        } else {
          aiResponse = `### 🌿 आपके प्रश्न का सरल एस्ट्रो-वास्तु समाधान

आपके द्वारा पूछे गए विषय पर शास्त्रीय नियमों (**वृहत्संहिता व विश्वकर्मा प्रकाश**) के अनुसार मुख्य मार्गदर्शन यह है:

1. **सफाई सबसे बड़ा उपाय:** घर के जिस भी कमरे या कोने में आप बेचैनी महसूस करते हैं, वहां से सबसे पहले पुरानी अनुपयोगी चीजें, टूटे सामान और बंद घड़ियां हटा दें।
2. **हवा और रोशनी:** कमरे में पर्याप्त रोशनी और ताजी हवा का प्रबंध रखें।
3. **नमक का पोंछा:** सप्ताह में एक या दो बार पानी में थोड़ा समुद्री या सेंधा नमक डालकर पोंछा लगाने से घर की नकारात्मक ऊर्जा समाप्त हो जाती है।
4. **दीपक:** शाम के समय घर के मुख्य द्वार पर या तुलसी जी के पास एक घी का दीपक जरूर जलाएं।

यदि आप किसी खास कमरे, खिड़की या दरवाजे के बारे में पूछना चाहते हैं, तो बेझिझक विस्तार से बताएं!

${citations ? `\n\n*संदर्भित ग्रंथ:* ${citations}` : ''}`;
        }
      } else {
        // Friendly English response
        aiResponse = `### 🌿 Practical & Friendly Astro-Vastu Guidance

Based on classical texts (**Brihat Samhita & Vishwakarma Prakash**), here is clear and actionable advice for your home:

**Key Takeaways:**
1. **Decluttering is 80% of Vastu:** The single most powerful remedy is removing broken electronics, rusted tools, and unused clutter from the directional zone of your question.
2. **Light & Air:** Ensure natural sunlight and fresh air flow freely across the North-East and East sectors every morning.
3. **Salt Cleansing:** Mop your floors with rock-salt water once a week to absorb stagnant static energies.
4. **Current Dasha Alignment:** Since you are running **${chartSummary?.currentDasha || 'your active Dasha'}**, keeping its ruled direction pristine allows natural prosperity and mental peace to flourish.

${citations ? `\n\n*Referenced Classics:* ${citations}` : ''}`;
      }
    }

    return NextResponse.json({
      success: true,
      answer: aiResponse,
      citations: ragResults.map((r) => ({
        bookTitle: r.chunk.bookTitle,
        chapter: r.chunk.chapter,
        citation: r.citation,
        system: r.chunk.system,
      })),
      retrievedCount: ragResults.length,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
