# Repository Guidelines

## Project Structure & Module Organization

- `src/pages/` defines route-level Astro pages (e.g., `src/pages/index.astro`).
- `src/layouts/` holds shared page shells.
- `src/components/` contains UI building blocks (PascalCase `.astro`, e.g., `Header.astro`).
- `src/data/` stores content JSON (e.g., `schedule.json`, `speakers.json`).
- `src/i18n/` keeps localization helpers and strings.
- `src/styles/global.css` defines Tailwind v4 theme tokens and global styles.
- `public/` is for static assets (images, icons); `dist/` is build output.

## Build, Test, and Development Commands

Use npm (or Bun, based on `bun.lock`):

- `npm run dev`: start the Astro dev server.
- `npm run build`: run `astro check` then build to `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run astro`: run Astro CLI subcommands (e.g., `npm run astro -- --help`).

## Coding Style & Naming Conventions

- Indentation: 2 spaces in Astro, CSS, and JSON.
- Components: PascalCase `.astro` filenames; utilities and functions use camelCase.
- Tailwind v4: prefer utility classes and theme tokens in `src/styles/global.css` (OKLCH colors).
- Keep JSON schema stable in `src/data/` and mirror i18n keys across locales.

## Testing Guidelines

- No dedicated test runner is configured yet.
- Use `bun run build` for type checking and static validation, and verify UI changes in `bun run dev`.
- If you add tests, document the command in `package.json` and update this guide.

## Commit & Pull Request Guidelines

- Commit messages use imperative, sentence case (e.g., "Add registration form", "Update schedule data").
- PRs should include a short summary, testing notes, and screenshots for UI/visual changes.
- Link related issues or specs when applicable and call out data schema changes explicitly.
