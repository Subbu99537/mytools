// ── MYTOOLS MAIN JS ──────────────────────────────────────────────

// ── ALL TOOLS REGISTRY ──
const TOOLS = [
  // PDF
  { name: 'Image to PDF', desc: 'Convert images to a PDF file', icon: '🖼️', cat: 'PDF Tools', url: 'tools/pdf/image-to-pdf.html' },
  { name: 'PDF to Image', desc: 'Extract images from a PDF', icon: '📄', cat: 'PDF Tools', url: 'tools/pdf/pdf-to-image.html' },
  { name: 'Merge PDF', desc: 'Combine multiple PDFs into one', icon: '🔗', cat: 'PDF Tools', url: 'tools/pdf/merge-pdf.html' },
  { name: 'Split PDF', desc: 'Split a PDF into separate pages', icon: '✂️', cat: 'PDF Tools', url: 'tools/pdf/split-pdf.html' },
  { name: 'Compress PDF', desc: 'Reduce PDF file size', icon: '📦', cat: 'PDF Tools', url: 'tools/pdf/compress-pdf.html' },
  // Image
  { name: 'Image Compressor', desc: 'Reduce image file size', icon: '🗜️', cat: 'Image Tools', url: 'tools/image/image-compressor.html' },
  { name: 'Image Resizer', desc: 'Resize images by dimensions', icon: '📐', cat: 'Image Tools', url: 'tools/image/image-resizer.html' },
  { name: 'Format Converter', desc: 'Convert between JPG, PNG, WEBP', icon: '🔄', cat: 'Image Tools', url: 'tools/image/format-converter.html' },
  { name: 'Image to Base64', desc: 'Convert image to Base64 string', icon: '🔡', cat: 'Image Tools', url: 'tools/image/image-to-base64.html' },
  { name: 'Background Remover', desc: 'Remove image background', icon: '🪄', cat: 'Image Tools', url: 'tools/image/background-remover.html' },
  // Developer
  { name: 'JSON Formatter', desc: 'Format and validate JSON', icon: '{ }', cat: 'Developer Tools', url: 'tools/developer/json-formatter.html' },
  { name: 'Base64 Encoder', desc: 'Encode and decode Base64', icon: '🔐', cat: 'Developer Tools', url: 'tools/developer/base64-encoder.html' },
  { name: 'UUID Generator', desc: 'Generate random UUIDs', icon: '🎲', cat: 'Developer Tools', url: 'tools/developer/uuid-generator.html' },
  { name: 'Timestamp Converter', desc: 'Convert Unix timestamps', icon: '⏱️', cat: 'Developer Tools', url: 'tools/developer/timestamp-converter.html' },
  { name: 'Password Generator', desc: 'Generate secure passwords', icon: '🔑', cat: 'Developer Tools', url: 'tools/developer/password-generator.html' },
  // Student
  { name: 'Word Counter', desc: 'Count words and characters', icon: '📝', cat: 'Student Tools', url: 'tools/student/word-counter.html' },
  { name: 'Text Summarizer', desc: 'Summarize long text quickly', icon: '📋', cat: 'Student Tools', url: 'tools/student/text-summarizer.html' },
  { name: 'Study Timer', desc: 'Pomodoro-style study timer', icon: '⏰', cat: 'Student Tools', url: 'tools/student/study-timer.html' },
  { name: 'Flashcard Generator', desc: 'Create study flashcards', icon: '🃏', cat: 'Student Tools', url: 'tools/student/flashcard-generator.html' },
  { name: 'GPA Calculator', desc: 'Calculate your GPA', icon: '🎓', cat: 'Student Tools', url: 'tools/student/gpa-calculator.html' },
];

// ── THEME ──
function initTheme() {
  const saved = localStorage.getItem('mt-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('mt-theme', next);
  updateThemeBtn(next);
}

function updateThemeBtn(theme) {
  const btn = document.getElementById('theme-btn');
  if (btn) btn.innerHTML = theme === 'dark'
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// ── SEARCH ──
function initSearch() {
  const inputs = document.querySelectorAll('.hero-search input, .search-bar input');
  inputs.forEach(input => {
    input.addEventListener('input', e => handleSearch(e.target.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.hero-search') && !e.target.closest('#search-results')) {
      closeSearch();
    }
  });
}

function handleSearch(query) {
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;

  if (!query.trim()) { closeSearch(); return; }

  const results = TOOLS.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.desc.toLowerCase().includes(query.toLowerCase()) ||
    t.cat.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    resultsEl.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-3);font-size:0.875rem;">No tools found</div>`;
  } else {
    resultsEl.innerHTML = results.slice(0, 8).map(t => `
      <a href="${(window.TOOLS_ROOT||\"./\")+t.url}" class="search-result-item">
        <div class="tool-icon" style="background:var(--bg-3)">${t.icon}</div>
        <div class="search-result-info">
          <div class="search-result-name">${highlight(t.name, query)}</div>
          <div class="search-result-cat">${t.cat}</div>
        </div>
      </a>
    `).join('');
  }

  resultsEl.classList.add('visible');
}

function highlight(text, query) {
  const re = new RegExp(`(${query})`, 'gi');
  return text.replace(re, '<mark style="background:rgba(108,99,255,0.3);color:var(--accent-3);border-radius:2px">$1</mark>');
}

function closeSearch() {
  const resultsEl = document.getElementById('search-results');
  if (resultsEl) resultsEl.classList.remove('visible');
}

// ── HAMBURGER ──
function initHamburger() {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.innerHTML = nav.classList.contains('open')
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  });
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── FILE SIZE FORMATTER ──
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ── PROGRESS HELPER ──
function showProgress(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('visible');
}

function setProgress(id, pct) {
  const el = document.getElementById(id);
  if (el) el.querySelector('.progress-bar').style.width = pct + '%';
}

function hideProgress(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('visible');
}

// ── COPY TO CLIPBOARD ──
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!')).catch(() => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Copied to clipboard!');
  });
}

// ── DOWNLOAD HELPER ──
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadDataURL(dataURL, filename) {
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  a.click();
}

// ── DRAG & DROP ──
function initDropZone(zoneId, onFiles) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('dragging');
  });

  zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragging');
    onFiles(Array.from(e.dataTransfer.files));
  });

  const input = zone.querySelector('input[type="file"]');
  if (input) {
    input.addEventListener('change', () => onFiles(Array.from(input.files)));
  }
}

// ── SIMPLE ANALYTICS ──
function trackEvent(category, action, label) {
  const events = JSON.parse(localStorage.getItem('mt-events') || '[]');
  events.push({ category, action, label, ts: Date.now() });
  if (events.length > 500) events.splice(0, events.length - 500);
  localStorage.setItem('mt-events', JSON.stringify(events));

  // Google Analytics (if available)
  if (typeof gtag !== 'undefined') {
    gtag('event', action, { event_category: category, event_label: label });
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initHamburger();

  // Active nav link
  const links = document.querySelectorAll('.nav-links a');
  const path = location.pathname;
  links.forEach(l => {
    if (path.includes(l.getAttribute('href'))) l.classList.add('active');
  });

  // Animate items on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tool-card, .category-card').forEach(el => observer.observe(el));
});
