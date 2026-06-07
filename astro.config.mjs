// @ts-check
import { defineConfig } from 'astro/config';
import { site } from 'astro:config/server';

// https://astro.build/config
export default defineConfig({
    devToolbar: {
        enabled: false,
    },
    redirects: {
        "/": "/about"
    },
    site: "https://rika3000.github.io",
    base: "/rika-lads-studio",
});
