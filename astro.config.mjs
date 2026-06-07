// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://rika3000.github.io",
    base: "/rika-lads-studio",
    devToolbar: {
        enabled: false,
    },
    redirects: {
        "/": "/about"
    },
});
