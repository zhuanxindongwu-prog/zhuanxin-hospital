# LikeWater 滾動敘事延伸：設計 QA

Date: 2026-11-17
Route: http://127.0.0.1:5175/ohtrust
final result: passed

## Source and implementation

Source visual truth: `/Users/cardiospeical/Desktop/專心官網/zhuanxin-hospital/output/product-design/ohtrust-20261116/option-2.png`.
Existing approved implementation capture: `output/product-design/ohtrust-scroll-20261117/before-full.png`.
New photographic reference: `output/product-design/ohtrust-scroll-20261117/assets/touch-surfaces.png` (plus carrier-care.png and home-breathing-room.png).
Implementation screenshots: `output/product-design/ohtrust-scroll-20261117/hero-final.png`, `scene-01-final.png`, `scene-02-desktop.png`, `scene-03-desktop.png`, `home-panorama-desktop.png`, `mobile-scene-corrected.png`, `tablet-scene-corrected.png`.

This is a requested extension of the selected warm residential design: three scenes, a larger detail chapter, and a full-width residential interlude. Those extra chapters intentionally have no equivalent in the earlier four-chapter mock. Original report data, claims, limitations and FAQ remain intact. The original November 16 QA is preserved in `output/product-design/ohtrust-scroll-20261117/before/design-qa.md`.

## Normalization and comparison evidence

Desktop CSS viewport 1280 × 720. Before full capture 1280 × 6123; latest page height 9658 CSS px. Viewport screenshots are 1280 × 720. The browser reports devicePixelRatio 2, but its screenshot output is already normalized to CSS-sized pixels; images were not stretched or doubled.

The 1024 × 1536 selected reference was proportionally resized to 1280 × 1920 and its first 720 pixels compared with the current first viewport. Earlier approved implementation uses its first 1280 × 720 pixels. Both pairs were assembled side by side and opened for visual inspection:

- `comparison-selected-reference.png`: selected art direction / current hero. Existing real-product rendering and typography differences accepted in previous QA remain; the additional scroll cue is intentional.
- `comparison-hero.png`: approved prior hero / current hero, matching viewport and scroll-top state. Imagery and tokens retained. The slightly higher copy group accommodates the new scroll cue.
- `comparison-scene-photo.png`: generated photographic reference fitted to the actual 630 × 632 stage / rendered stage crop. Product trigger and label, hand, cloth, warm palette and image quality retain fidelity. Caption and progress are intentional editable UI overlays.

Additional captured interaction states cover all three scene transitions and the panorama. Mobile 375 × 812 and tablet 768 × 1024 screenshots were opened separately to judge the responsive adaptation, as the selected reference does not provide those artboards.

## Findings and fixes

1. [P2, fixed] At 768px, inline photo retained its HTML height while its width shrank, producing an overly tall crop. Added `height: auto` to `.story-inline-photo img`. Re-captured `tablet-scene-corrected.png`: photo is 364.445 × 455.555 CSS px, an exact 4:5 proportion, with the full product and wiping action visible. Mobile is also 4:5.
2. [P2, fixed] The first scene paragraph could leave a short ending on a separate line. Added `text-wrap: pretty`; the corrected desktop and mobile captures retain readable complete phrases.

No actionable P0/P1/P2 findings remain.

## Required fidelity surfaces

- **Fonts/typography:** existing PingFang TC / Noto Sans TC / Microsoft JhengHei stack, weights, green eyebrow and black display hierarchy retained. Scene headings remain readable across 375/768/1024/1280 widths; body and usage notes have independent readable sizes. Content is never hidden pending a reveal.
- **Spacing/layout rhythm:** original hero and two-photo chapter retained. Three desktop steps each occupy the available viewport height, with a matching sticky photograph; lower report reading uses the original static/expandable flow. Narrow, short-screen and reduced-motion layouts use normal image/text blocks instead of a pinned viewport.
- **Colors/tokens:** warm ivory, cream, pale oak, ink and forest green are continued. Caption uses an opaque-enough white backing. Inactive scene copy remains dark gray, not transparent.
- **Images:** two new 4:5 photos and one 16:9 panorama match the supplied physical bottle and prior natural daylight direction. Existing pet-space photo is reused for the third scene. Responsive WebPs are local and lazy-loaded; the hero remains high priority. No placeholders, custom SVG, CSS illustrations or fake report imagery.
- **Copy/content:** added copy concerns ordinary environment/用品清潔 and ventilation. It does not add medical efficacy claims. Generated photos are labelled as illustrative. Six original report objects and both supported/unsupported claim arrays were checked byte for byte against the pre-change component; FAQ data file is unchanged.

## Browser and functional verification

- 1280 × 720: natural downward scrolling changes active scenes 01 → 02 → 03; upward scrolling switches back. Stage stays at 88px while pinned, then naturally exits at chapter end. Progress observed from 0 through 0.5827 to 1. No scroll interception or automatic slideshow.
- 375 × 812 and 768 × 1024: all three inline photos displayed; stage hidden; no horizontal overflow or overflowing child elements. Final photo ratio 0.8.
- 1024 × 768: desktop enhanced stage enabled, document width 1024; no overflow.
- 1280 × 540: enhanced stage disabled, inline photos displayed; no overflow.
- New direct-details link changes the hash to #product-detail and brings the detail chapter below the fixed header; it inherits the site's existing combined hash offset. New scene and FAQ links point to existing section IDs.
- Original SGS report expands and collapses with keyboard Enter; full PUG26900885, batch LW260801, 30-minute model and distinct organism results remain visible. Six PDF links and three FAQ records present.
- Final fresh browser tab console errors: none. A transient Vite hot-edit reload message in the earlier working tab was not reproduced in the fresh final tab.
- Reduced-motion handling reviewed in code: media query excludes sticky enhancement, transitions are disabled, and the same inline fallback branch tested at narrow/short viewports is used. OS motion preference was not changed for this verification.
- Vue lifecycle removes both scroll/resize listeners and the motion-query listener, and cancels the scheduled frame on unmount.

## Build and data checks

- `npm run build`: passed, 62 static SEO routes generated.
- `npm test`: 66/66 passed. Existing test-harness websocket-port warning is non-failing.
- `node scripts/check-ohtrust-report-section.mjs`: passed.
- Original reports / supportedClaims / unsupportedClaims: unchanged.
- `git diff --check`: passed.

## Follow-up

No blocking issues. No commit, push or deployment performed. Local preview remains running for user review. The new source images and exact built-in image_gen prompts are in `output/product-design/ohtrust-scroll-20261117/asset-generation.json`; responsive assets are under `public/imgs/likewater/`.
