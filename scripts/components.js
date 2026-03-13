// ── SHARED COMPONENTS ──
// Inject navbar and footer into pages.
// All href values use ROOT_PATH which is resolved at runtime — works on
// GitHub Pages (/mytools/tools/pdf/file.html) and locally alike.

// Compute the relative path back to the site root from any page.
const ROOT_PATH = (() => {
  // Count path segments between the repo root and current file.
  // GitHub Pages: /mytools/tools/pdf/file.html  → segments = ['mytools','tools','pdf','file.html']
  // Locally:      /tools/pdf/file.html           → segments = ['tools','pdf','file.html']
  const segs = window.location.pathname.replace(/^\//, '').split('/');
  // Number of directory levels (exclude the filename itself)
  const dirs = segs.length - 1;
  if (dirs <= 1) return './';
  return '../'.repeat(dirs - 1);
})();

const R = ROOT_PATH; // shorthand

const NAV_HTML = `
<nav class="navbar">
  <a href="${R}index.html" class="nav-logo">
    <div class="logo-mark">M</div>
    MyTools
  </a>
  <ul class="nav-links">
    <li><a href="${R}tools/pdf/">PDF Tools</a></li>
    <li><a href="${R}tools/image/">Image Tools</a></li>
    <li><a href="${R}tools/developer/">Developer Tools</a></li>
    <li><a href="${R}tools/student/">Student Tools</a></li>
  </ul>
  <div class="nav-right">
    <div class="search-bar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Search tools..." id="nav-search">
    </div>
    <button class="btn-icon" id="theme-btn" onclick="toggleTheme()" title="Toggle theme"></button>
    <button class="btn-icon hamburger" id="hamburger-btn" title="Menu">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</nav>
<nav class="mobile-nav" id="mobile-nav">
  <a href="${R}tools/pdf/">📄 PDF Tools</a>
  <a href="${R}tools/image/">🖼️ Image Tools</a>
  <a href="${R}tools/developer/">💻 Developer Tools</a>
  <a href="${R}tools/student/">🎓 Student Tools</a>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="${R}index.html" class="nav-logo" style="text-decoration:none;display:flex;align-items:center;gap:8px;">
        <div class="logo-mark">M</div>
        <span style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;">MyTools</span>
      </a>
      <p>Free online tools for PDF, images, developers, and students. No signup required.</p>
    </div>
    <div class="footer-col">
      <h4>PDF Tools</h4>
      <ul>
        <li><a href="${R}tools/pdf/image-to-pdf.html">Image to PDF</a></li>
        <li><a href="${R}tools/pdf/merge-pdf.html">Merge PDF</a></li>
        <li><a href="${R}tools/pdf/split-pdf.html">Split PDF</a></li>
        <li><a href="${R}tools/pdf/compress-pdf.html">Compress PDF</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Image Tools</h4>
      <ul>
        <li><a href="${R}tools/image/image-compressor.html">Image Compressor</a></li>
        <li><a href="${R}tools/image/image-resizer.html">Image Resizer</a></li>
        <li><a href="${R}tools/image/format-converter.html">Format Converter</a></li>
        <li><a href="${R}tools/image/background-remover.html">Background Remover</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>More Tools</h4>
      <ul>
        <li><a href="${R}tools/developer/json-formatter.html">JSON Formatter</a></li>
        <li><a href="${R}tools/developer/password-generator.html">Password Generator</a></li>
        <li><a href="${R}tools/student/word-counter.html">Word Counter</a></li>
        <li><a href="${R}tools/student/study-timer.html">Study Timer</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 MyTools. All tools are free to use.</span>
    <span>Made with ❤️</span>
  </div>
</footer>
`;

// Also patch the TOOLS registry root paths in main.js
// (tools/search results use relative URLs — fix them too at runtime)
window.TOOLS_ROOT = R;

// Inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const navTarget = document.getElementById('navbar-placeholder');
  const footTarget = document.getElementById('footer-placeholder');
  if (navTarget) navTarget.outerHTML = NAV_HTML;
  if (footTarget) footTarget.outerHTML = FOOTER_HTML;
});
