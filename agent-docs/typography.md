# Typography

Use predefined typography classes from `src/assets/styles/utils/typography.css` for all text styling.

## Available Classes

You can find all available classes in the file

Each has variants:

- `-muted` — gray text (`text-ink-muted`)
- `-secondary` — slightly darker gray (`text-ink-secondary`)
- `-bolder` — adds `font-medium`
- Combinations: `-muted-bolder`, `-secondary-bolder`

Special: `error-text` (red), `accent-text` (teal)

## Rules

- These are custom CSS classes, not Tailwind utilities — apply via `class` attribute
- Only fall back to raw Tailwind text utilities (e.g., `text-xs`) when no predefined class matches the required size/style
