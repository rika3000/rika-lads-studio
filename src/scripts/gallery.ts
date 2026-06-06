import { PHOTO_MODE_ALL } from "../lib/constants";
import { Lightbox } from "../lib/lightbox";

interface GalleryElements {
    allPhotos: NodeListOf<HTMLDivElement>;
    totalPhotoCountTxt: HTMLElement | null;
    emptyState: HTMLElement | null;
    filterClearBtn: HTMLButtonElement | null;
    showFiltersBtn: HTMLButtonElement | null;
    hideFiltersBtn: HTMLButtonElement | null;
    closeFilterBtn: HTMLButtonElement | null;
    filterSection: HTMLElement | null;
    characterFilterBtns: NodeListOf<HTMLButtonElement>;
    photoModeFilterBtns: NodeListOf<HTMLButtonElement>;
    tagFilterBtns: NodeListOf<HTMLButtonElement>;
    allCharactersBtn: HTMLButtonElement | null;
    allPhotoModesBtn: HTMLButtonElement | null;
    allTagsBtn: HTMLButtonElement | null;
    hasQrBtn: HTMLButtonElement | null;
}

interface GalleryState {
    // contains a list of character(s) that are selected for filtering
    activeCharacters: Set<string>;
    // contains a list of tag(s) that are selected for filtering
    activeTags: Set<string>;
    // whether "Has QR code" filter is selected
    activeHasQR: boolean;
    // stores value of selected photo mode filter (either "all", "solo", "duo" or "other"), default is "all"
    activePhotoMode: string;
    // indices of photos that match current filters. This is used to quickly show/hide photos without re-filtering
    filteredPhotoIndices: Set<number>;
}

/**
 * Initializes the gallery variables and state
 * @returns The initialized gallery elements and state
 */
function initVariables() {
    const elements: GalleryElements = {
        allPhotos: document.querySelectorAll(".photo-card"),
        totalPhotoCountTxt: document.getElementById("total-photo-count"),
        emptyState: document.getElementById("gallery-empty-state"),
        filterClearBtn: document.getElementById("filter-clear-btn") as HTMLButtonElement | null,
        showFiltersBtn: document.getElementById("show-filters-btn") as HTMLButtonElement | null,
        hideFiltersBtn: document.getElementById("hide-filters-btn") as HTMLButtonElement | null,
        closeFilterBtn: document.getElementById("filter-close-btn") as HTMLButtonElement | null,
        filterSection: document.getElementById("filter-section") as HTMLElement | null,
        characterFilterBtns: document.querySelectorAll("#character-filters button.pill:not([data-character-all])") as NodeListOf<HTMLButtonElement>,
        photoModeFilterBtns: document.querySelectorAll("#photo-mode-filters button.pill:not([data-pm-all])") as NodeListOf<HTMLButtonElement>,
        tagFilterBtns: document.querySelectorAll("#tag-filters button.pill:not([data-tag-all]):not([data-qr-filter])") as NodeListOf<HTMLButtonElement>,
        allCharactersBtn: document.querySelector("[data-character-all]") as HTMLButtonElement | null,
        allPhotoModesBtn: document.querySelector("[data-pm-all]") as HTMLButtonElement | null,
        allTagsBtn: document.querySelector("[data-tag-all]") as HTMLButtonElement | null,
        hasQrBtn: document.querySelector("[data-qr-filter]") as HTMLButtonElement | null,
    };

    let state: GalleryState = {
        activeCharacters: new Set(),
        activeTags: new Set(),
        activeHasQR: false,
        activePhotoMode: PHOTO_MODE_ALL,
        filteredPhotoIndices: new Set(
            Array.from(elements.allPhotos).map((_, index) => index),
        ),
    };
    return { elements, state };
}

/**
 * Toggles the filter section based on the current state
 * @param elements The gallery elements
 */
function toggleFilterSection(elements: GalleryElements) {
    const lightbox = new Lightbox();
    const isExpanded = elements.showFiltersBtn?.getAttribute('aria-expanded') === 'true';

    elements.showFiltersBtn?.setAttribute('aria-expanded', `${!isExpanded}`);
    elements.hideFiltersBtn?.setAttribute('aria-expanded', `${!isExpanded}`);

    if (!isExpanded && window.innerWidth < 1300) {
        lightbox.open();
    } else {
        lightbox.close();
    }
}


