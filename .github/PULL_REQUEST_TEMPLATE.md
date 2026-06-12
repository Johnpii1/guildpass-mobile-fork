## Description

<!-- A clear and concise summary of the changes in this PR. -->

## Linked Issue

Closes # <!-- Issue number this PR resolves -->

## Type of Change

- [ ] 🐛 Bug fix (screen or component)
- [ ] ✨ New feature / screen
- [ ] 🎨 UI/UX improvement
- [ ] 📝 Documentation update
- [ ] 🔧 Chore / refactor / dependency update
- [ ] 🧪 Tests only

## Changes Made

-
-

## Screenshots / Recordings

<!-- Mobile PRs with UI changes MUST include a screenshot or screen recording. -->

| iOS                 | Android             |
| ------------------- | ------------------- |
| <!-- screenshot --> | <!-- screenshot --> |

## Test Evidence

```
pnpm test:run output:
```

## Checklist

- [ ] I have read [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] This PR is linked to an open issue
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test:run` passes — all tests green
- [ ] UI changes include a screenshot or screen recording
- [ ] New screens handle loading, empty, and error states
- [ ] NativeWind (Tailwind) classes used — no `StyleSheet.create` for new UI without justification
- [ ] No native modules added that break Expo Go compatibility (without prior discussion)
- [ ] No secrets, keys, or wallet credentials included
- [ ] `.env.example` updated if new environment variables were added
- [ ] Accessibility: interactive elements are keyboard-navigable and have accessibility labels

## Additional Notes

<!-- Anything else reviewers should know. -->
