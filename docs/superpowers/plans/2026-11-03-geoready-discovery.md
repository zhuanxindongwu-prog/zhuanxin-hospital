# GeoReady Discovery Implementation Plan

> **For agentic workers:** Execute inline with superpowers:executing-plans; request a fresh final reviewer. User authorized retest, analysis, optimization and deployment.

**Goal:** Provide consistent public machine-readable information and accessible article grouping after a real GeoReady retest.

**Architecture:** Pure builders consume existing homepage and service data; a build-only Markdown renderer consumes already generated public HTML. Existing static generation writes the artifacts to public and dist. Conditional Vercel routing exposes the homepage representation only to an explicit Markdown request.

**Tech Stack:** Vue3 compiler DOM parser, Node, Vite, Vercel static routing.

**Spec:** `docs/superpowers/specs/2026-11-03-geoready-discovery-design.md`

## Global Constraints

- Preserve existing clinical content, authors, dates, images,44-page inventory,8 physicians,pets and contact-only flows.
- Keep source facts shared and generated output deterministic; no build-time clinical freshness or invented agent capabilities.
- No paid plan, account creation, messages, newsletter signup or external profile changes.

## Review Focus

- Named robots groups must retain restricted paths rather than accidentally overriding wildcard protections.
- Markdown must retain nested Chinese text, media/links,dates and meaningful block boundaries; hidden controls/scripts/nav must not leak.
- All machine-readable artifacts must reference the canonical public site and existing visible facts only.
- HTML and Markdown response caches must remain distinct; noindex dynamic routes must remain untouched.
- List semantics must preserve layout,all original covers,links and pet interactions at375/768/desktop.

### Task1: Public data and Markdown builders

**Files:** new `src/data/crawlerAccess.js`,`src/data/publicDiscovery.js`,`scripts/render-public-markdown.mjs`; new `src/publicDiscovery.test.js`.

**Interfaces:** `createRobotsTxt(siteUrl)`; `createDiscoveryDocuments(siteUrl)` mapping public relative paths to strings; `renderPublicMarkdown(html,siteUrl)` returns public main-content Markdown.

- [ ] Write failing tests for restricted robot groups,canonical facts and JSON consistency,Markdown blocks/links/media/hidden content.
- [ ] Implement small shared builders from existing sources,without network or runtime side effects.
- [ ] Verify tests with Chinese/escaping fixtures and existing metadata.

### Task2: Build outputs,routing and article list

**Files:** static generator,vercel.json,homepage SFC/CSS,static/homepage tests; generated public artifacts.

- [ ] Add failing tests for actual generated discovery files,44 canonical article sections and semantic article list.
- [ ] Generate artifacts and idempotent llms discovery links from built HTML; preserve original dates/source links.
- [ ] Configure exact Markdown Accept rewrite and MIME/Vary headers,then verify default HTML and private routes.
- [ ] Preserve sidebar appearance with a reset list style and accessible list role.

### Task3: Review,publish,retest

- [ ] Full verify; independent robots parser and all public JSON/Markdown output checks; mobile/browser QA.
- [ ] Fresh final review of delta from22182ee;resolve substantive findings.
- [ ] Backup,commit,fast-forward and deploy using existing Git integration.
- [ ] Verify44 pages,new endpoints,alternating Accept requests,robots restrictions,original UI and fresh/cached GeoReady result;record report.