/**
 * Toggles the character filter state
 * @param activeCharacters The current active characters
 * @param characterName The character name to toggle
 */
function toggleCharacter(activeCharacters: Set<string>, characterName: string) {
    if (activeCharacters.has(characterName)) {
        activeCharacters.delete(characterName);
    } else {
        activeCharacters.add(characterName);
    }
}

/**
 * Toggles the tag filter state
 * @param activeTags The current active tags
 * @param tagName The tag name to toggle
 */
function toggleTag(activeTags: Set<string>, tagName: string) {
    if (activeTags.has(tagName)) {
        activeTags.delete(tagName);
    } else {
        activeTags.add(tagName);
    }
}

/**
 * Renders the filter UI based on the current state
 * @param state The current gallery state
 * @param elements The gallery elements
 */
function renderFilters(state: GalleryState, elements: GalleryElements) {

    // Characters filter
    elements.allCharactersBtn?.classList.toggle("active", state.activeCharacters.size === 0);

    elements.characterFilterBtns.forEach((btn) => {
        const characterName: string = btn.getAttribute("data-character") || "";
        btn.classList.toggle("active", state.activeCharacters.has(characterName));
    });

    // Photo mode filter
    elements.allPhotoModesBtn?.classList.toggle("active", state.activePhotoMode === PHOTO_MODE_ALL);

    elements.photoModeFilterBtns.forEach((btn) => {
        const photoMode: string = btn.getAttribute("data-pm") || "";
        btn.classList.toggle("active", state.activePhotoMode === photoMode);
    });

    // Tags filter
    elements.allTagsBtn?.classList.toggle("active", state.activeTags.size === 0 && !state.activeHasQR);
    elements.hasQrBtn?.classList.toggle("active", state.activeHasQR);

    elements.tagFilterBtns.forEach((btn) => {
        const tagName: string = btn.getAttribute("data-tag") || "";
        btn.classList.toggle("active", state.activeTags.has(tagName));
    });
}

/**
 * Applies the current filters to the gallery
 * @param state The current gallery state
 * @param elements The gallery elements
 */
function applyFilters(state: GalleryState, elements: GalleryElements) {
    state.filteredPhotoIndices.clear();
    elements.allPhotos.forEach((e) => {
        const photo: HTMLDivElement = e;
        const characters = photo.dataset.characters
            ? photo.dataset.characters.split(",")
            : [];
        const tags = photo.dataset.tags
            ? photo.dataset.tags.split(",")
            : [];

        // boolean checks
        const characterMatch =
            state.activeCharacters.size === 0 ||
            characters.some((c: string) => state.activeCharacters.has(c));

        const photoModeMatch =
            state.activePhotoMode === PHOTO_MODE_ALL ||
            (state.activePhotoMode === "solo" && characters.length === 1) ||
            (state.activePhotoMode === "duo" && characters.length === 2) ||
            (state.activePhotoMode === "others" && characters.length > 2);

        const qrMatch = !state.activeHasQR || photo.dataset.hasQr === "true";
        const tagMatch = state.activeTags.size === 0 || tags.some((t: string) => state.activeTags.has(t));

        const willShow = characterMatch && photoModeMatch && qrMatch && tagMatch;
        if (willShow) {
            state.filteredPhotoIndices.add(parseInt(photo.dataset.index || "-1"));
        }
    });
}

/**
 * Clears all filters and resets the gallery
 * @param state The current gallery state
 * @param elements The gallery elements
 */
function clearAllFilters(state: GalleryState, elements: GalleryElements) {
    state.activeCharacters.clear();
    state.activeTags.clear();
    state.activeHasQR = false;
    state.activePhotoMode = PHOTO_MODE_ALL;
    renderFilters(state, elements);
    applyFilters(state, elements);
}

/**
 * Renders the gallery based on the current state
 * @param state The current gallery state
 * @param elements The gallery elements
 */
