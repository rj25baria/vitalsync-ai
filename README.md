<div align="center">

<img src="public/favicon.svg" alt="VitalSync Logo" width="80" height="80" />

# VitalSync AI

### Your Health, Intelligently Managed

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-v3-319795?style=for-the-badge&logo=chakraui&logoColor=white)](https://chakra-ui.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**A next-generation healthcare MVP platform — AI symptom triage, smart appointment booking, medication tracking, and health analytics — all in one beautiful, HIPAA-ready interface.**

[Live Demo](#) · [Report Bug](https://github.com/rj25baria/vitalsync-ai/issues) · [Request Feature](https://github.com/rj25baria/vitalsync-ai/issues)

---

</div>

## What is VitalSync AI?

VitalSync AI is a **winning MVP healthcare web platform** designed to remain highly relevant through 2026–2027. It tackles the most pressing gap in modern healthcare: fragmented patient experiences. Patients juggle multiple apps for symptoms, appointments, medications, and health data — VitalSync unifies all of it.

Built with a production-ready stack optimized for **Vercel deployment**, it demonstrates how a lean team can ship a polished, feature-complete healthcare product fast.

---

## Screenshots

<table>
  <tr>
    <td align="center"><strong>Home — Hero & Live Metrics Preview</strong></td>
    <td align="center"><strong>Health Dashboard</strong></td>
  </tr>
  <tr>
    <td>Gradient hero with real-time health card preview, platform stats, feature cards, and testimonials</td>
    <td>Vitals panel, color-coded health alerts, goal progress bars, weekly activity bar chart</td>
  </tr>
  <tr>
    <td align="center"><strong>AI Symptom Checker</strong></td>
    <td align="center"><strong>Appointment Booking</strong></td>
  </tr>
  <tr>
    <td>3-step guided flow → urgency triage (Self-Care / See Doctor / Urgent / Emergency) with recommendations</td>
    <td>Provider directory with ratings, telehealth/in-person picker, time slot selection, and confirmation flow</td>
  </tr>
  <tr>
    <td align="center"><strong>Medication Tracker</strong></td>
    <td align="center"><strong>Drug Interactions</strong></td>
  </tr>
  <tr>
    <td>Daily schedule, Mark Taken tracking, adherence streak, refill alerts, and expandable medication details</td>
    <td>Severity-graded interaction checker with doctor consultation CTA</td>
  </tr>
</table>

---

## Core Features

### AI Symptom Checker
- 3-step guided flow: personal info → symptom selection → duration/severity
- Searchable symptom library (20+ common symptoms)
- Clinical triage engine returns one of four urgency levels:
  - **Self-Care** — rest and OTC medications
  - **See Doctor** — schedule within 1–2 days
  - **Urgent Care** — visit today
  - **Emergency** — call 911 immediately
- Possible conditions list + personalized recommendations
- Strict medical disclaimer and privacy-first design

### Health Dashboard
- Live vitals display: heart rate, blood pressure, blood oxygen, BMI
- Smart health alerts (warning / info / success)
- Daily goal tracking: steps, water intake, sleep, active minutes
- Weekly bar chart visualizations for steps and sleep
- Upcoming appointments summary panel
- Quick action buttons: log vitals, add medication, book appointment

### Appointment Booking
- Doctor directory with specialty, rating, review count, and availability
- Telehealth vs. in-person selection per provider
- Date picker + available time slot grid
- Booking confirmation with email reminder indicator
- Upcoming and past appointment management (cancel, join call, follow-up)

### Medication Tracker
- Today's schedule split into morning / evening periods
- One-tap "Mark Taken" with visual green confirmation
- Weekly adherence percentage + monthly stats + streak counter
- Refill alerts when pills drop below 30%
- Full medication list with expandable instructions, prescriber info, refill request
- Drug interaction checker with severity grading (low / moderate / high)

### Navigation & UX
- Sticky top navbar with active-state indicators
- Mobile-responsive hamburger menu
- Light / dark mode toggle (next-themes)
- Notification bell with unread indicator
- Smooth hover transitions throughout

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React 19 + TypeScript 5.9 | Latest stable, concurrent rendering, full type safety |
| **UI Library** | Chakra UI v3 | Accessible, themeable, production-grade components |
| **Styling** | Chakra style props + emotion | Zero-config CSS-in-JS, design token system |
| **Icons** | react-icons / Lucide | 1500+ consistent icons, tree-shakeable |
| **Build Tool** | Vite 8 | Sub-second HMR, ESM-native, Rolldown bundler |
| **Dark Mode** | next-themes | SSR-safe, zero-flicker color mode |
| **Deployment** | Vercel | Zero-config CI/CD, edge network, preview URLs |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/rj25baria/vitalsync-ai.git
cd vitalsync-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the repo directly in the [Vercel dashboard](https://vercel.com/new) — zero configuration required.

---

## Project Structure

```
vitalsync-ai/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.tsx                    # Root layout, nav, routing state
│   ├── main.tsx                   # Entry point with Chakra Provider
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page (hero, stats, features, CTA)
│   │   ├── DashboardPage.tsx      # Health metrics dashboard
│   │   ├── SymptomCheckerPage.tsx # 3-step AI symptom triage
│   │   ├── AppointmentsPage.tsx   # Provider directory + booking flow
│   │   └── MedicationsPage.tsx    # Medication tracker + interaction checker
│   └── components/
│       └── ui/                    # Chakra UI snippet components (CLI-generated)
├── index.html
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

---

## Roadmap — Phases Beyond MVP

The MVP is designed as the foundation for a full platform. Planned phases:

**Phase 2 — Persistence & Auth**
- [ ] Supabase backend (PostgreSQL + Row Level Security)
- [ ] Email/password authentication
- [ ] Saved health records, appointments, medications per user
- [ ] Real-time notifications via Supabase Realtime

**Phase 3 — Integrations**
- [ ] Wearable device sync (Apple Health, Google Fit, Fitbit API)
- [ ] EHR integration (FHIR R4 compliance)
- [ ] Pharmacy refill request API
- [ ] Video call integration for telehealth (Daily.co / Twilio)

**Phase 4 — AI & Intelligence**
- [ ] GPT-4 powered symptom analysis with RAG over clinical guidelines
- [ ] Predictive health risk scoring
- [ ] Personalized medication reminders via SMS/push
- [ ] AI-generated health summaries for provider visits

**Phase 5 — Monetization**
- [ ] Freemium model: free tier (1 user, basic tracking) + Pro ($9.99/mo)
- [ ] Provider portal with subscription billing (Stripe)
- [ ] Enterprise API for clinic/hospital integration
- [ ] White-label licensing for health systems

---

## Monetization Strategy

VitalSync is designed for a **freemium + B2B SaaS** revenue model:

| Tier | Price | Target |
|---|---|---|
| **Free** | $0/mo | Individual patients |
| **Pro** | $9.99/mo | Power users, chronic condition management |
| **Provider** | $49/mo per provider | Individual clinics, telehealth practices |
| **Enterprise** | Custom | Hospitals, health systems, insurers |

Additional revenue streams: pharmacy partnership referral fees, anonymous aggregate data insights (fully HIPAA-compliant, opt-in), and white-label licensing.

---

## Why This Will Stay Relevant in 2025–2027

1. **Post-pandemic normalization of digital health** — patients expect consumer-grade health apps
2. **Chronic disease burden** — 60%+ of US adults have at least one chronic condition requiring ongoing management
3. **Physician shortage** — AI triage tools reduce unnecessary ER visits and primary care burden
4. **Interoperability mandates** — CMS and ONC rules driving EHR data openness create integration opportunities
5. **Wearable adoption surge** — 1 in 3 US adults owns a health wearable, generating data that needs a home

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Built with care for better healthcare experiences.

**[⭐ Star this repo](https://github.com/rj25baria/vitalsync-ai)** if you find it useful!

</div>
