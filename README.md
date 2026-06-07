# Rika Lads Studio

## 🗒️ Overview
This is a personal website for Rika LADS Studio showcasing makeup tutorials and photo albums created on a mobile game called Love and Deepspace. 
All the tutorials and photos will be redirected to X Posts.

## 🗂️ Project Structure

Inside the Astro project directory, you'll see the following directories and files:

```text
/
├── public/
│   └── favicon.ico
│   └── favicon.svg
│   └── images/
├── src/
│   └── components/
│   |   └── Footer.astro
│   |   └── Header.astro
│   |   └── Navigation.astro
│   |   └── NavigationMenu.astro
│   |   └── NavigationMobileMenu.astro
│   |   └── PhotoCard.astro
│   |   └── PhotoGallery.astro
│   |   └── PhotoGalleryFilter.astro
│   |   └── PhotoGalleryToolbar.astro
│   |   └── SocialHandle.astro
│   |   └── SvgSprite.astro
│   |   └── ThemeToggleBtn.astro
│   |   └── TutorialCard.astro
│   |   └── TutorialList.astro
│   └── data/
│   |   └── makeup_tutorials.json
│   |   └── photo_gallery.json
│   |   └── photo_gallery_test.json
│   └── layouts/
│   |   └── BaseLayout.astro
│   └── lib/
│   |   └── constants.ts
│   |   └── lightbox.ts
│   └── pages/
│   |   └── about.astro
│   |   └── makeuptutorials.astro
│   |   └── photoalbum.astro
│   └── scripts/
│   |   └── gallery.ts
│   |   └── menu.ts
│   `-- styles/
│   |   └── global.css
│   |   └── variables.css
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |