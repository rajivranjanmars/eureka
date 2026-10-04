# Eureka

A React and TypeScript browser extension that accepts a task description, queries a task recommendation service, and offers web search results to help find suitable tools. It includes popup, content, options, and browser developer-tool entry points.

## Usage

Install with `pnpm install`, run `pnpm build`, and load the generated `dist/` directory as an unpacked browser extension. `pnpm dev` starts the extension development workflow. Remote recommendations require the service configured in `src/pages/popup/Popup.tsx`.

## Author

[rajivranjanmars](https://rajivranjana.in)

## Quality checks

Run `pnpm lint` for TypeScript checking and `pnpm exec vitest run` for the extension tests. Formatting uses Prettier; the obsolete ESLint/Airbnb configuration has been removed.
