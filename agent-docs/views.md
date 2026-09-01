# Views

Views are route-bound pages. Create a view when the module is tied to a specific URL.

## When to Create a View

- The module represents a page reachable via a URL
- It needs its own route definition (`.routes.ts`)
- It orchestrates features and/or contains page-specific logic

## Folder Structure

Reference: `src/views/home/`

```
views/{view-name}/
├── ViewName.vue                    # Root page component
├── view-name.routes.ts             # Route definitions
├── view-name.service.ts            # View-scoped API service (optional)
├── view-name.types.d.ts            # View-scoped types (optional)
├── view-name.queries.ts            # Query helpers (optional)
├── composables/                    # View-scoped composables (optional)
├── components/                     # View-scoped components
└── {sub-section}/                  # Sub-pages grouped by domain
    ├── ViewNameSubPage.vue
    ├── view-name-sub.service.ts    # Sub-section service (optional)
    └── components/                 # Sub-section components (optional)
```

Views can have sub-sections as subdirectories. Each sub-section groups related pages, services, and components.

## Route Definitions

Reference: `src/views/home/home.routes.ts`

Rules:

- Always use `routeNames.xxx` for route names — never string literals. The `routeNames` object is auto-generated (see `.config/route-names-generator/`)
- Lazy-load all components: `component: () => import('@/views/...')`
- Use `meta` to declare route behavior flags consumed by router guards/layouts — never as a place for arbitrary page data. Each flag must have a corresponding handler (guard, layout, resolver, etc.) that reads it. If nothing reads the flag, don't add it. Common flags:
  - `meta.requireAuth` — route requires an authenticated user (enforced by the auth guard; unauthenticated users are redirected to login)
  - `meta.layout` — selects the layout wrapper for the page (e.g. `'default' | 'blank' | 'auth'`); omit to use the default
  - `meta.roles` — array of roles allowed to access the route (enforced by the permissions guard)
  - `meta.title` — i18n key used by the document title handler

## Views Orchestrate Features

Views compose features — a view can render components from `src/features/` and coordinate between them. Features never know about views.

For cross-feature communication within a view, use EventEmitter with type-safe events via `IEventMap`. Always cleanup subscriptions in `onUnmounted`.

## Domain Prefixing

All files within a view are prefixed with the view domain name:

- Components: `PascalCase` prefix — `SeniorProfileInfoCard.vue`, `VolunteerAvailableRequests.vue`
- TS files: `kebab-case` prefix — `senior-request.service.ts`, `volunteer-request.types.d.ts`
