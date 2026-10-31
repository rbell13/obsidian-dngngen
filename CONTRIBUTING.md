# Contributing

## Setup

```sh
npm ci
npm run dev
```

`npm run dev` watches the TypeScript source and rebuilds `main.js` for local testing in Obsidian.

## Before opening a pull request

Run the full check gate; CI runs the same thing:

```sh
npm run check
```

This runs ESLint, the test suite (`tests/*.test.ts`), a type-check, and a production build. Add tests for parser changes in `tests/parser.test.ts`.

## Conventions

- Keep DOM construction on `createEl`/`textContent`; never use `innerHTML`, `outerHTML`, or `insertAdjacentHTML` on untrusted input (Obsidian plugin review requirement).
- The parser in `parser.ts` mirrors DNGNGEN's copied-text format exactly; changes to labels, ordering, or grouping affect both parsing and rendering.
- Follow `.editorconfig` (tabs of width 4, LF, final newline).

## Releases

Maintainers release by running `npm version <patch|minor|major>` and pushing the tag; the release workflow builds, attests, and publishes assets automatically.
