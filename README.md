# MyTools — Free Online Utilities

> 20+ free browser-based tools for PDF, images, developers, and students. No backend required. No signups. Works 100% offline after load.

**Live Demo:** `https://YOUR-USERNAME.github.io/mytools`

---

## 🗂 Project Structure

```
mytools/
├── index.html                  ← Homepage
├── README.md
├── styles/
│   └── main.css                ← All styles (dark/light theme, responsive)
├── scripts/
│   ├── main.js                 ← Theme, search, toast, utilities
│   └── components.js           ← Shared navbar + footer injection
└── tools/
    ├── pdf/
    │   ├── index.html           ← PDF Tools category page
    │   ├── image-to-pdf.html
    │   ├── pdf-to-image.html
    │   ├── merge-pdf.html
    │   ├── split-pdf.html
    │   └── compress-pdf.html
    ├── image/
    │   ├── index.html           ← Image Tools category page
    │   ├── image-compressor.html
    │   ├── image-resizer.html
    │   ├── format-converter.html
    │   ├── image-to-base64.html
    │   └── background-remover.html
    ├── developer/
    │   ├── index.html           ← Developer Tools category page
    │   ├── json-formatter.html
    │   ├── base64-encoder.html
    │   ├── uuid-generator.html
    │   ├── timestamp-converter.html
    │   └── password-generator.html
    └── student/
        ├── index.html           ← Student Tools category page
        ├── word-counter.html
        ├── text-summarizer.html
        ├── study-timer.html
        ├── flashcard-generator.html
        └── gpa-calculator.html
```

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** icon → **New repository**
3. Name it `mytools` (or anything you like, e.g. `free-tools`)
4. Set it to **Public**
5. Leave "Add a README" **unchecked** (we already have one)
6. Click **Create repository**

---

### Step 2 — Upload Your Files

**Option A — GitHub Web UI (easiest, no Git required):**

1. On your new repo page, click **"uploading an existing file"**
2. Drag the entire `mytools/` folder contents into the upload area
   - Upload `index.html` and `README.md` at the root
   - Upload the `styles/`, `scripts/`, and `tools/` folders
3. Scroll down, add a commit message like `"Initial commit"`
4. Click **Commit changes**

> ⚠️ GitHub's web UI uploads files flat. To keep the folder structure, use Option B or the GitHub Desktop app.

**Option B — Git Command Line (recommended):**

```bash
# 1. Initialize git in your mytools folder
cd mytools
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit — MyTools website"

# 4. Connect to your GitHub repo (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/mytools.git

# 5. Push
git branch -M main
git push -u origin main
```

**Option C — GitHub Desktop App:**

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Click **File → Add Local Repository** → select your `mytools` folder
3. Click **Publish repository** → make it Public → Publish
4. Done!

---

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Set branch to **main** and folder to **/ (root)**
6. Click **Save**

⏱️ Wait 1–3 minutes, then your site is live at:
```
https://YOUR-USERNAME.github.io/mytools/
```

GitHub will show you the exact URL in the Pages settings after deployment.

---

### Step 4 — Update Your Live URL (Optional)

Once live, update the `<link rel="canonical">` tag in `index.html`:

```html
<!-- Change this line in index.html -->
<link rel="canonical" href="https://YOUR-USERNAME.github.io/mytools/">
```

---

## 🧪 Run Locally

No build step, no Node.js needed. Just open the files:

**Option A — Double-click** `index.html` in your file explorer  
(Works for most tools. Some browser security restrictions may affect file uploads on Chrome.)

**Option B — Use a local server (recommended):**

```bash
# Python 3
cd mytools
python -m http.server 8080
# Open: http://localhost:8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (if installed)
npx serve .
# or
npx http-server .
```

Then open **http://localhost:8080** in your browser.

---

## 🛠 How to Add New Tools

### 1. Create the tool HTML file

Copy any existing tool as a template, e.g.:

```bash
cp tools/developer/password-generator.html tools/developer/my-new-tool.html
```

Edit the content, update the `<title>`, breadcrumb, and tool logic.

### 2. Register the tool in `scripts/main.js`

Open `scripts/main.js` and add your tool to the `TOOLS` array:

```javascript
{ name: 'My New Tool', desc: 'What it does', icon: '🔧', cat: 'Developer Tools', url: 'tools/developer/my-new-tool.html' },
```

This automatically adds it to search results.

### 3. Add a card to the category index page

Open `tools/developer/index.html` and add a tool card:

```html
<a href="my-new-tool.html" class="tool-card">
  <div class="tool-icon">🔧</div>
  <div class="tool-name">My New Tool</div>
  <div class="tool-desc">What it does</div>
</a>
```

### 4. Optionally add it to the homepage

Open `index.html` and add a card in the "Popular Tools" section.

---

## 🎨 Customization

### Change Site Name
Search and replace `MyTools` across all files, or just update `scripts/components.js` (the navbar/footer template).

### Change Colors / Theme
Edit CSS variables at the top of `styles/main.css`:

```css
:root {
  --accent: #6c63ff;   /* Primary purple */
  --green:  #22d3a5;   /* Success green  */
  --bg:     #0a0a0f;   /* Dark background */
}
```

### Add Google Analytics
Paste your GA4 snippet before `</head>` in each HTML file, or add it to `scripts/components.js` once.

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Add Real Ads (Google AdSense)
Replace the `ad-slot` placeholder divs with your AdSense code:

```html
<!-- Replace this: -->
<div class="ad-slot ad-slot-banner"><!-- Ad Unit --></div>

<!-- With your AdSense unit: -->
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXX" data-ad-slot="XXXXXXXX" data-ad-format="auto"></ins>
```

---

## 📦 Third-Party Libraries Used

All loaded from CDN — no npm install needed:

| Library | Version | Used For |
|---------|---------|----------|
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | Image to PDF conversion |
| [PDF.js](https://mozilla.github.io/pdf.js/) | 3.11.174 | PDF to Image rendering |
| [pdf-lib](https://pdf-lib.js.org/) | 1.17.1 | Merge, Split, Compress PDF |
| [JSZip](https://stuk.github.io/jszip/) | 3.10.1 | ZIP downloads |
| [Google Fonts](https://fonts.google.com/) | — | Syne + DM Sans + DM Mono |

---

## ✅ Tool Checklist

| Tool | Category | Status |
|------|----------|--------|
| Image to PDF | PDF | ✅ |
| PDF to Image | PDF | ✅ |
| Merge PDF | PDF | ✅ |
| Split PDF | PDF | ✅ |
| Compress PDF | PDF | ✅ |
| Image Compressor | Image | ✅ |
| Image Resizer | Image | ✅ |
| Format Converter | Image | ✅ |
| Image to Base64 | Image | ✅ |
| Background Remover | Image | ✅ |
| JSON Formatter | Developer | ✅ |
| Base64 Encoder | Developer | ✅ |
| UUID Generator | Developer | ✅ |
| Timestamp Converter | Developer | ✅ |
| Password Generator | Developer | ✅ |
| Word Counter | Student | ✅ |
| Text Summarizer | Student | ✅ |
| Study Timer | Student | ✅ |
| Flashcard Generator | Student | ✅ |
| GPA Calculator | Student | ✅ |

---

## 🔒 Privacy

All tools run **entirely in the browser**. No files are ever uploaded to any server. No user data is collected or stored anywhere except the browser's `localStorage` for theme preference and basic analytics counts.

---

## 📄 License

MIT — free to use, modify, and redistribute.
