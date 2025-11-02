# LinkED

LinkED is an exploratory web app for comparing ten Future Ready Skills with U.S. state education standards. It is built with React, Vite, Tailwind CSS, and D3.js, and loads all content from local JSON files so it can be hosted statically (e.g., on GitHub Pages).

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the Vite dev server
   ```bash
   npm run dev
   ```
3. Build for production (optional)
   ```bash
   npm run build
   ```

> **Note:** Package installation requires Node.js 18+.

## Project structure

```
.
├── data/                  # Static JSON describing skills, states, and alignment scores
├── public/                # Public assets served as-is (currently unused)
├── src/
│   ├── components/        # Reusable UI elements (charts, download actions)
│   ├── pages/             # Route-level views (home, explore)
│   ├── App.jsx            # App shell with routing and layout
│   └── main.jsx           # React entry point
├── index.html             # Vite entry document
├── package.json           # Scripts and dependencies
├── postcss.config.js      # Tailwind + PostCSS configuration
├── tailwind.config.js     # Tailwind theme setup
└── vite.config.js         # Vite configuration
```

## Data files

- `data/skills.json` defines the ten Future Ready Skills (ids, names, descriptions).
- `data/states.json` lists example states and the standards to visualize.
- `data/alignments.json` maps a state + skill combination to alignment strength scores (0–100) for each standard.

You can replace the placeholder data with your own datasets while preserving the structure of the JSON files.

## Deployment

Because LinkED is a static site, you can deploy it anywhere that serves static assets, including GitHub Pages:

1. Build the project with `npm run build`.
2. Deploy the resulting `dist/` folder to your static host of choice.

### GitHub Pages

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site and publishes it to GitHub Pages every time `main` is updated.

1. In your repository settings, enable GitHub Pages and choose "GitHub Actions" as the source.
2. Push or merge a commit to `main`. The workflow will install dependencies, run `npm run build`, and upload the `dist/` output.
3. Once the "Deploy LinkED to GitHub Pages" workflow finishes, the public URL is shown in the workflow summary and in the Pages settings screen.
   - If your repository lives at `github.com/<username>/<repository>`, the deployed site will be available at `https://<username>.github.io/<repository>/`.
   - You can click the "Visit site" button in the workflow run or the GitHub Pages settings panel to open the published app in your browser.
   - LinkED uses hash-based routing (`#/explore`) so all deep links work on GitHub Pages refreshes without additional configuration.

If you fork the project or change the default branch, update the workflow triggers and (optionally) rename the deployment workflow to suit your setup.
