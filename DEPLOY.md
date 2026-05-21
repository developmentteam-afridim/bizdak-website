# Bizdak Website — Deployment Guide

## Files
- `index.html` — Landing page (bizdak.app)
- `store.html` — Store onboarding (bizdak.app/store.html)
- `marketing.html` — Marketing page (bizdak.app/marketing.html)
- `admin/` — Decap CMS dashboard (bizdak.app/admin)
- `netlify.toml` — Netlify config

## Deploy to Netlify (30 minutes total)

### Step 1 — GitHub repo
1. Create a new GitHub repo called `bizdak-website`
2. Push all these files to the `main` branch

### Step 2 — Netlify
1. Go to app.netlify.com → "Add new site" → "Import from Git"
2. Connect GitHub → select `bizdak-website`
3. Build settings: leave blank (static site, no build command)
4. Click "Deploy site"
5. Site will be live at a random netlify.app URL

### Step 3 — Connect bizdak.app domain
1. In Netlify: Site settings → Domain management → Add custom domain → `bizdak.app`
2. In Namecheap: Change nameservers to Netlify's:
   - dns1.p06.nsone.net
   - dns2.p06.nsone.net
   - dns3.p06.nsone.net
   - dns4.p06.nsone.net
3. Wait up to 24 hours for DNS propagation
4. Netlify auto-provisions free SSL certificate

### Step 4 — Enable Netlify Forms (for store submissions)
1. In Netlify: Site settings → Forms → Enable form detection
2. After first form submission, go to Forms tab to see submissions
3. Go to Forms → Notifications → Add email notification → info@afridim.com
4. Every store application now emails info@afridim.com automatically

### Step 5 — Enable Decap CMS
1. In Netlify: Site settings → Identity → Enable Identity
2. Site settings → Identity → Registration → Invite only
3. Site settings → Identity → Services → Enable Git Gateway
4. Invite yourself: Identity tab → Invite users → your email
5. You'll receive an email — click to set your CMS password
6. Visit bizdak.app/admin to manage content

## Editing content via CMS
1. Go to bizdak.app/admin
2. Log in with your email/password
3. Click "Landing Page" or "Store Onboarding Page"
4. Edit any field — headlines, sublines, testimonials, steps
5. Click "Publish" — changes go live in ~30 seconds

## Adding Open Graph preview image
Create a 1200×630px image with the Bizdak logo and tagline.
Save as `images/og-preview.png` and push to GitHub.
This image shows when bizdak.app is shared on WhatsApp/iMessage.

## Pages
| URL | File |
|-----|------|
| bizdak.app | index.html |
| bizdak.app/store.html | store.html |
| bizdak.app/marketing.html | marketing.html |
| bizdak.app/admin | admin/index.html |

## Language
The website auto-detects the user's browser language (EN or FR).
Users can also manually toggle EN/FR in the nav bar.
All content is editable in both languages via the CMS.

## Store submissions
- Form powered by Netlify Forms (free up to 100/month)
- Each submission emails info@afridim.com automatically
- View all submissions in Netlify dashboard → Forms tab
- Fields captured: store name, city, category, address, phone, email, website, description
