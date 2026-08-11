# Waterpark Simulator Guide

An independent, source-checked guide site for Waterpark Simulator. The current MVP covers multiplayer, staff, and console platforms in US English.

This project is fan-made and is not affiliated with or endorsed by CayPlay.

## Routes

- `/`
- `/guides`
- `/multiplayer-guide`
- `/staff-guide`
- `/console-platforms-guide`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX with GFM table support

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run typecheck
npm run check:links
npm run build
```

## Environment

Copy `.env.example` to `.env.local` when local overrides are needed.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_INDEXING_ENABLED=false
```

Indexing stays disabled until a future public website launch is explicitly approved. Publishing this source repository does not deploy the website.

## Content policy

Each guide records its source identity, retrieval date, version or platform scope, evidence boundary, unresolved questions, and update triggers. Unverified values, codes, and platform claims are deliberately excluded.
