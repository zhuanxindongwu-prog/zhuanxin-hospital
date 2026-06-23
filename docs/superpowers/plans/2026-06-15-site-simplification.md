# Site Simplification Implementation Plan

**Goal:** Simplify the complete public website while preserving routes, SEO content, medical information, and functionality.

**Architecture:** Extend the shared theme with restrained panel, button, spacing, and surface rules. Redesign the homepage care-guide section as the reference component, then apply the same flat visual language to existing public components through shared selectors.

**Tech Stack:** Vue 3, Vite, scoped CSS, Bootstrap utilities

## Tasks

1. Add shared simplicity tokens and public component overrides in `src/theme.css`.
2. Rebuild `src/components/News.vue` as a care-guide navigation and compact article list.
3. Verify public homepage, articles, products, PetVoice, and specialty pages on desktop and mobile.
4. Run production build, SEO audit, and formatting checks.
