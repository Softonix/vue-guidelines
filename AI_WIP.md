# Softonix AI Vue Guidelines

## Architecture Layers

**One-way dependency direction for business logic:**

```
composable → store → service
```

- **Service** → knows nothing about store or composable (pure API/domain/data-managing logic)
- **Store** → can use services and utility composables (e.g., VueUse), but should NOT use project orchestrating composables
- **Composable** → can use stores and services (the orchestrator for business logic)

## Views vs Features

| Aspect              | Views                     | Features                      |
|---------------------|---------------------------|-------------------------------|
| **Purpose**         | Route-bound pages         | Reusable isolated modules     |
| **Route awareness** | Strictly tied to routes   | Route-agnostic (isolated)     |
| **Location**        | `src/views/`              | `src/features/`               |

**Feature isolation rules:**
1. Features NEVER know about the route they're used in
2. Features NEVER depend on other features directly
3. Views (or composables) act as "feature managers" and orchestrate communication

## Project Structure

```
.config/
├── auto-imports/                # unplugin-auto-import & unplugin-vue-components config
├── eslint-rules/                # ESLint rules (base, stylistic, typescript, vue)
├── icon-names-generator/        # Vite plugin generating TIcons type from SVG files
├── modals-generator/            # Vite plugin auto-registering *Modal.vue files
├── route-names-generator/       # Vite plugin generating routeNames from routeNames.xxx usage
└── index.ts                     # Exports all config plugins

dts/                             # TypeScript global declarations (auto-generated + manual)
public/                          # Website's static assets.
src/
├── assets/
│   └── styles/                  # CSS (main.css, theme.css, element-reset/)
├── components/                  # Global components
├── composables/                 # Global composables
├── features/                    # Reusable isolated features
    ├── platform/
    └── [feature]/          
        ├── Feature.vue
        ├── feature.service.ts
        ├── feature.store.ts  
        ├── composables/      
        └── components/       
├── layouts/                     # Layout components
├── plugins/                     # Vue plugins
├── router/                      # Routes, guards, route-names
├── services/                    # Global services
├── store/                       # Global Pinia stores
├── types/                       # Application-owned type definitions
├── utils/                       # Global utility functions
├── views/                       # Route-bound pages (strict structure)
│   └── [view]/
│       ├── View.vue
│       ├── view.routes.ts
│       ├── view.service.ts
│       ├── view.store.ts
│       ├── composables/
│       └── components/
```

## VueUse & Element Plus First

Before creating from scratch, ALWAYS check existing libraries:
- **Composables** → Check VueUse first (state, browser APIs, sensors, animations, utilities)
- **UI Components** → Check Element Plus first (buttons, forms, tables, dialogs, etc.)

## Auto-Imports

Everything in these paths is auto-imported (no manual imports needed):
- `src/composables/`, `src/views/**/composables/`, `src/features/**/composables/`
- `src/utils/` (filters.ts, helpers.ts)
- `src/services/`, `src/views/**/*.service.ts`, `src/features/**/*.service.ts`
- `src/store/modules/`, `src/views/**/*.store.ts`, `src/features/**/*.store.ts`
- `src/components/**/*.vue`, `src/views/**/components/**/*.vue`, `src/features/**/components/**/*.vue`
- Vue, Vue Router, Pinia, VueUse APIs (all auto-imported)

## Icon Component

`<Icon name="car" />` - dynamically loads SVG from `src/features/platform/icons/assets/`. Icon names are type-safe via auto-generated `TIcons` union in `src/features/platform/icons/icons.d.ts`.

## Modals

- Create modal components as `*Modal.vue` under `src/views/`, `src/features/`, or `src/components/` (auto-registered).
- Registry is auto-generated at `src/features/platform/modals/modals-registry.ts`.
- Use `useModals()` to control them: `openModal('HomeModal', props)` / `closeModal('HomeModal')`.
- The modal host is `Modals` component, rendered once in `src/App.vue`.

## Naming Conventions

- Folders: `kebab-case` (e.g., `user-profile`)
- Vue components: `PascalCase` (e.g., `UserProfile.vue`)
- TS files: `kebab-case` with suffix (e.g., `auth.service.ts`, `auth.store.ts`)
- Routes: `camelCase` matching key name
- Components conflicting with HTML tags: prefix with `App` (e.g., `AppButton`, `AppTable`)

## Important Rules

- NEVER use `export default` - always use named exports
- NEVER use `as any` to fix TypeScript errors - fix the actual type issue
- NEVER let services know about stores
- NEVER let stores use project orchestrating composables (utility composables like VueUse are OK)
- NEVER let features depend on each other directly
- Root page components must match route name: `Login.vue` → `/auth/login`
- ALWAYS use named navigation with `routeNames`, NEVER path strings
- Routes MUST have `name: routeNames.xxx` (camelCase), NEVER static strings like `name: 'my-route', it will be automatically generated inside routeNames`
- Page/component CSS goes in `.vue` files, global styles in `/assets/styles/`
