# Products Design QA

## Evidence

- Selected direction: `docs/superpowers/specs/assets/2026-07-12-products-equal-comparison.png`
- Desktop implementation: `docs/superpowers/specs/assets/2026-07-13-products-implementation-desktop.png`
- Mobile implementation: `docs/superpowers/specs/assets/2026-07-13-products-implementation-mobile.png`
- Side-by-side comparison: `docs/superpowers/specs/assets/2026-07-13-products-design-qa-comparison.png`
- Desktop viewport: 1440 x 1024
- Mobile viewport: 390 x 844, full-page capture for stacked content
- Route and state: `/products`, initial load, both product cards visible and actionable

## Required Surfaces

- Typography: single H1, equal H2 product hierarchy, readable supporting copy, and no clipped labels.
- Layout: equal-width desktop cards, shared CTA baseline, stacked mobile cards, and no horizontal overflow.
- Color: existing brand green `#69964A`, teal `#006B70`, white, and cool neutral surfaces.
- Product media: approved PetVoice and LikeWater assets use contained presentation and explicit dimensions.
- Copy: product purpose, facts, routes, and the shared veterinary disclaimer remain visible.
- Interaction: PetVoice CTA routes to `/petvoice`; LikeWater CTA routes to `/ohtrust`.

## Findings

- P0: none.
- P1: none.
- P2: none after the spacing and media-ratio corrections.
- P3: the implementation uses text-based fact rows instead of the reference icon row. This preserves clarity and avoids introducing a second icon style into the existing site.
- P3: the site's existing fixed mobile contact bar remains visible at the bottom of the viewport. Product CTAs and the disclaimer remain reachable and are not clipped in the document flow.

## Comparison History

1. Initial implementation used tall media stages; both cards were about 877 px high and placed their CTAs below the first desktop viewport.
2. Switching desktop media to 16:9 reduced card height to about 778 px, but the CTA baseline was still too low.
3. Compact card padding and tighter content spacing reduced the cards to about 727 px.
4. Two-column fact rows and a tighter intro completed the correction: both cards are about 692 px high, CTA bottoms are at about 956 px, and the shared disclaimer begins at about 989 px.
5. Mobile QA confirmed 316 px-wide stacked cards, 316 px-wide CTAs, loaded product images, and zero horizontal overflow at 390 px.

## Result

The selected equal-comparison direction is faithfully represented, both product journeys work, and desktop/mobile layouts remain stable.

final result: passed
