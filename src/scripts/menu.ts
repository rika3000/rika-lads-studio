import { LIGHT_THEME, DARK_THEME, SWITCH_TO_LIGHT_MODE_TXT, SWITCH_TO_DARK_MODE_TXT } from '../lib/constants'
const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLFormElement;
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn') as HTMLFormElement;
const lightModeIcon = document.getElementById('theme-icon-sun') as HTMLFormElement;
const darkModeIcon = document.getElementById('theme-icon-moon') as HTMLFormElement;
const navigationMenuBtn = document.getElementById('navigation-menu-btn') as HTMLFormElement;
const navigationCloseBtn = document.getElementById('navigation-close-btn') as HTMLFormElement;
const lightbox = document.getElementById('lightbox') as HTMLFormElement;
const footerYearTxt = document.getElementById('footer-year') as HTMLFormElement;

/* ════════════════════════════════════════════
   THEME TOGGLE
   ════════════════════════════════════════════ */
function init() {
    // retrieve theme from localStorage
    const saved = localStorage.getItem('theme') || LIGHT_THEME;
    document.documentElement.setAttribute('data-theme', saved);
    lightModeIcon.style.display = saved === DARK_THEME ? 'block' : 'none';
    darkModeIcon.style.display = saved === DARK_THEME ? 'none' : 'block';

    themeToggleBtn.title = saved === DARK_THEME ? SWITCH_TO_LIGHT_MODE_TXT : SWITCH_TO_DARK_MODE_TXT;
    mobileThemeToggleBtn.innerText = saved === DARK_THEME ? SWITCH_TO_LIGHT_MODE_TXT : SWITCH_TO_DARK_MODE_TXT;
    footerYearTxt.textContent = `${new Date().getFullYear()}`;

}

function toggleMobileNavigationMenu() {
    const isExpanded = navigationMenuBtn.getAttribute('aria-expanded') === 'true';
    navigationMenuBtn.setAttribute('aria-expanded', `${!isExpanded}`);
    navigationCloseBtn.setAttribute('aria-expanded', `${!isExpanded}`);
    if (!isExpanded) {
        openLightbox(null);
    } else {
        closeLightbox();
    }
}

function toggleDarkLightTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    document.documentElement.setAttribute('data-theme', next);
    lightModeIcon.style.display = next === DARK_THEME ? 'block' : 'none';
    darkModeIcon.style.display = next === DARK_THEME ? 'none' : 'block';
    localStorage.setItem('theme', next);
    themeToggleBtn.title = next === DARK_THEME ? SWITCH_TO_LIGHT_MODE_TXT : SWITCH_TO_DARK_MODE_TXT;
    mobileThemeToggleBtn.innerText = next === DARK_THEME ? SWITCH_TO_LIGHT_MODE_TXT : SWITCH_TO_DARK_MODE_TXT;
}


themeToggleBtn?.addEventListener('click', toggleDarkLightTheme);
mobileThemeToggleBtn?.addEventListener('click', toggleDarkLightTheme);
navigationMenuBtn?.addEventListener('click', toggleMobileNavigationMenu);
navigationCloseBtn?.addEventListener('click', toggleMobileNavigationMenu);

window.addEventListener('resize', () => {
    const isExpanded = navigationMenuBtn.getAttribute('aria-expanded') === 'true' && navigationCloseBtn.getAttribute('aria-expanded') === 'true';
    if (window.innerWidth > 750 && isExpanded) {
        navigationMenuBtn.setAttribute('aria-expanded', `${!isExpanded}`);
        navigationCloseBtn.setAttribute('aria-expanded', `${!isExpanded}`);
        closeLightbox();
    }
});

/* ════════════════════════════════════════════
   LIGHTBOX
   ════════════════════════════════════════════ */
function openLightbox(idx: any) {
    const currentLbIndex = idx;
    //updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

lightbox?.addEventListener('click', () => {
    const isNavigationMenuExpanded = navigationMenuBtn.getAttribute('aria-expanded') === 'true' && navigationCloseBtn.getAttribute('aria-expanded') === 'true';
    if (isNavigationMenuExpanded) {
        navigationMenuBtn.setAttribute('aria-expanded', `${!isNavigationMenuExpanded}`);
        navigationCloseBtn.setAttribute('aria-expanded', `${!isNavigationMenuExpanded}`);
        closeLightbox();
    }
});



/* ════════════════════════════════════════════
   BOOT
   ════════════════════════════════════════════ */
init();