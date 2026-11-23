# 🌟 AstroVastu AI — Production Full-Stack Vedic Astro-Vastu Diagnostic Platform

**AstroVastu AI** is an intelligent, full-stack Astro-Vastu diagnostic and advisory web application. It takes a user's **Natal Birth Details (Name, Date of Birth, Time of Birth, Place of Birth)**, calculates an accurate Sidereal Vedic birth chart under the **Lahiri (Chitrapaksha) Ayanamsha**, and generates predictive, personalized Astro-Vastu insights across **four classical astrological systems**:

1. **Parashari:** D1 Lagna Chart + 120-Year Vimshottari Mahadasha & Antardasha timeline highlighting active operating periods.
2. **Navatara Paddhati:** 27 Nakshatra 9-Tara Chakra (Janma to Ati-Mitra), automatically identifying acute Vastu defect triggers in the **3rd (Vipat)**, **5th (Pratyak)**, and **7th (Naidhana / Vadha)** Taras.
3. **Bhrigu Nandi Nadi (BNN):** Directional signs (**Fire = East, Earth = South, Air = West, Water = North**), 1-5-9 Trinal conjunctions, and Venus/Mars/Saturn/Rahu real-estate signatures.
4. **Jaimini Paddhati:** 7 Chara Karakas (**AK, AmK, BK, MK, PK, GK, DK**), Rashi Drishti sign aspects, and **A4 (Matri Pada / Arudha of the 4th House)** with classical exception rules to predict external home surroundings and landmarks.

---

## 🚀 Key Features

- **🌐 Dual-Language Support (हिन्दी & English):**
  - Seamless toggle button at the top header.
  - Complete report, symptoms, and remedies available in clear, friendly, everyday Hindi (देवनागरी) and English.
- **🧭 Natal Birth Details Intake:**
  - Name, Date of Birth, Time of Birth with seconds precision.
  - Place of Birth autocomplete search with automated geocoding (Latitude, Longitude, and Timezone offset).
  - Quick-preset sample buttons for instant one-click testing.
- **📊 Interactive Astrological Summary Panel:**
  - **Switchable D1 Lagna Chart SVG:** North Indian Diamond Kundali & South Indian Fixed Box chart with Lagna and A4 highlighted.
  - **Planetary Position & 4-System Classifications Table:** Planet name, Sanskrit name, Sign, DMS degree, Nakshatra, Pada, Navatara status, Jaimini Karaka, BNN Direction, and Vastu Zone.
  - **Vimshottari Dasha Timeline:** 120-year sequence bar and active Antardashas under the current running Mahadasha.
  - **16-Zone Astro-Vastu Chakra:** Interactive directional compass grid showing planetary occupancies, elemental zones, ideal rooms, taboo items, and classical remedies.
- **📑 4-System Astro-Vastu Diagnostic Report:**
  - **🌟 Quick Friendly Summary (सरल शब्दों में 3 मुख्य बातें):** High-level actionable takeaways at a glance.
  - **1. Near-House Surroundings Prediction:** External landmarks, roads, canals/water bodies, and institutions predicted from A4, 4th house, and BNN trines.
  - **2. Internal Home Misalignments:** Exact rooms and directions flagged for clutter, damaged appliances, water seepage, or tangled wires.
  - **3. Interactive Physical Symptoms Verification:** Dynamic checklist with "हाँ / मिला" toggle buttons and a live **Alignment Match Score (%)**.
  - **4. Three-Tier Personalized Remedies:**
    - *Tier 1: Physical Decluttering* (specific material objects to discard).
    - *Tier 2: Elemental & Color Calibration* (prescribed vs. taboo wall colors, corrective objects).
    - *Tier 3: Classical Shastra Remedies* with exact book citations (mantras, lamps, threshold sanctification).
- **💬 Interactive Astro-Vastu AI Chat Assistant:**
  - Conversational advisor grounded in the RAG Knowledge Base that answers questions regarding bedroom layout, kitchen alignment, or current Dasha effects with source citations.
- **📚 Admin Reference Book Knowledge Base (`/admin`):**
  - Pre-seeded with 8 verified classical texts: *Brihat Samhita*, *Vishwakarma Prakash*, *Mayamatam*, *BPHS*, *Bhrigu Nandi Nadi*, *Jaimini Sutras*, *Lal Kitab*, and *Phaladeepika*.
  - Drag-and-drop book uploader with automatic semantic chunking and metadata tagging (`system`, `planet`, `direction`, `book_title`).
  - Master Rule & System Prompt Configurator.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons.
- **Backend & API:** Next.js Serverless Route Handlers (`/api/calculate`, `/api/geocode`, `/api/ai/chat`, `/api/admin/books`, `/api/admin/rules`, `/api/rag/search`).
- **Astrology Engine:** Algorithmic planetary astronomy (`astronomy-engine`) + precise Lahiri Sidereal Ayanamsha (Chitrapaksha) computation.
- **Geocoding & Timezone:** OpenStreetMap Nominatim API + instant fallback local coordinate registry.
- **AI & RAG Pipeline:** Semantic TF-IDF & metadata similarity vector store + Google Gemini / OpenAI integration with offline classical heuristic reasoning engine.

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/krunaljani-tops/astro_vastu_antigravity.git
cd astro_vastu_antigravity
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your optional API keys for Gemini or OpenAI if desired:
```env
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```
*(Note: If no API key is provided, the application automatically uses its built-in Classical Shastra Inference Engine with complete source citations!)*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 5. Build for production
```bash
npm run build
npm start
```

---

## 📜 Classical Reference Books Pre-Seeded in RAG
1. **Brihat Samhita** (Acharya Varahamihira — Vastu Vidya & Ground Water)
2. **Vishwakarma Prakash** (Divine Architect Vishwakarma — 16 Zones & Dwar Nirnaya)
3. **Mayamatam** (Sage Maya — South Indian Agamic Dwellings)
4. **Brihat Parashara Hora Shastra** (Maharishi Parashara — 4th Bhava & Vimshottari)
5. **Bhrigu Nandi Nadi** (R.G. Rao / Sage Bhrigu — 1-5-9 Trines & Property Yogas)
6. **Jaimini Upadesha Sutras** (Maharishi Jaimini — A4 Matri Pada & Karakas)
7. **Lal Kitab** (Pt. Roop Chand Joshi — Directional Clutter & Makaan Kundali)
8. **Phaladeepika** (Mantreswara — Dasha Results & Remedies)

---

## 📄 License
MIT License. © 2026 AstroVastu AI.
