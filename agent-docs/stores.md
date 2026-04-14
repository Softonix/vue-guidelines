# Stores

Pinia stores hold shared reactive state. Only create a store when state is needed across multiple components or composables.

## When NOT to Create a Store

- State is local to one component — use `ref`/`reactive` in the component
- State is local to one composable — keep it there
- Data comes from the server and doesn't need client-side caching beyond queries — use a query instead

## Rules

- Use composition API (`defineStore('name', () => { ... })`)
- Stores use services for API requests/business logic. Stores must NEVER use project composables
- Stores can use other stores only when they are global/shared (e.g., `useAuthStore` from a view store) — never between peer stores to avoid circular dependencies

## Scope

- **Global** (`src/store/modules/`) — app-wide state (e.g., `general.store.ts` for app settings)
- **Feature/view-scoped** — co-located with the feature or view

All are auto-imported.

Reference: `src/views/home/home.store.ts`, `src/store/general.store.ts`
