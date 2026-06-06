import { LIGHT_THEME, DARK_THEME, SWITCH_TO_LIGHT_MODE_TXT, SWITCH_TO_DARK_MODE_TXT } from '../lib/constants'
import { Lightbox } from '../lib/lightbox'

interface MenuElements {
    themeToggleBtn: HTMLFormElement;
    mobileLightModeBtn: HTMLFormElement;
    mobileDarkModeBtn: HTMLFormElement;
    lightModeIcon: HTMLFormElement;
    darkModeIcon: HTMLFormElement;
    navigationMenuBtn: HTMLButtonElement;
    navigationCloseBtn: HTMLButtonElement;
    footerYearTxt: HTMLFormElement;
    showFiltersBtn: HTMLButtonElement | null;
    hideFiltersBtn: HTMLButtonElement | null;
}

const lightbox = new Lightbox();

/**
 * Initializes the menu elements
 * @returns MenuElements object containing all menu elements
 */
function initVariables() {
    const elements: MenuElements = {
        themeToggleBtn: document.getElementById('theme-toggle-btn') as HTMLFormElement,
        mobileLightModeBtn: document.getElementById('mobile-light-mode-btn') as HTMLFormElement,
        mobileDarkModeBtn: document.getElementById('mobile-dark-mode-btn') as HTMLFormElement,
        lightModeIcon: document.getElementById('theme-icon-sun') as HTMLFormElement,
        darkModeIcon: document.getElementById('theme-icon-moon') as HTMLFormElement,
        navigationMenuBtn: document.getElementById('navigation-menu-btn') as HTMLButtonElement,
        navigationCloseBtn: document.getElementById('navigation-close-btn') as HTMLButtonElement,
        footerYearTxt: document.getElementById('footer-year') as HTMLFormElement,
        showFiltersBtn: document.getElementById("show-filters-btn") as HTMLButtonElement | null,
        hideFiltersBtn: document.getElementById("hide-filters-btn") as HTMLButtonElement | null,
    };
    return elements;
}

/**
 * Loads the light or dark theme from saved theme in localStorage
 * If unavailable, defaults to light theme
 * @param elements 
 */
function initializeTheme(elements: MenuElements) {
    const saved = localStorage.getItem('theme') || LIGHT_THEME;
    document.documentElement.setAttribute('data-theme', saved);
    elements.lightModeIcon.style.display = saved === DARK_THEME ? 'block' : 'none';
    elements.darkModeIcon.style.display = saved === DARK_THEME ? 'none' : 'block';
    elements.mobileLightModeBtn.style.display = saved === DARK_THEME ? 'flex' : 'none';
    elements.mobileDarkModeBtn.style.display = saved === DARK_THEME ? 'none' : 'flex';
}

/**
 * Adds event listeners to the menu elements
 * @param elements 
 */
function addEventListeners(elements: MenuElements) {
    lightbox.addEventListener({
        showFiltersBtn: elements.showFiltersBtn as HTMLButtonElement,
        hideFiltersBtn: elements.hideFiltersBtn as HTMLButtonElement,
        navigationMenuBtn: elements.navigationMenuBtn as HTMLButtonElement,
        navigationCloseBtn: elements.navigationCloseBtn as HTMLButtonElement
    });

    elements.themeToggleBtn?.addEventListener('click', () => toggleDarkLightTheme(elements));
    elements.mobileDarkModeBtn?.addEventListener('click', () => toggleDarkLightTheme(elements));
    elements.mobileLightModeBtn?.addEventListener('click', () => toggleDarkLightTheme(elements));
    elements.navigationMenuBtn?.addEventListener('click', () => toggleMobileNavigationMenu(elements));
    elements.navigationCloseBtn?.addEventListener('click', () => toggleMobileNavigationMenu(elements));
}


/**
 * Toggles the mobile navigation menu
 * @param elements 
 */
function toggleMobileNavigationMenu(elements: MenuElements) {
    const isExpanded = elements.navigationMenuBtn.getAttribute('aria-expanded') === 'true';
    elements.navigationMenuBtn.setAttribute('aria-expanded', `${!isExpanded}`);
    elements.navigationCloseBtn.setAttribute('aria-expanded', `${!isExpanded}`);
    if (!isExpanded) {
        lightbox.open();
    } else {
        lightbox.close();
    }
}

/**
 * Toggles the dark or light theme
 * @param elements 
 */
function toggleDarkLightTheme(elements: MenuElements) {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    document.documentElement.setAttribute('data-theme', next);
    elements.lightModeIcon.style.display = next === DARK_THEME ? 'block' : 'none';
    elements.darkModeIcon.style.display = next === DARK_THEME ? 'none' : 'block';
    elements.mobileLightModeBtn.style.display = next === DARK_THEME ? 'flex' : 'none';
    elements.mobileDarkModeBtn.style.display = next === DARK_THEME ? 'none' : 'flex';
    localStorage.setItem('theme', next);
    elements.themeToggleBtn.title = next === DARK_THEME ? SWITCH_TO_LIGHT_MODE_TXT : SWITCH_TO_DARK_MODE_TXT;
}


document.addEventListener("DOMContentLoaded", () => {
    const elements = initVariables();
    initializeTheme(elements);
    addEventListeners(elements);
    // set the copyright year dynamically
    elements.footerYearTxt.textContent = `${new Date().getFullYear()}`;
});

/**
 * Close the navigation and filter mobile menus including lightbox if window width is less than 1300px when resizing the window
 */
window.addEventListener('resize', () => {
    const elements = initVariables();
    const isFilterMenuExpanded = elements.showFiltersBtn?.getAttribute('aria-expanded') === 'true' && elements.hideFiltersBtn?.getAttribute('aria-expanded') === 'true';
    const isNavigationMenuExpanded = elements.navigationMenuBtn.getAttribute('aria-expanded') === 'true' && elements.navigationCloseBtn.getAttribute('aria-expanded') === 'true';
    if (window.innerWidth > 1300) {
        if (isFilterMenuExpanded) {
            elements.showFiltersBtn?.setAttribute('aria-expanded', `${!isFilterMenuExpanded}`);
            elements.hideFiltersBtn?.setAttribute('aria-expanded', `${!isFilterMenuExpanded}`);
            lightbox.close();
        }

        if (isNavigationMenuExpanded) {
            elements.navigationMenuBtn.setAttribute('aria-expanded', `${!isNavigationMenuExpanded}`);
            elements.navigationCloseBtn.setAttribute('aria-expanded', `${!isNavigationMenuExpanded}`);
            lightbox.close();
        }
    }
});