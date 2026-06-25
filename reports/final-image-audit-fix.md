# Final Image Audit Fix

Date: 2026-06-18

## Scope

Audited categories:

- Desserts
- Snacks
- Combos
- Pickles

Rule applied throughout:

- Only obvious, dish-matching food images were accepted.
- Obvious non-food, unrelated-food, banner, logo, and placeholder-style results were rejected.
- Confidence below 80% was treated as not safe for replacement.

## Fixed Items

| Menu Item | Category | Final Asset | What Was Wrong Before | Confidence |
| --- | --- | --- | --- | --- |
| Rasgulla | Desserts | `/images/menu/rasgulla.jpg` | Fallback rendered unrelated burger-style image | 98% |
| Gulab Jamun | Desserts | `/images/menu/gulab-jamun.jpg` | Fallback rendered idli image | 96% |
| Aloo Bajji (6) | Snacks | `/images/menu/aloo-bajji.jpg` | Missing local file was falling back to a non-exact snack image | 90% |
| Stuffed Mirchi Bajji (3) | Snacks | `/images/menu/stuffed-mirchi-bajji.jpg` | Fallback rendered supermarket/non-food-style image | 92% |
| Egg Bonda (4) | Snacks | `/images/menu/egg-bonda.jpg` | Fallback rendered pizza image | 90% |
| Meat Samosa (5) | Snacks | `/images/menu/meat-samosa.jpg` | Missing local file risked unrelated fallback behavior | 94% |
| Veg Spring Rolls (5) | Snacks | `/images/menu/spring-rolls.jpg` | Existing file showed unrelated ribs/platter image | 86% |
| Meat Spring Rolls (5) | Snacks | `/images/menu/meat-spring-rolls.jpg` | Fallback rendered unrelated breakfast/platter image | 84% |
| Onion Pakora (6) | Snacks | `/images/menu/onion-pakora.jpg` | Remote mapped image was not safe to keep after audit | 89% |
| Pickles section hero | Pickles | `/images/menu/pickles-hero.jpg` | Section image showed unrelated snack-style photo instead of Indian pickle | 95% |

## Unchanged After Audit

These audited areas were reviewed and did not show obvious dish mismatch problems after the fixes above:

- `Mirchi Bajji (3)`
- `Aloo Samosa Big (2)`
- `Punugulu`
- `Chicken Pakora (6)`
- `Gajar Ka Halwa`
- All combo card images in `COMBO_ITEMS`

## Wiring Changes

- `Gulab Jamun` now uses a local asset instead of remote fallback mapping.
- `Meat Spring Rolls (5)` now uses a local asset instead of remote fallback mapping.
- `Onion Pakora (6)` now uses a local asset instead of remote fallback mapping.
- Pickles section hero now uses a local food image with lazy loading.

## Notes

- All replacement images were optimized and kept at natural proportions.
- No stretching was introduced.
- This pass focused on eliminating obvious visual mismatches in the audited categories.
