Build & Test

- Dev server: npm run dev (Vite)
- Build: npm run build
- Lint: npm run lint (ESLint via eslint.config.js)
- Preview production build: npm run preview

Run a single test: No test runner or test scripts are present in this repository.

High-level architecture

- Single-page React app built with Vite. Entry: src/main.jsx -> App.jsx.
- UI is componentized under src/components. Static data: src/data/prompts.json. Styles use Tailwind CSS (index.css + tailwind plugins).
- Local persistence: user-added prompts and deleted prompt IDs are stored in localStorage (keys: user_prompts, deleted_prompt_ids). Admin mode is toggled by adding ?admin=true to the app URL.
- Build output goes to dist/ by default (ignored by ESLint globalIgnores).

Key conventions

- Files are JavaScript/JSX (ES modules). JSX files use .jsx extension.
- ESLint config is in eslint.config.js and targets .js/.jsx files; dist/ is globally ignored.
- React strict mode enabled in src/main.jsx.
- Admin features behind URL flag: ?admin=true.
- No tests: add a test runner (Jest/Playwright/ Vitest) and scripts if required.

Other AI assistant configs

- No existing AI assistant config files (CLAUDE.md, .cursorrules, AGENTS.md, CONVENTIONS.md, .windsurfrules) were found.

Notes

- If you want prompts persisted across machines, integrate a backend or cloud storage; currently everything is localStorage-only.

---
Created by Copilot CLI