interface LightboxEventListenerParams {
    showFiltersBtn: HTMLButtonElement | null;
    hideFiltersBtn: HTMLButtonElement | null;
    navigationMenuBtn: HTMLButtonElement | null;
    navigationCloseBtn: HTMLButtonElement | null;
}

/**
 * Lightbox class for handling lightbox functionality
 */
export class Lightbox {
    private lightbox: HTMLElement | null;

    constructor() {
        this.lightbox = document.getElementById('lightbox');
    }

    open() {
        if (this.lightbox) {
            this.lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        if (this.lightbox) {
            this.lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    addEventListener({ showFiltersBtn, hideFiltersBtn, navigationMenuBtn, navigationCloseBtn }: LightboxEventListenerParams) {
        if (!this.lightbox) {
            return;
        }
        this.lightbox.addEventListener('click', () => {
            const isFilterMenuExpanded = showFiltersBtn?.getAttribute('aria-expanded') === 'true' && hideFiltersBtn?.getAttribute('aria-expanded') === 'true';
            const isNavigationMenuExpanded = navigationMenuBtn?.getAttribute('aria-expanded') === 'true' && navigationCloseBtn?.getAttribute('aria-expanded') === 'true';

            if (isFilterMenuExpanded) {
                showFiltersBtn?.setAttribute('aria-expanded', `${!isFilterMenuExpanded}`);
                hideFiltersBtn?.setAttribute('aria-expanded', `${!isFilterMenuExpanded}`);
                this.close();
            }
            if (isNavigationMenuExpanded) {
                navigationMenuBtn.setAttribute('aria-expanded', `${!isNavigationMenuExpanded}`);
                navigationCloseBtn.setAttribute('aria-expanded', `${!isNavigationMenuExpanded}`);
                this.close();
            }
        });
    }
}
