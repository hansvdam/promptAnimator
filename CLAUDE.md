# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prompt Animator is a browser-based visualization tool that demonstrates how LLM interactions work (tools, RAG, skills, etc.) through staged animations. Built with vanilla JavaScript (ES modules) and Vite — no framework (React, Vue, etc.).

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

No test runner or linter is configured.

## Architecture

**Entry flow:** `index.html` → `src/main.js` → `App` constructor wires together all panels and the engine.

### Core layers

- **Engine** (`src/engine/`) — Animation state machine
  - `AnimationEngine.js` — States: idle → playing → paused → finished. Executes steps from the queue sequentially.
  - `StepQueue.js` — Converts config scenario data into executable animation steps.
  - `Timing.js` — Speed-aware delays using `AbortController` for cancellation.

- **Components** (`src/components/`) — UI built with `el()` DOM helper (no JSX)
  - `App.js` — Root: creates ContextPanel, ChatPanel, Toolbar, AnimationEngine; loads configs; handles keyboard shortcuts (Space=play/step, Esc=reset).
  - `ChatPanel.js` / `ContextPanel.js` — Main display areas.
  - `Toolbar.js` — Playback controls (play, speed multiplier, mode, reset).
  - Card components: `ChatBubble.js`, `ContextCard.js`, `ToolResultCard.js`, `AnnotationCard.js`.

- **Configs** (`src/configs/`) — Scenario definitions (message sequences, context cards, tool calls). Each config is a JS module exporting scenario data that StepQueue converts to animation steps.

- **Utils** (`src/utils/`)
  - `dom.js` — `el()` helper for creating DOM elements.
  - `typewriter.js` — Character-by-character text animation.

### Animation step types

`show-context-card`, `pause-beat`, `user-message`, `assistant-message`, `tool-result`, `annotation`

### Styling

All CSS in `src/style.css` — dark theme using CSS custom properties. Fonts: Inter + JetBrains Mono (loaded from Google Fonts in `index.html`).
