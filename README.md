# Prompt Animator

An interactive browser-based tool that visualizes how LLM (Large Language Model) interactions work through staged animations. It demonstrates concepts like tool calling, RAG (Retrieval-Augmented Generation), skills, and full agent flows by animating the back-and-forth between a user, an assistant, and external tools.

https://github.com/user-attachments/assets/38a16d88-6c80-4eb3-8eff-b12bd368f636

## Features

- **Animated chat flow** — watch user messages, assistant responses, tool calls, and tool results play out step by step
- **Context panel** — see system instructions, tools, memories, and MCP servers that the model has access to
- **Multiple scenarios** — four built-in demos:
  - How Tools Work
  - How Skills Work
  - How RAG Works
  - Full Flow (combines multiple concepts)
- **Playback controls** — play/pause, speed (1x / 1.5x / 2x), step-by-step mode, reset
- **Keyboard shortcuts** — Space to play or step forward, Escape to reset

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Adding a Scenario

Create a new config file in `src/configs/` following the pattern of the existing ones (e.g. `how-tools-work.js`), then add it to the `configs` array in `src/configs/index.js`.
