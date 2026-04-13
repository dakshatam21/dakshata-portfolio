/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   script.js — Dakshata Mhatre Portfolio
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── TYPING EFFECT ── */
const phrases = [
  "Aspiring Software Developer",
  "Computer Engineering Student @ VIT",
  "Java & DSA Enthusiast",
  "Web Developer"
];
let pi = 0, ci = 0, del = false;
const typingEl = document.getElementById('typingEl');
function type() {
  const phrase = phrases[pi];
  if (!del) { ci++; typingEl.innerHTML = phrase.slice(0,ci)+'<span class="cursor"></span>'; if(ci===phrase.length){del=true;setTimeout(type,1300);return;} }
  else      { ci--; typingEl.innerHTML = phrase.slice(0,ci)+'<span class="cursor"></span>'; if(ci===0){del=false;pi=(pi+1)%phrases.length;} }
  setTimeout(type, del?40:60);
}
type();

/* ── SCROLL EVENTS ── */
const progressBar = document.getElementById('progress-bar');
const backTop     = document.getElementById('back-top');
const navbar      = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
  backTop.classList.toggle('show', window.scrollY > 400);
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  highlightNav();
  revealOnScroll();
});

/* ── ACTIVE NAV ── */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}

/* ── REVEAL ON SCROLL ── */
function revealOnScroll() {
  document.querySelectorAll('.journey-item,.edu-card,.proj-card,.achv-card').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('visible');
  });
}
revealOnScroll();

/* ── MOBILE MENU ── */
function openMobile()  { document.getElementById('mobileMenu').classList.add('open');    }
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

/* ── EXPERIENCE DETAIL PANEL ── */
const expData = {
  exp1: {
    title:  "Core Member",
    org:    "Creatives & Documentation Council · Student Council, VIT Mumbai",
    dur:    "2025 – Present",
    points: [
      "Designed creative content — posters, banners, and digital assets — for college events",
      "Maintained official documentation and structured reports for all council activities",
      "Coordinated with team members to ensure smooth planning and execution of events",
    
    ],
    skills: ["Leadership","Teamwork","Communication","Creativity","Documentation","Design"]
  },
  exp2: {
    title:  "SIH Internal Hackathon Participant",
    org:    "Smart India Hackathon — Vidyalankar Institute of Technology, Mumbai",
    dur:    "2025",
    points: [
      "Participated in the internal round of Smart India Hackathon (SIH) at college level",
      "Worked in a team to ideate and develop an innovative solution for a real-world problem statement",
      "Collaborated on product design, technical planning, and presentation within a tight deadline",
     
    ],
    skills: ["Problem Solving","Teamwork","Innovation","Rapid Prototyping","Presentation"]
  }
};

function showExp(id) {
  document.querySelectorAll('.exp-card').forEach(c => c.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const d = expData[id];
  document.getElementById('expDetailInner').innerHTML = `
    <div class="exp-detail-title">${d.title}</div>
    <div class="exp-detail-org">${d.org}</div>
    <div class="exp-detail-dur">${d.dur}</div>
    <ul class="exp-detail-list">${d.points.map(p=>`<li>${p}</li>`).join('')}</ul>
    <div class="exp-skills-row">${d.skills.map(s=>`<span class="exp-skill-chip">${s}</span>`).join('')}</div>
  `;
}
showExp('exp1'); // load first by default

/* ── CONTACT FORM ── */
function submitForm(e) {
  e.preventDefault();
  const name  = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const msg   = document.getElementById('formMsg').value;
  // Opens mail client with pre-filled message
  window.location.href = `mailto:dakshatamhatre211@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(msg + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
  document.getElementById('formSuccess').style.display = 'block';
  e.target.reset();
  setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 4000);
}


/* ── 1. CUSTOM CURSOR ── */
const cursorDot  = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className  = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);
 
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
 
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});
 
// Ring follows with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();
 
// Ring grows on hovering clickable elements
document.querySelectorAll('a, button, .proj-card, .exp-card, .skill-category-card, .achv-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-ring--hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-ring--hover'));
});
 
 
/* ── 2. HERO PARTICLE STARS ── */
(function createStars() {
  const hero = document.getElementById('home');
  if (!hero) return;
 
  const canvas = document.createElement('canvas');
  canvas.className = 'star-canvas';
  hero.prepend(canvas);
 
  const ctx = canvas.getContext('2d');
  let stars = [];
 
  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initStars(); });
 
  function initStars() {
    stars = Array.from({ length: 90 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      dx:    (Math.random() - 0.5) * 0.25,
      dy:    (Math.random() - 0.5) * 0.25,
    }));
  }
  initStars();
 
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
 
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 139, 250, ${s.alpha * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
})();
 
 
/* ── 3. STAT COUNTER ANIMATION ── */
function animateCounter(el, target, isFloat, suffix) {
  const duration = 1800;
  const start    = performance.now();
 
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = isFloat
      ? (ease * target).toFixed(2)
      : Math.floor(ease * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
 
// Trigger counters when hero stats scroll into view
const statNums = document.querySelectorAll('.stat-num');
const statsData = [
  { target: 9.78, isFloat: true,  suffix: '' },
  { target: 4,    isFloat: false, suffix: '+' },
  { target: 2,    isFloat: false, suffix: 'nd' },
];
 
let countersStarted = false;
function checkCounters() {
  if (countersStarted) return;
  const firstStat = statNums[0];
  if (!firstStat) return;
  const rect = firstStat.getBoundingClientRect();
  if (rect.top < window.innerHeight - 40) {
    countersStarted = true;
    statNums.forEach((el, i) => {
      if (statsData[i]) {
        const { target, isFloat, suffix } = statsData[i];
        animateCounter(el, target, isFloat, suffix);
      }
    });
  }
}
window.addEventListener('scroll', checkCounters);
checkCounters();
 
 
/* ── 4. SECTION ENTRANCE — staggered children ── */
const staggerSelectors = '.skills-grid .skill-category-card, .achv-grid .achv-card, .about-stats-row .about-stat';
 
document.querySelectorAll(staggerSelectors).forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`;
});
 
function revealStaggered() {
  document.querySelectorAll(staggerSelectors).forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}
window.addEventListener('scroll', revealStaggered);
revealStaggered();
 
 
/* ── 5. MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
 
 
/* ── 6. SCROLL-TRIGGERED PROGRESS BAR GLOW ── */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.getElementById('progress-bar').style.boxShadow =
    pct > 0.05 ? '0 0 10px rgba(167,139,250,0.6)' : 'none';
});
 