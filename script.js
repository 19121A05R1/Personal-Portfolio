// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navList = document.getElementById('nav-list');

mobileToggle?.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('show');

  // icon toggle
  const icon = mobileToggle.querySelector('i');
  if(icon) icon.className = expanded ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      // hide mobile menu after click
      if(navList.classList.contains('show')){
        navList.classList.remove('show');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if(icon) icon.className = 'fa-solid fa-bars';
      }
    }
  });
});

// Typewriter effect (simple)
const typeEl = document.getElementById('typewriter');
const words = ['beautiful UIs', 'fast websites', 'accessible experiences', 'scalable frontends'];
let w = 0, i = 0, forward = true;
function typeTick(){
  const word = words[w];
  if(forward){
    i++;
    typeEl.textContent = word.slice(0, i);
    if(i === word.length){ forward = false; setTimeout(typeTick, 1000); return; }
  } else {
    i--;
    typeEl.textContent = word.slice(0, i);
    if(i === 0){ forward = true; w = (w+1) % words.length; }
  }
  setTimeout(typeTick, forward ? 80 : 40);
}
if(typeEl) setTimeout(typeTick, 600);

// Theme toggle (persist)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if(saved === 'dark') document.documentElement.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  // swap icon
  const icon = themeToggle.querySelector('i');
  if(icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// form submit handler (demo)
function onContactSubmit(e){
  e.preventDefault();
  alert('Thanks! Message sending is demo-only. Replace with real endpoint or integrate EmailJS/Netlify functions.');
  e.target.reset();
  return false;
}