function renderGallery(state: GalleryState, elements: GalleryElements) {

    // Update total count
    if (elements.totalPhotoCountTxt) {
        elements.totalPhotoCountTxt.textContent = `${state.filteredPhotoIndices.size} PHOTO${state.filteredPhotoIndices.size > 1 ? "S" : ""}`;
    }
    if (elements.closeFilterBtn) {
        if (state.filteredPhotoIndices.size === 0) {
            elements.closeFilterBtn.textContent = "NO PHOTO FOUND";
        } else {
            elements.closeFilterBtn.textContent = `SHOW ${state.filteredPhotoIndices.size} PHOTO${state.filteredPhotoIndices.size > 1 ? "S" : ""}`;
        }
    }

    // Show all if no filters applied
    if (state.filteredPhotoIndices.size === elements.allPhotos.length) {
        for (const photo of elements.allPhotos) {
            photo.classList.remove("hidden");
        }
        return;
    }

    // Apply visibility based on filtered indices
    for (const photo of elements.allPhotos) {
        const index = parseInt(photo.dataset.index || "-1");
        photo.classList.toggle("hidden", !state.filteredPhotoIndices.has(index));
    }

    // Show empty state if no photos match
    if (elements.emptyState) {
        elements.emptyState.classList.toggle("visible", state.filteredPhotoIndices.size === 0);
    }
}

/**
 * Filters and renders the gallery based on the current state
 * @param state The current gallery state
 * @param elements The gallery elements
 */
function filterAndRenderGallery(state: GalleryState, elements: GalleryElements) {
    renderFilters(state, elements);
    applyFilters(state, elements);
    renderGallery(state, elements);
}



/**
 * Adds event listeners to the filter buttons
 * @param elements The gallery elements
 * @param state The current gallery state
 */
function addBtnEventListeners(elements: GalleryElements, state: GalleryState) {
    elements.showFiltersBtn?.addEventListener('click', () => toggleFilterSection(elements));
    elements.hideFiltersBtn?.addEventListener('click', () => toggleFilterSection(elements));
    elements.closeFilterBtn?.addEventListener('click', () => toggleFilterSection(elements));

    // All characters filter buttons
    elements.allCharactersBtn?.addEventListener("click", () => {
        state.activeCharacters.clear();
        filterAndRenderGallery(state, elements);
    });

    elements.characterFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedCharacter: string | null = btn.getAttribute("data-character");
            if (!selectedCharacter) return;

            toggleCharacter(state.activeCharacters, selectedCharacter);
            filterAndRenderGallery(state, elements);
        });
    });

    // All photo modes filter buttons
    elements.allPhotoModesBtn?.addEventListener("click", () => {
        state.activePhotoMode = PHOTO_MODE_ALL;
        filterAndRenderGallery(state, elements);
    });

    elements.photoModeFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedPhotoMode: string | null = btn.getAttribute("data-pm");
            if (!selectedPhotoMode) return;

            state.activePhotoMode = (state.activePhotoMode === selectedPhotoMode) ? PHOTO_MODE_ALL : selectedPhotoMode;
            filterAndRenderGallery(state, elements);
        });
    });

    // All tags filter buttons
    elements.allTagsBtn?.addEventListener("click", () => {
        state.activeTags.clear();
        state.activeHasQR = false;
        filterAndRenderGallery(state, elements);
    });

    elements.hasQrBtn?.addEventListener("click", () => {
        state.activeHasQR = !state.activeHasQR;
        filterAndRenderGallery(state, elements);
    });

    elements.tagFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tagName = btn.getAttribute("data-tag");
            if (!tagName) return;
            toggleTag(state.activeTags, tagName);
            filterAndRenderGallery(state, elements);
        });
    });

    elements.filterClearBtn?.addEventListener("click", () => {
        clearAllFilters(state, elements);
        renderGallery(state, elements);
    });

}

document.addEventListener("DOMContentLoaded", () => {
    const { elements, state } = initVariables();
    clearAllFilters(state, elements);
    addBtnEventListeners(elements, state);
    renderGallery(state, elements);
});