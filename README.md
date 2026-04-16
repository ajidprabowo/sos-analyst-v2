# SOS Analysis AI

AI-powered heavy equipment oil analysis (Scheduled Oil Sampling) with automated maintenance recommendations.

## Features

- Upload SOS data in CSV or Excel (.xlsx) format
- Automated analysis based on oil sample evaluation codes
- Maintenance recommendations for IDN and AUS standards
- Visual dashboard with charts (bar, pie, line)
- Filterable data table with search
- Export results to Excel

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Charts:** Recharts
- **File parsing:** PapaParse (CSV), SheetJS (Excel)
- **Animations:** Motion (Framer Motion)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/ai-sos-analysis.git
cd ai-sos-analysis
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

> **Note:** `GEMINI_API_KEY` is only required if you're using the AI recommendation feature. The core SOS processing works without it.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-sos-analysis)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   - `GEMINI_API_KEY` — your Google AI API key (optional)
   - `APP_URL` — your Vercel deployment URL (e.g. `https://your-app.vercel.app`)
4. Click Deploy

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard page
├── components/
│   └── ui/               # shadcn/ui components
├── hooks/
│   └── use-mobile.ts
├── lib/
│   ├── sos-data-*.ts     # SOS rule database (5 parts)
│   ├── sos-database.ts   # Combines all SOS rules
│   ├── sos-processor.ts  # Core analysis logic
│   └── utils.ts
└── public/
```

## License

MIT

## Gemini AI Integration

The app uses **Gemini 2.0 Flash Preview** for enhanced oil analysis. After running the rule-based SOS analysis, click **"Analyze with Gemini AI"** to get:

- AI-generated technical analysis per sample
- Smart failure mode classification
- Confidence score per diagnosis
- Severity: NORMAL / MONITOR / CAUTION / CRITICAL

### Setting up Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com) → Get API Key
2. Add `GEMINI_API_KEY=your_key_here` to `.env.local`
3. In Vercel: Settings → Environment Variables → add `GEMINI_API_KEY`
