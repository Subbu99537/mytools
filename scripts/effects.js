// ── MYTOOLS EFFECTS ──────────────────────────────────────────────
// Particle background, 3D tilt cards, Voice Commands

// ══════════════════════════════════════════════
// 1. PARTICLE BACKGROUND
// ══════════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = canvas.parentElement.offsetHeight || 500;
  let mouse = { x: W / 2, y: H / 2 };

  // Detect theme colors
  function getAccent() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#6c63ff';
  }

  // Particles
  const PARTICLE_COUNT = Math.min(80, Math.floor(W / 18));
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2.5 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const accent = getAccent();

    particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x += (dx / dist) * 0.8;
        p.y += (dy / dist) * 0.8;
      }

      // Wrap edges
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dist / 130) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();

  // Mouse tracking
  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  // Resize
  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || 500;
  });
}


// ══════════════════════════════════════════════
// 2. 3D TILT CARD EFFECT
// ══════════════════════════════════════════════
function initTiltCards() {
  const cards = document.querySelectorAll('.tool-card, .category-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';

      // Shine effect
      const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 70%)`;
      card.style.backgroundImage = shine;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      card.style.transition = 'transform 0.4s ease';
      card.style.backgroundImage = '';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}


// ══════════════════════════════════════════════
// 3. VOICE COMMAND
// ══════════════════════════════════════════════
const VOICE_COMMANDS = [
  // Navigation
  { phrases: ['go home', 'home page', 'homepage'],          action: () => navigate('index.html') },
  { phrases: ['pdf tools', 'open pdf', 'pdf section'],      action: () => navigate('tools/pdf/') },
  { phrases: ['image tools', 'open image', 'image section'],action: () => navigate('tools/image/') },
  { phrases: ['developer tools', 'dev tools', 'developer'], action: () => navigate('tools/developer/') },
  { phrases: ['student tools', 'student section'],          action: () => navigate('tools/student/') },

  // PDF Tools
  { phrases: ['image to pdf', 'convert image to pdf'],      action: () => navigate('tools/pdf/image-to-pdf.html') },
  { phrases: ['merge pdf', 'combine pdf'],                  action: () => navigate('tools/pdf/merge-pdf.html') },
  { phrases: ['split pdf'],                                 action: () => navigate('tools/pdf/split-pdf.html') },
  { phrases: ['compress pdf', 'reduce pdf'],                action: () => navigate('tools/pdf/compress-pdf.html') },
  { phrases: ['pdf to image', 'pdf to png'],                action: () => navigate('tools/pdf/pdf-to-image.html') },

  // Image Tools
  { phrases: ['compress image', 'image compressor'],        action: () => navigate('tools/image/image-compressor.html') },
  { phrases: ['resize image', 'image resizer'],             action: () => navigate('tools/image/image-resizer.html') },
  { phrases: ['convert image', 'format converter'],         action: () => navigate('tools/image/format-converter.html') },
  { phrases: ['image to base64', 'base64 image'],           action: () => navigate('tools/image/image-to-base64.html') },
  { phrases: ['remove background', 'background remover'],   action: () => navigate('tools/image/background-remover.html') },

  // Developer Tools
  { phrases: ['json formatter', 'format json'],             action: () => navigate('tools/developer/json-formatter.html') },
  { phrases: ['base64 encoder', 'encode base64'],           action: () => navigate('tools/developer/base64-encoder.html') },
  { phrases: ['uuid generator', 'generate uuid'],           action: () => navigate('tools/developer/uuid-generator.html') },
  { phrases: ['timestamp converter', 'convert timestamp'],  action: () => navigate('tools/developer/timestamp-converter.html') },
  { phrases: ['password generator', 'generate password'],   action: () => navigate('tools/developer/password-generator.html') },

  // Student Tools
  { phrases: ['word counter', 'count words'],               action: () => navigate('tools/student/word-counter.html') },
  { phrases: ['text summarizer', 'summarize text'],         action: () => navigate('tools/student/text-summarizer.html') },
  { phrases: ['study timer', 'pomodoro', 'start timer'],    action: () => navigate('tools/student/study-timer.html') },
  { phrases: ['flashcard', 'flash cards'],                  action: () => navigate('tools/student/flashcard-generator.html') },
  { phrases: ['gpa calculator', 'calculate gpa'],           action: () => navigate('tools/student/gpa-calculator.html') },

  // UI Commands
  { phrases: ['dark mode', 'dark theme'],                   action: () => { if (document.documentElement.getAttribute('data-theme') !== 'dark') toggleTheme(); voiceFeedback('Dark mode on!'); } },
  { phrases: ['light mode', 'light theme'],                 action: () => { if (document.documentElement.getAttribute('data-theme') !== 'light') toggleTheme(); voiceFeedback('Light mode on!'); } },
  { phrases: ['scroll down'],                               action: () => window.scrollBy({ top: 400, behavior: 'smooth' }) },
  { phrases: ['scroll up', 'go up'],                        action: () => window.scrollBy({ top: -400, behavior: 'smooth' }) },
  { phrases: ['go back', 'back'],                           action: () => history.back() },
  { phrases: ['search', 'open search'],                     action: () => { const s = document.getElementById('hero-search') || document.getElementById('nav-search'); if (s) s.focus(); } },
  { phrases: ['stop listening', 'stop voice', 'cancel'],    action: () => stopVoice() },
];

function navigate(path) {
  const root = window.TOOLS_ROOT || './';
  window.location.href = root + path;
}

let recognition = null;
let voiceActive = false;

function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported');
    const btn = document.getElementById('voice-btn');
    if (btn) { btn.style.display = 'none'; }
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    voiceActive = true;
    updateVoiceUI(true);
    voiceFeedback('Listening… say a command');
  };

  recognition.onend = () => {
    voiceActive = false;
    updateVoiceUI(false);
  };

  recognition.onerror = e => {
    voiceActive = false;
    updateVoiceUI(false);
    if (e.error !== 'aborted') voiceFeedback('Mic error: ' + e.error, true);
  };

  recognition.onresult = e => {
    let interim = '';
    let final = '';

    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript.toLowerCase().trim();
      if (e.results[i].isFinal) final += transcript;
      else interim += transcript;
    }

    // Show what's being heard
    const display = document.getElementById('voice-transcript');
    if (display) display.textContent = '"' + (final || interim) + '"';

    // Match commands on final result
    if (final) {
      let matched = false;
      for (const cmd of VOICE_COMMANDS) {
        for (const phrase of cmd.phrases) {
          if (final.includes(phrase)) {
            voiceFeedback('✓ ' + phrase);
            setTimeout(() => cmd.action(), 300);
            matched = true;
            break;
          }
        }
        if (matched) break;
      }
      if (!matched) voiceFeedback('Not recognized: "' + final + '"', true);

      // Clear transcript after 2s
      setTimeout(() => {
        if (document.getElementById('voice-transcript'))
          document.getElementById('voice-transcript').textContent = '';
      }, 2000);
    }
  };
}

function toggleVoice() {
  if (!recognition) {
    initVoice();
    if (!recognition) {
      showToast('Voice not supported in this browser. Try Chrome.', 'error');
      return;
    }
  }

  if (voiceActive) {
    stopVoice();
  } else {
    startVoice();
  }
}

function startVoice() {
  try {
    recognition.start();
  } catch (e) {
    recognition.stop();
    setTimeout(() => recognition.start(), 300);
  }
}

function stopVoice() {
  if (recognition) recognition.stop();
  voiceActive = false;
  updateVoiceUI(false);
  voiceFeedback('Voice stopped');
}

function updateVoiceUI(active) {
  const btn = document.getElementById('voice-btn');
  const panel = document.getElementById('voice-panel');
  if (!btn) return;

  if (active) {
    btn.classList.add('voice-active');
    btn.title = 'Stop listening';
    if (panel) panel.classList.add('visible');
  } else {
    btn.classList.remove('voice-active');
    btn.title = 'Voice commands';
    if (panel) panel.classList.remove('visible');
  }
}

function voiceFeedback(msg, isError = false) {
  const el = document.getElementById('voice-status');
  if (el) {
    el.textContent = msg;
    el.style.color = isError ? 'var(--pink)' : 'var(--green)';
  }
  showToast(msg, isError ? 'error' : 'success');
}

function showVoiceHelp() {
  const modal = document.getElementById('voice-help-modal');
  if (modal) modal.classList.toggle('visible');
}

// ── INIT ALL EFFECTS ──
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  // Slight delay so cards are rendered first
  setTimeout(initTiltCards, 300);
  initVoice();
});
