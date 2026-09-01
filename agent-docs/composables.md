# Composables

Composables are the business logic orchestrators. They wire stores, services, and reactive state together. Create a composable when you need to encapsulate reusable stateful logic across modules, or to break down a large module into smaller pieces.

## Global vs Scoped

- **Global** (`src/composables/`) — reusable utilities across the entire app. Check VueUse before creating one.
- **Feature/view-scoped** (`{feature}/composables/`, `{view}/composables/`) — logic specific to that domain.

All are auto-imported.

## Rules

- Composables own async orchestration — services return promises, composables `await` them and manage loading/error state
- Use `storeToRefs()` to destructure store state reactively
- Split complex logic into focused helper functions and orchestrate from a thin top-level function
- Cleanup side effects in `onUnmounted` (subscriptions, speech recognition, timers)

Reference: `src/features/senior-chat/composables/useSeniorChat.ts`
