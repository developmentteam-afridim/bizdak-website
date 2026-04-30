# Bizdak Website — Deployment Guide

## Files

```
bizdak-website/
├── index.html        Main landing page
├── store.html        Store application page (with Google Sheets form)
└── marketing.html    About / marketing page
```

---

## 1. Google Sheets form — already wired up

The store application form on `store.html` is connected to Google Sheets.
Every submission automatically:
- Adds a new row to: https://docs.google.com/spreadsheets/d/1Gfm140vrZ3KJbLEtTGEQ9zddSNh41vdVd4EYSnR3zW4
- Sends a notification email to info@afridim.com

**No action needed** — the Apps Script URL is already set in `store.html`.

---

## 2. Deploy to Netlify (recommended — free)

### Option A — Drag and drop (fastest, no Git needed)

1. Go to https://netlify.com and sign up / log in
2. From the dashboard click **"Add new site" → "Deploy manually"**
3. Drag the entire `bizdak-website/` folder onto the upload area
4. Site goes live instantly at a URL like `https://random-name.netlify.app`
5. To use a custom domain (e.g. bizdak.app): Site settings → Domain management → Add custom domain

### Option B — Git deploy (recommended for ongoing updates)

1. Push the `bizdak-website/` folder to a GitHub repo
2. On Netlify: **"Add new site" → "Import an existing project"** → connect GitHub
3. Set publish directory to `bizdak-website` (or `/` if that is the root)
4. Deploy — future pushes to `main` branch auto-redeploy

---

## 3. Light mode support

The website automatically adapts to the user's OS theme:
- **Dark OS** → dark navy blue palette (default)
- **Light OS** → light grey-white palette

No action needed — this is handled by a CSS `@media (prefers-color-scheme: light)` block in `index.html`.

---

## 4. Language toggle

The EN/FR toggle is built in. The site also auto-detects the browser language on load — French browsers see French by default.

---

## 5. Testing the form locally

Because the form posts to an external Google Apps Script URL it works from any browser without a local server. Just open `store.html` directly in a browser, fill the form and submit — check the Google Sheet to confirm the row appears.

---

## 6. Dynamic city and category dropdowns

The store application form fetches cities and categories directly from the backend API so they stay in sync with whatever is in the admin panel.

**Yash — one line to update in `store.html`:**

```js
const API_URL = 'https://api.yourdomain.com/api';
```

Replace `https://api.yourdomain.com/api` with the real backend URL (the same one the admin panel uses).

Once set, cities added in the admin automatically appear in the website form. No redeployment needed for content changes.

If the API is unreachable (e.g. during maintenance), the form falls back to a hardcoded list of cities and categories so it never breaks for users.

| What to change | Where |
|---|---|
| Hero text, tagline | `index.html` — look for `data-en` / `data-fr` attributes |
| Add a city | `store.html` → `<select name="city">` + `index.html` → cities section |
| Add a category | `store.html` → `<select name="category">` |
| Change contact email | `bizdak-apps-script.js` → `NOTIFY_EMAIL` constant (redeploy script) |
| Colours / fonts | `index.html` → `:root` CSS variables at the top of `<style>` |

---

## 7. Google Apps Script — if you ever need to redeploy

The script file is `bizdak-apps-script.js`. If you need to update it:

1. Go to https://script.google.com
2. Open the Bizdak project
3. Paste updated code → Deploy → **New deployment** (not "Manage")
4. Copy the new URL → update `APPS_SCRIPT_URL` in `store.html`
5. Redeploy the website

> The current deployed URL is already in `store.html` — do not change it unless you redeploy the script.

---

## 8. Viewing submissions

Go to: https://docs.google.com/spreadsheets/d/1Gfm140vrZ3KJbLEtTGEQ9zddSNh41vdVd4EYSnR3zW4

Columns: Timestamp · Store Name · City · Category · Address · Phone · Email · Website · Description

To export as Excel: **File → Download → Microsoft Excel (.xlsx)**

---

## Questions?

Contact Ahmed or refer back to the Claude conversation for full context on any of the above.
