# Articles Editorial Redesign

## Goal

Redesign `/articles` as a compact specialist editorial library that helps pet owners find relevant care information quickly without changing article URLs, source data, or SEO metadata.

## Selected Direction

The selected Product Design concept is the second generated option, "專科編輯版". It replaces the current oversized introductory spacing and three disconnected content sections with one continuous reading path:

1. Compact page masthead and trust note.
2. Search and category controls.
3. Latest article feature with three monthly focus stories.
4. Four intent-based reading paths.
5. Unified care article feed.
6. Separate, compact media coverage feed.

## Information Architecture

- `latestArticle`: newest item across guides, care articles, and media articles.
- `monthlyFocus`: next three newest unique articles.
- `readingPaths`: four clear entry points: symptoms, disease/treatment, examinations, and home care.
- `filteredArticles`: the complete searchable and category-filtered care library.
- `mediaArticles`: remains a distinct source-aware media section and does not duplicate entries in the care feed.

## Interaction

- Search filters titles, categories, and descriptions immediately.
- Category buttons remain horizontally scrollable on small screens.
- Reading-path controls set the matching category and move focus to the library heading.
- Empty search results include a clear reset action.
- All cards remain normal `RouterLink` navigation to existing routes.

## Visual Rules

- Preserve `#69964A` primary, `#006B70` secondary, existing typography, and Bootstrap Icons.
- Use typography, spacing, and dividers before borders or elevation.
- Card radius must not exceed `8px`; avoid nested cards and decorative gradients.
- The first desktop viewport must show real article content.
- Mobile must avoid horizontal page overflow and keep the persistent contact controls from covering essential text.

## SEO And Accessibility

- Keep the existing single `h1`, route metadata, internal URLs, semantic sections, image alt text, and crawlable article titles.
- Search has a visible or screen-reader label.
- Category controls expose `aria-pressed`.
- Reading path controls are buttons, not non-interactive decoration.
- Decorative icons use `aria-hidden="true"`.

## Acceptance Criteria

- `/articles` shows the latest feature, three monthly focus links, four reading paths, the article feed, and media coverage.
- Search and category filtering use one unified result set.
- The old standalone social section is removed.
- Desktop and 390px mobile layouts have no horizontal overflow.
- Existing article links and static SEO generation remain valid.

