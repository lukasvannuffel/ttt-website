# Tree Top Tom

Website for **Tree Top Tom** — professional tree care services (*boomverzorging*) in Vlaams-Brabant, Belgium.

Live at [treetoptom.be](https://treetoptom.be)

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS 4
- **Email** — [Resend](https://resend.com)
- **CAPTCHA** — Cloudflare Turnstile
- **Analytics** — Google Analytics (gtag)
- **Hosting** — Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_TO_EMAIL=
TURNSTILE_SECRET_KEY=
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Root layout, metadata, JSON-LD, fonts
  page.tsx            # Home page (single-page site)
  sitemap.ts          # Dynamic sitemap generation
  robots.ts           # Robots.txt configuration
  api/contact/        # Contact form API route (Resend + Turnstile)
components/           # UI components (Hero, Diensten, OverOns, Contact, ...)
constants/config.ts   # Site-wide constants (URLs, nav links, thresholds)
data/diensten.json    # Services data
hooks/                # Custom hooks (useScrollReveal, useIsMobile)
types/                # TypeScript interfaces
```

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Production build       |
| `npm run start` | Start production server|
| `npm run lint`  | Run ESLint             |
