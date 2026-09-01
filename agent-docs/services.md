# Services

Services are pure API/domain logic. They never know about stores or composables.

## Pattern

Class with a singleton export

Reference: `src/views/home/home.service.ts`

## Rules

- No explicit return type when `apiClient` infers it from the OpenAPI schema
- `signal?: AbortSignal` parameter only when the feature actually needs cancellation
- Static constants (e.g., status lists) can live as class properties
- For REST endpoints with path parameters, use `dynamicKeys` — a custom Axios extension that substitutes `{paramName}` placeholders in URLs: `apiClient.get('/api/volunteer/help-requests/{helpRequestId}/', { dynamicKeys: { helpRequestId: id } })`. Types are inferred from the OpenAPI schema via `TRequestParameters`
- Services can be global (`src/services/`), view-scoped, or feature-scoped — all are auto-imported
