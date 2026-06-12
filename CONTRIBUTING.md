# Contributing to GuildPass Mobile

Thank you for your interest in contributing to GuildPass Mobile! This is the React Native / Expo app for the GuildPass ecosystem, listed on [GrantFox](https://contribute.grantfox.xyz) for open contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Finding Issues via GrantFox](#finding-issues-via-grantfox)
- [Development Setup](#development-setup)
- [Branching & Commits](#branching--commits)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Review Process](#review-process)
- [Communication](#communication)

---

## Code of Conduct

By participating you agree to our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Ways to Contribute

- Fix UI bugs or screen-level regressions
- Add or improve Expo Router screens
- Improve NativeWind/Tailwind styling
- Add Vitest unit tests for hooks or store logic
- Improve Zustand state management
- Improve TanStack Query data fetching
- Write or improve documentation in `docs/`

---

## Finding Issues via GrantFox

1. Visit the [GrantFox contributor app](https://contribute.grantfox.xyz) and find the **Adamantine-Guild / guildpass-mobile** project.
2. Browse issues tagged `good first issue` or `help wanted`.
3. Apply for an issue on GrantFox, or comment `I'd like to work on this` on the GitHub issue.
4. Wait for a maintainer to assign it before starting.

Direct GitHub filters:

- [`good first issue`](https://github.com/Adamantine-Guild/guildpass-mobile/issues?q=label%3A%22good+first+issue%22)
- [`help wanted`](https://github.com/Adamantine-Guild/guildpass-mobile/issues?q=label%3A%22help+wanted%22)

---

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Expo Go on a physical device, or Xcode/Android Studio for simulators

### Steps

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/guildpass-mobile.git
cd guildpass-mobile

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env — set EXPO_PUBLIC_API_URL if connecting to live guildpass-core

# 4. Start the Expo dev server
pnpm start

# 5. Open on device / simulator
pnpm ios      # iOS simulator
pnpm android  # Android emulator
# Or scan the QR code in Expo Go
```

### Project structure

| Path     | Purpose                                          |
| -------- | ------------------------------------------------ |
| `app/`   | Expo Router file-based pages and layouts         |
| `src/`   | Feature modules, hooks, Zustand stores, services |
| `docs/`  | Architecture and integration guides              |
| `tests/` | Vitest unit tests                                |

---

## Branching & Commits

- Branch off `main`: `git checkout -b feat/short-description` or `fix/short-description`
- Conventional commits:
  - `feat: add membership expiry countdown screen`
  - `fix: correct role badge colour for admin`
  - `test: add unit tests for membership store`
  - `style: adjust NativeWind spacing on dashboard card`
  - `chore: upgrade Expo SDK to 51`

---

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a PR against `Adamantine-Guild/guildpass-mobile` on `main`.
3. Fill in the [PR template](.github/PULL_REQUEST_TEMPLATE.md) completely.
4. Ensure these pass before submitting:

```bash
pnpm typecheck   # Must pass with no errors
pnpm lint        # Fix all reported issues
pnpm test:run    # All tests must pass
```

### PR Quality Expectations

- UI changes must include a screenshot or screen recording in the PR description.
- Use NativeWind (Tailwind) classes — no `StyleSheet.create` for new UI unless justified.
- New screens must handle loading, empty, and error states.
- New business logic must have at least one Vitest unit test.
- Do not introduce native modules that break Expo Go compatibility without prior discussion.

---

## Review Process

- A maintainer will review your PR within **5 business days**.
- Mobile PRs with UI changes may require a screen recording.
- Address requested changes promptly.

---

## Communication

- GitHub Issues: preferred for task discussion and bug reports
- Contact: maintainers@guildpass.xyz
- [GrantFox maintainer app](https://maintainer.grantfox.xyz)
