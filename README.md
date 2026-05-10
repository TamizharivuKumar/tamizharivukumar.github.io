# Technical Writer Portfolio — GitHub Pages

A clean, editorial portfolio website built with pure HTML, CSS, and JavaScript.
Designed for Technical Writers showcasing API docs, user guides, UX writing, and documentation strategy work.

---

## File Structure

```
portfolio/
├── index.html              ← Home page
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← Interactions, animations, filter, form
├── pages/
│   ├── about.html          ← About page
│   ├── projects.html       ← Projects / Portfolio page
│   └── contact.html        ← Contact page
├── assets/
│   └── images/             ← Add your photos here
│       ├── profile.jpg     ← Hero photo (recommended: 760×920px)
│       └── about.jpg       ← About page photo (recommended: 800×1000px)
└── README.md
```

---

## Step-by-Step: Personalise the Portfolio

### Step 1 — Replace placeholder content

Open each HTML file and replace:

| Placeholder | Replace With |
|---|---|
| `Jane Doe` | Your name |
| `jane@example.com` | Your email address |
| `Bengaluru, India` | Your location |
| `5+`, `30+`, `12` (stat chips) | Your real numbers |
| Timeline items | Your real work experience |
| Project cards | Your real projects |
| Testimonial quote | A real quote from a client/manager |
| LinkedIn / GitHub / Twitter URLs | Your actual profile URLs |

### Step 2 — Add your photo

1. Place your profile photo in `assets/images/profile.jpg`
2. In `index.html`, find the comment `<!-- Replace with: <img ...> -->` and swap in:
   ```html
   <img class="hero-photo" src="assets/images/profile.jpg" alt="Your Name">
   ```
3. Do the same in `pages/about.html` using `../assets/images/about.jpg`

### Step 3 — Add your real projects

Each `.project-card` in `pages/projects.html` has:
- A `data-category` attribute (`api`, `guide`, `ux`, `strategy`) — keep this accurate for the filter to work
- Placeholder `href="#"` links — replace with your live doc URLs or GitHub repos

### Step 4 — Wire up the contact form

The contact form currently simulates a send. To make it functional, use one of:

**Option A — Formspree (free, no backend needed):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, copy your endpoint URL
3. In `pages/contact.html`, change the `<form>` tag to:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove the `e.preventDefault()` in `js/main.js` (or keep it and use fetch-based submission)

**Option B — EmailJS (sends email directly from JS):**
1. Sign up at [emailjs.com](https://emailjs.com)
2. Follow their SDK docs, add your `emailjs.send()` call inside the form submit handler in `main.js`

### Step 5 — Update the resume link

In `pages/about.html`, the "Download Resume" button points to `../assets/jane-doe-resume.pdf`.
Add your resume PDF to `assets/` and update the filename in the `href`.

---

## Deploying to GitHub Pages

### Method A — Repository named `yourusername.github.io` (recommended)

This gives you the URL `https://yourusername.github.io`.

```bash
# 1. Create a new GitHub repo named exactly: yourusername.github.io
# 2. Clone it
git clone https://github.com/yourusername/yourusername.github.io.git

# 3. Copy all portfolio files into the cloned folder
cp -r portfolio/* yourusername.github.io/

# 4. Push
cd yourusername.github.io
git add .
git commit -m "Initial portfolio launch"
git push origin main
```

Your site will be live at `https://yourusername.github.io` within ~2 minutes.

---

### Method B — Any repository with GitHub Pages enabled

If you want a URL like `https://yourusername.github.io/portfolio`:

```bash
# 1. Create a new repo on GitHub called "portfolio"
# 2. Clone and add files
git clone https://github.com/yourusername/portfolio.git
cp -r portfolio/* portfolio-repo/
cd portfolio-repo
git add .
git commit -m "Initial portfolio launch"
git push origin main

# 3. On GitHub: Settings → Pages → Source → "Deploy from branch" → main / root
```

> **Important:** When using a subdirectory URL, update all relative asset paths.
> The easiest fix: add `<base href="/portfolio/">` inside `<head>` of every HTML file.

---

### Method C — Using GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in GitHub → Settings → Pages → Source → select **"GitHub Actions"**.

---

## Custom Domain (Optional)

1. Buy a domain (e.g., `janedoe.dev`) from Namecheap, Google Domains, etc.
2. In GitHub → Settings → Pages → Custom Domain → enter your domain
3. Add a `CNAME` file to the root of your repo:
   ```
   janedoe.dev
   ```
4. In your DNS provider, add:
   - `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a `CNAME` record: `www → yourusername.github.io`

---

## Customisation Tips

### Changing the accent colour
In `css/style.css`, find `:root` and update `--accent` and `--accent-lt`:
```css
--accent:    #c45c2e;  /* Change to your brand colour */
--accent-lt: #f0d6c8;  /* Lighter version for backgrounds */
```

### Changing fonts
The portfolio uses **Playfair Display** (headings) + **DM Sans** (body).
To change, update the Google Fonts import at the top of `style.css` and the `--font-display` / `--font-body` variables.

### Adding more project cards
Copy any `.project-card` block in `pages/projects.html` and:
1. Set `data-category` to one of: `api`, `guide`, `ux`, `strategy`
2. Update the content — title, description, tags, links
3. Add a new filter button if you're adding a new category (and handle it in `main.js`)

---

## SEO Checklist

- [ ] Update `<title>` tags on every page to your real name and role
- [ ] Update `<meta name="description">` tags with genuine descriptions
- [ ] Add `<meta property="og:image">` with a social share preview image
- [ ] Add Google Analytics or Plausible snippet before `</head>` (optional)
- [ ] Create a `sitemap.xml` in the root (optional but helpful)
- [ ] Create a `robots.txt` in the root:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://yourusername.github.io/sitemap.xml
  ```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styles | CSS3 with custom properties (variables) |
| Fonts | Google Fonts (Playfair Display, DM Sans, DM Mono) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Animations | CSS transitions + Intersection Observer API |
| Hosting | GitHub Pages (free) |
| Form handling | Formspree or EmailJS (external, free tier available) |

No build tools, no frameworks, no node_modules. Pure web platform — works anywhere.

---

## License

This template is free for personal use. Please replace all placeholder content (name, email, projects, photos) before publishing.
