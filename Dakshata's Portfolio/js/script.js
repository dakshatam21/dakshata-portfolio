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
  if (!del) { ci++; typingEl.innerHTML = phrase.slice(0,ci)+'<span class="cursor"></span>'; if(ci===phrase.length){del=true;setTimeout(type,1800);return;} }
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
