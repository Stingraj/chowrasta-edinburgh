# Final Client Changes Report — Chowrasta Edinburgh

**Date:** June 18, 2026
**Project:** Chowrasta Website Final Client Changes
**Status:** Completed

---

## 1. New Menu Items Added
We have successfully added the two requested items to the **Biryani's** category in [menu.ts](file:///Users/stingraj/Downloads/chowrasta-edinburgh-heritage-main%202/src/data/menu.ts).
Since no specific Andhra avakaya mango pickle biryani images were available in the scraped set, we have mapped them to existing safe biryani images:

*   **Avakaya Chicken Biryani** — **£13.99** (ID: `biryani-15`)
    *   *Description:* Fragrant basmati rice dum-cooked with spicy, tangy Andhra mango pickle (avakaya) chicken.
    *   *Fallback Image:* `/images/menu/chicken-dum-biryani.jpg` (Chicken Dum Biryani)
*   **Avakaya Mutton Biryani** — **£18.99** (ID: `biryani-16`)
    *   *Description:* Tender mutton slow-cooked with basmati rice and bold, tangy Andhra avakaya mango pickle.
    *   *Fallback Image:* `/images/menu/hyderabad-mutton-biryani.jpg` (Hyderabad Mutton Biryani)

---

## 2. Replaced Images
Images with match confidence >= 80% were optimized, converted to JPEG format (80% quality, max 800px width/height to preserve aspect ratio and avoid stretching), and copied to `/public/images/menu/`.

The following items are now served using authentic local images instead of external Unsplash fallbacks:

| Menu Item | Source File (Scraped) | Destination File | Confidence |
| :--- | :--- | :--- | :--- |
| **Chicken Fry Piece Biryani** | `35.png` (actual chicken fry pieces) | `chicken-fry-piece-biryani.jpg` | 86% |
| **Chicken 65 Biryani** | `30.png` | `chicken-65-biryani.jpg` | 90% |
| **Chicken Tikka Biryani** | `31.png` | `chicken-tikka-biryani.jpg` | 93% |
| **Chicken Tandoori Biryani** | `28.png` | `chicken-tandoori-biryani.jpg` | 94% |
| **Gongura Mutton Biryani** | `33.png` | `gongura-mutton-biryani.jpg` | 90% |
| **Gongura Chicken Biryani** | `33.png` | `gongura-chicken-biryani.jpg` | 90% |
| **Pulav Rice with Mutton Curry** | `41.png` | `pulav-rice-with-mutton-curry.jpg` | 85% |
| **Chicken Lollipop (Starter)** | `25.png` | `chicken-lollipop.jpg` | 96% |
| **Chicken Tikka (Starter)** | `19.png` | `chicken-tikka.jpg` | 93% |
| **Chilli Chicken (Starter)** | `16.png` | `chilli-chicken.jpg` | 84% |
| **Chicken Pakora (Starter)** | `22.png` | `chicken-pakora.jpg` | 83% |
| **Paneer Tikka (Starter)** | `14.png` | `paneer-tikka.jpg` | 97% |
| **Gajar Ka Halwa (Dessert)** | `GAJAR-KA-HALWA.png` | `gajar-halwa.jpg` | 98% |
| **Mango Lassi (Drink)** | `MANGO-LASSI.png` | `mango-lassi.jpg` | 99% |
| **Chicken Fry (Combo Part)** | `CHICKEN-FRY.png` | `chicken-fry.jpg` | 95% |

### Category Defaults Updated in `imageMap.ts`
We updated fallback references in [imageMap.ts](file:///Users/stingraj/Downloads/chowrasta-edinburgh-heritage-main%202/src/data/imageMap.ts) to use our local optimized assets:
*   `default-starter` -> `/images/menu/chicken-65.jpg`
*   `default-dessert` -> `/images/menu/gajar-halwa.jpg`

---

## 3. Left Unchanged (Confidence < 80% or Missing)
In accordance with the rule **"Do not guess. Only replace if image match confidence is 80% or higher."**, the following items were left unchanged:

1.  **Gongura Paneer Biryani:** No matching paneer biryani image found in `/newmenu`.
2.  **Chicken Lollipop Biryani:** No dedicated lollipop-on-biryani image was found.
3.  **Chicken Fry Pulao & Gongura Mutton Pulao:** No clear pulao rice variations with chicken fry or gongura mutton.
4.  **Pickles:** No pickle images present in the scraped set.
5.  **Combo Items:** These render as a split layout from individual items. Individual parts like `chicken-fry.jpg` and `mango-lassi.jpg` were successfully replaced, thereby upgrading the combo presentation.
6.  **Snacks, Fried Rice, and Drinks Categories:** Scraped images were either below confidence (e.g. `11.png` to `12.png` did not match milkshakes) or missing entirely.

---

## 4. Own Delivery & Online Ordering Section
We added a new `OwnDelivery` section to the homepage inside [index.tsx](file:///Users/stingraj/Downloads/chowrasta-edinburgh-heritage-main%202/src/routes/index.tsx), positioned after the delivery partner logos.

*   **Message:** "We do our own deliveries."
*   **Buttons:**
    *   **WhatsApp Us** — triggers a direct WhatsApp chat to `+44 7769 237464` pre-filled with: *"Hi, I'd like to place an order for delivery."*
    *   **Call Us** — triggers a phone call to `+447769237464`.
*   **Aesthetics:** Styled with gold lettering, cream typography, and a dark heritage background to match the premium restaurant theme.

### Online Delivery Platforms Typography & Links
*   **Typography Optimization:** Refined the brand font of the Uber Eats, Just Eat, and Deliveroo buttons. The font weight was simplified from `font-extrabold` (which felt visually heavy) to `font-display font-medium tracking-[0.15em] uppercase` (with tracking spaced out) to align beautifully with the elegant display fonts of the rest of the site (e.g. `CHOWRASTA / Edinburgh`).
*   **Interactive Footer Links:** Replaced the static spans in the footer's "Order Online" section with actual interactive link buttons styled with clean, matching display typography.

---

## 5. Build Verification
*   Executed `npm run build` synchronously in the project root directory.
*   **Result:** Compilation and production bundle completed successfully without any TS or linter warnings.
