# Ordis

**Ordis** is a free, open-source desktop application for orchestrating AI agent teams. Assemble teams of agents with different roles that work autonomously in parallel, communicate with each other, manage their own tasks, review code, and collaborate across teams — all managed through a real-time Kanban board.

> "Get a lot done by doing very little."

Ordis connects to Claude, Codex, and OpenCode runtimes — start with a free model with no signup, API key, or credit card required, or connect your existing provider access for more models.

## Features

### Agent Teams
- **Team assembly** — Create teams with custom roles; agents work autonomously in parallel
- **Cross-team communication** — Agents message each other within and across teams
- **Solo mode** — Single agent that self-manages tasks, expandable to a full team anytime
- **Flexible autonomy** — Fully autonomous or per-action approval with notifications

### Kanban Board
- **Real-time task tracking** — 5-column board showing task status changes as agents work
- **Task attachments** — Images and files auto-attached and available to agents
- **Smart references** — `#task-id` references and `@team-name` mentions in messages
- **Recent tasks** — Cross-project task overview

### Code Review
- **Hunk-level diff view** — Accept, reject, or comment on individual diff hunks per task
- **Agent review workflow** — Agents review each other's work automatically
- **Built-in code editor** — Edit files with Git support and syntax highlighting without leaving the app

### Live Process Monitoring
- **Running agents** — See active processes, open URLs in browser
- **CPU/RAM monitoring** — Per-teammate resource tracking
- **Agent Graph** — Real-time force-directed visualization of team and task topology
- **Task-specific logs** — Trace every action per task with full execution history

### Session Analysis
- **Deep session analysis** — Bash commands, reasoning, subprocesses breakdown
- **Token/context monitoring** — Token usage by category (CLAUDE.md, tool outputs, thinking, team coordination)
- **Context recovery** — Post-compact context restoration for team-management instructions
- **Cost tracking** — Per-session and per-agent cost breakdown

### Direct Messaging & Notifications
- **Direct messaging** — Send messages to any agent, comment on tasks
- **Notification system** — Alerts on task completion, agent attention needed, errors, comments
- **Task-aware inputs** — `#task-id` references link messages to kanban cards

### MCP Integration
- **Built-in MCP server** — External tools and agent plugins via Model Context Protocol
- **Provider management** — Auto-detection of installed runtimes with UI configuration

### Branch Strategy
- **Git worktree isolation** — Each teammate gets its own isolated worktree
- **Per-task branches** — Clean isolation for code changes per task

## Installation

### Download Prebuilt App

| Platform | Download |
|----------|----------|
| macOS (Apple Silicon) | [Ordis-arm64.dmg](https://github.com/777genius/Ordis/releases/latest/download/Ordis-arm64.dmg) |
| macOS (Intel) | [Ordis-x64.dmg](https://github.com/777genius/Ordis/releases/latest/download/Ordis-x64.dmg) |
| Windows | [Ordis.Setup.exe](https://github.com/777genius/Ordis/releases/latest/download/Ordis.Setup.exe) |
| Linux (AppImage) | [Ordis.AppImage](https://github.com/777genius/Ordis/releases/latest/download/Ordis.AppImage) |
| Linux (.deb) | [Ordis-amd64.deb](https://github.com/777genius/Ordis/releases/latest/download/Ordis-amd64.deb) |
| Linux (.rpm) | [Ordis-x86_64.rpm](https://github.com/777genius/Ordis/releases/latest/download/Ordis-x86_64.rpm) |
| Linux (.pacman) | [Ordis.pacman](https://github.com/777genius/Ordis/releases/latest/download/Ordis.pacman) |

> **Windows users:** Launch Ordis as Administrator, especially when using OpenCode runtimes.

> **Linux RDP sessions:** Some RDP sessions expose virtual GPU drivers that can break Electron rendering. Launch with `ORDIS_DISABLE_GPU=1` to disable hardware acceleration.

### Build from Source

**Prerequisites:**
- Node.js >= 24.15.0 (< 25)
- pnpm >= 10
- macOS 13.5+ (for official Node binaries on macOS)

```bash
git clone https://github.com/777genius/Ordis.git
cd Ordis
pnpm install
pnpm dev          # Start the desktop Electron app with hot reload
```

**Debug mode** — inspect teammates in tmux panes:
```bash
CLAUDE_TEAM_TEAMMATE_MODE=tmux pnpm dev
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Electron 40 |
| UI | React 19, Tailwind CSS 3 |
| Language | TypeScript 5 |
| State | Zustand 4 |
| Editor | CodeMirror 6 |
| Terminal | xterm.js |
| I18n | i18next (English, 中文) |
| Build | electron-vite, electron-builder |
| Test | Vitest |
| Package | pnpm 10 (workspaces) |

## Architecture

Ordis follows **Clean Architecture** principles organized by feature slices:

```
src/features/<feature-name>/
  contracts/          DTOs, IPC constants, cross-process public API
  core/
    domain/           Pure business rules, no side effects
    application/      Use cases, ports (no framework dependencies)
  main/               Electron main process (IPC, adapters, infrastructure)
  preload/            Thin IPC bridge to renderer
  renderer/           UI components, hooks, adapters
```

**Key principles:**
- Business logic isolated from Electron and React
- HTTP and IPC are both first-class transports
- UI built from shared Radix UI headless primitives
- Architecture enforced by `eslint-plugin-boundaries`

See [`docs/FEATURE_ARCHITECTURE_STANDARD.md`](docs/FEATURE_ARCHITECTURE_STANDARD.md) for the full standard.

## Docker

Run the HTTP server in standalone mode (no Electron):

```bash
# Build
docker build -t ordis .

# Run (mount ~/.claude for session data)
docker run -p 3456:3456 -v ~/.claude:/data/.claude:ro ordis
```

The web UI is served on `http://localhost:3456`.

Or run without Docker:
```bash
pnpm standalone:build
pnpm standalone:start
```

## Project Structure

```
Ordis/
  src/
    features/          Feature slices (teams, sessions, kanban, editor, etc.)
    main/              Electron main process
    renderer/          React renderer
    shared/            Shared types, constants, utilities
  agent-teams-controller/   Internal controller package
  mcp-server/               Built-in MCP server
  landing/                  Product website (nuxt)
  docs/                     Documentation
  scripts/                  Build and CI scripts
  docker/                   Docker configuration
  resources/                Bundled assets and binaries
  patches/                  pnpm dependency patches
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start Electron app with hot reload |
| `pnpm build` | Production build |
| `pnpm typecheck` | Type checking |
| `pnpm test` | Run all tests |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm format` | Format code |
| `pnpm check` | Full quality gate (types + lint + test + build) |
| `pnpm dist` | Package for distribution |

Always use `pnpm` (not npm or yarn) for this project.

## Contributing

Ordis is 100% free, open source, and local-first. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Follow the [Feature Architecture Standard](docs/FEATURE_ARCHITECTURE_STANDARD.md)
4. Run `pnpm check` before submitting
5. Open a pull request

## License

[AGPL-3.0](LICENSE) — Copyright © 2026 Илия (777genius)

Ordis is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
