# Softonix Vue Guidelines

## Architecture Layers

**One-way dependency direction for business logic:**

```
composable → store → service
component → (composable | store | service)
```

- **Service** → knows nothing about store or composable (pure API/domain/data-managing logic)
- **Store** → can use services and utility composables (e.g., VueUse), but should NOT use project orchestrating composables. 
Do not use store for every view or every feature. Only when state is shared across multiple areas. Global store is not related to views or features, e.g: `account.store` or `config.store`
- **Composable** → can use stores and services (the orchestrator for business logic)

## Views vs Features

| Aspect              | Views                     | Features                      |
|---------------------|---------------------------|-------------------------------|
| **Purpose**         | Route-bound pages         | Reusable isolated modules     |
| **Route awareness** | Strictly tied to routes   | Route-agnostic (isolated)     |
| **Location**        | `src/views/{view-name}`              | `src/features/{feature-name}`               |

**Feature isolation rules:**
1. Features CAN contain multiple components, services, store or composables but ALWAYS have only ONE Single Responsibility.
2. Features NEVER depend on other features directly.
3. Views, composables and stores act as "feature managers" and orchestrate communication. For example `/views/search/Search.vue` contains `Chat.vue` component from `/features/chat`
4. Use EventEmitter (Or other observer/pub-sub) between features or other layers of application to avoid coupling. Check `utils/helpers.ts`. Event payloads are type-safe via `TEventMap`.

## Composable example

```
// Example only. Can be placed under /features/checkout together with CartCheckout component
// OR inside /views/checkout in case it is standalone composable.

export function useCartCheckout () {
    const loading = ref(false)
    const cartStore = useCartStore()
    const checkoutStore = useCheckoutStore()

    async function checkoutProducts () {
        loading.value = true

        try {
            const products = await cartStore.getProducts()
            await checkoutStore.checkout(products)
        } finally {
            loading.value = false
        }
    }

    return { checkoutProducts }
} 
```

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
    └── {feature-name}/
        ├── Feature.vue
        ├── feature.service.ts
        ├── feature.store.ts       # optional — only when state is shared
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
    └── [view]/
        ├── View.vue
        ├── view.routes.ts
        ├── view.service.ts
        ├── view.store.ts          # optional — only when state is shared
        ├── composables/
        └── components/
```

## VueUse & Element Plus First

Before creating from scratch, ALWAYS check existing libraries:
- **Composables** → Check VueUse first (state, browser APIs, sensors, animations, utilities)
- **UI Components** → Check Element Plus first (buttons, forms, tables, dialogs, etc.)

## Auto-Imports

The logic behind auto-imports is to reduce imports noise inside files followed by Nuxt.js paradigm. You still need to import custom .ts or .json files outside of rules described below. You can disable auto-imports of script files on your project if you want but we still strictly recommend to auto-import components.

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
- Registry is auto-generated at `src/features/platform/modals/modals-registry.ts` via `ModalsGenerator` vite plugin.
- Use `useModals()` to control them: `openModal('HomeModal', props)` / `closeModal('HomeModal')`.
- The modal host is `Modals` component, rendered once in `src/App.vue`.

## Error Handling

- API errors are handled by the **response interceptor** (`src/features/platform/api/interceptors/response.interceptor.ts`) which provides global error handling (e.g., ElNotification, sentry logging, redirects on 401).
- For **view-feature-specific error handling**, catch errors in composables or components and implement custom error handling logic. Do not use `ElNotification` inside each API error handler as it should be implemented globally. If you want to disable `ElNotification` for a specific API request, implement custom configuration for apiClient like `showNotification: false`. 

## EventEmitter usage example:

```ts
// In feature A (publisher) — e.g. inside a composable or component
helpers.eventEmitter.publish('cartUpdated', products)

// In feature B (listener) — always clean up to prevent memory leaks
const subscription = helpers.eventEmitter.listen('cartUpdated', (products) => {
  // react to cart changes
})
onUnmounted(() => subscription.remove())
```

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
