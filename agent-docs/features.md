# Features

Features are reusable, route-agnostic modules with a single responsibility. Create a feature when the module can be used across multiple views or is a self-contained domain.

## When to Create a Feature

- The module is not tied to a specific route
- It could be reused across multiple views
- It represents a self-contained domain (e.g., chat, categories, credits)

**Route-bound ≠ feature.** If every component, service, and query in a module is consumed exclusively under a single route tree, it belongs in `views/`, not `features/`. A distinct domain does not automatically make it a feature — cross-view reuse does. When in doubt, check: "Is anything in this module imported from a different route tree?" If no, it's a view.

## Folder Structure

```
features/{feature-name}/
├── feature-name.service.ts         # Feature API service
├── feature-name.store.ts           # Pinia store (optional — only for shared state)
├── feature-name.types.d.ts         # Feature-scoped types (optional)
├── feature-name.queries.ts         # Query helpers (optional)
├── composables/                    # Feature-scoped composables (optional)
│   └── useFeatureName.ts
└── components/                     # ALL .vue files go here
    ├── FeatureName.vue             # Main feature component
    └── FeatureNamePart.vue         # Supporting components
```

## Isolation Rules

1. Features NEVER depend on other features — no imports from `src/features/{other-feature}/`
2. Features NEVER import from views — no imports from `src/views/`
3. Each feature has ONE single responsibility
4. Cross-feature communication goes through EventEmitter, not direct imports

## All `.vue` Files Live in `components/`

The main feature component (If needed) goes inside `components/`, not at the feature root. This is required for auto-import to work — the Vite plugin scans `src/features/**/components/**/*.vue`.

## Store Is Optional

Only create a `.store.ts` when state needs to be shared across multiple consumers. If state is local to one component or composable, keep it there.

## The `platform/` Feature

`src/features/platform/` is special infrastructure — it contains the API client, icons system, modals registry, and Supabase client. Do not use it as a template for regular features.

## Domain Prefixing

All files within a feature are prefixed with the feature domain name:

- Components: `PascalCase` prefix — `SeniorChat.vue`, `SeniorChatBubble.vue`, `SeniorChatMessages.vue`
- TS files: `kebab-case` prefix — `senior-chat.service.ts`, `senior-chat.types.d.ts`
- Composables: `use` + `PascalCase` domain — `useSeniorChat.ts`
