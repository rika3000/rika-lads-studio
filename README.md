# Rika LADS Studio Website

![Astro](https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 🔎 Overview
This is a personal website for Rika LADS Studio showcasing makeup tutorials and glint photobooth photos created on a mobile game called Love and Deepspace.
All the tutorials and photos are redirected to X Posts under [@rikaLADSstudio](https://x.com/rikaLADSstudio) account.

## 🚀 Quick Start

1. Clone the repository
```bash
git clone https://github.com/rikaladsstudio/rikaladsstudio.github.io.git
```
2. Install dependencies
```bash
npm install
```
3. Run the development server
```bash
npm run dev
```
Visit http://localhost:4321 to view the website.

## 🗂️ Project Structure

Inside the Astro project directory, you'll see the following directories and files:

```text
/
├── public/
│   └── favicon.ico
│   └── favicon.svg
│   └── images/
│       └── photos/
│       └── tutorials/

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