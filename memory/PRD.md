# Pome — Product Requirements

## Original Problem Statement
Pome is a Florida-based (DataArtistry, LLC) wellness brand. This web presence is a **marketing/landing site** for the Pome iOS app, plus required legal pages (Privacy Policy, Terms & Conditions).

## Current Scope (as of 04/19/2026)
The web app is now strictly a **marketing site**:
- `/` — Landing page ("Build Your Emotional Intelligence") — hero, features, testimonial, feedback (Google Form), social links.
- `/privacy` — Privacy Policy
- `/terms` — Terms & Conditions
- `/care` — Care / Contact page ("We're here for you.")
- Catch-all routes redirect to `/`.

**Removed from the site (previously existed, now deleted):**
- Emotion tracking section
- Resourceful activities section
- Journal (Gratitude + PoMe Moments)
- Analytics / Insights section
- Signup / name-capture flow
- All "Start Your Journey" / "Start Tracking" CTA buttons

## Tech Stack
- React 18 + react-router-dom v7 (SPA routing)
- Tailwind CSS + custom CSS (`App.css`)
- No backend persistence; `/app/backend/server.py` remains as a dummy health-check endpoint only.

## File Structure
```
/app/
├── backend/server.py             (dummy — deployment health check only)
└── frontend/src/
    ├── App.js                    (router setup)
    ├── App.css                   (global + legal page + footer styles)
    ├── components/Footer.jsx     (Privacy/Terms links + copyright)
    └── pages/
        ├── Landing.jsx
        ├── Privacy.jsx
        └── Terms.jsx
```

## Footer Requirements (Implemented)
- Privacy Policy link → `/privacy`
- Terms & Conditions link → `/terms`
- Copyright: "Pome is operated by DataArtistry, LLC, a Florida limited liability company. © 2026 DataArtistry, LLC. All rights reserved."

## 3rd Party Integrations
- Google Tag Manager (embedded in `public/index.html`)
- Google Forms iframe (feedback form on landing page)

## Changelog
### 04/19/2026 — Marketing-site redesign
- Added react-router routes for `/`, `/privacy`, `/terms`.
- Created `Landing.jsx`, `Privacy.jsx`, `Terms.jsx`, `Footer.jsx`.
- Removed all app functionality (emotions, activities, journal, analytics, signup flow).
- Removed both "Start Your Journey" / "Start Tracking" CTA buttons from landing.
- Added site footer with Privacy/Terms links + DataArtistry copyright.

## Backlog / Future
- P2: Revisit the "Ready to Start Your Journey?" section copy on landing (currently has no action button — may look orphaned).
- P2: Consider adding the same footer links into the legal pages' TOC or a back-to-top anchor.
- P3: iOS App Store download link when app ships.

## Test Credentials
N/A — no auth on the site.
