// ── Språkdropdown / Language dropdown ──
function toggleLang() {
  document.getElementById('langDrop').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  const drop = document.getElementById('langDrop');
  if (drop && !drop.contains(e.target)) drop.classList.remove('open');
});

// ── Temaväxlare / Theme switcher ──
const THEME_KEY = 'pdfcleaner-theme';
const isEnglish = document.documentElement.lang === 'en';

function applyTheme(theme) {
  const sheet = document.getElementById('themeStylesheet');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (!sheet) return;
  if (theme === 'light') {
    sheet.href = sheet.dataset.lightHref;
    if (icon) icon.textContent = '🌙';
    if (label) label.textContent = isEnglish ? 'Dark' : 'Mörkt';
  } else {
    sheet.removeAttribute('href');
    if (icon) icon.textContent = '☀️';
    if (label) label.textContent = isEnglish ? 'Light' : 'Ljust';
  }
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// Load saved theme on page load
(function() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
})();
