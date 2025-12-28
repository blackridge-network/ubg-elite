// script.js — emoji theme toggle, persistence

(function(){
  const STORAGE_KEY = 'divine-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // Apply theme: 'dark' or 'light'
  function applyTheme(theme){
    if(theme === 'light'){
      root.classList.remove('dark');
      root.classList.add('light');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.textContent = '🌙'; // show moon while in light mode
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      toggle.setAttribute('aria-pressed', 'true');
      toggle.textContent = '☀️'; // show sun while in dark mode
    }
  }

  // Initialize: default to dark unless user preference stored
  const stored = localStorage.getItem(STORAGE_KEY);
  const initial = stored === 'light' ? 'light' : 'dark';
  applyTheme(initial);

  // Toggle handler
  function toggleTheme(){
    const current = root.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
  }

  toggle.addEventListener('click', toggleTheme);
  toggle.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Ensure accessibility role
  toggle.setAttribute('role', 'button');

})();
