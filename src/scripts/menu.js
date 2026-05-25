/* ════════════════════════════════════════════
   THEME TOGGLE
   ════════════════════════════════════════════ */
(function () {
    const saved = localStorage.getItem('website-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('theme-icon-sun').style.display = saved === 'dark' ? 'none' : 'block';
    document.getElementById('theme-icon-moon').style.display = saved === 'dark' ? 'block' : 'none';
})();

document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.getElementById('theme-icon-sun').style.display = next === 'dark' ? 'none' : 'block';
    document.getElementById('theme-icon-moon').style.display = next === 'dark' ? 'block' : 'none';
    localStorage.setItem('website-theme', next);
});

/* ════════════════════════════════════════════
   BOOT
   ════════════════════════════════════════════ */
document.getElementById('footer-year').textContent = new Date().getFullYear();