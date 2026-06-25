# Menu Image Replacement Report

Date: 2026-06-17

Rule applied: if confidence was below 80 percent, the current image was left unchanged.

| Menu Item | Assigned Image | Confidence Level | Missing Matches |
| --- | --- | --- | --- |
| Hyderabad Chicken Dum Biryani | Current image unchanged | 42% | No exact chicken dum biryani image found in `/newmenu`; numbered biryani images did not clearly identify this specific dish. |
| Hyderabad Mutton Biryani | `/images/menu/hyderabad-mutton-biryani.jpg` from `37.png` | 91% | - |
| Chicken Fry Piece Biryani | `/images/menu/chicken-fry-piece-biryani.jpg` from `34.png` | 86% | - |
| Chicken 65 Biryani | `/images/menu/chicken-65-biryani.jpg` from `30.png` | 90% | - |
| Gongura Chicken Biryani | Current image unchanged | 63% | No clearly labeled or visually certain gongura chicken biryani match. |
| Pulav Rice with Chicken Fry | Current image unchanged | 58% | No exact pulav-with-chicken-fry image found; closest matches looked like biryani or curry rice dishes. |
| Pulav Rice with Mutton Curry | `/images/menu/pulav-rice-with-mutton-curry.jpg` from `41.png` | 85% | - |
| Pulav Rice with Gongura Mutton Curry | Current image unchanged | 54% | No clearly certain gongura mutton curry over pulav image found. |
| Chicken 65 | Current image unchanged | 77% | Requested `Chicken_2065.jpg` was not present; closest dry chicken starters were not certain enough to replace. |
| Butter Garlic Chicken | Current image unchanged | 26% | `BUTTER-CHICKEN.png` was a butter chicken curry, not butter garlic chicken. |
| Chicken Tandoori | Current image unchanged | 74% | Closest grilled chicken images included rice or did not clearly match a standalone tandoori starter. |
| Chicken Lollipop | `/images/menu/chicken-lollipop.jpg` from `25.png` | 96% | - |
| Chicken Tikka | `/images/menu/chicken-tikka.jpg` from `19.png` | 93% | - |
| Chilli Chicken | `/images/menu/chilli-chicken.jpg` from `16.png` | 84% | - |
| Chicken Pakora | `/images/menu/chicken-pakora.jpg` from `22.png` | 83% | - |
| Chicken Manchurian | Current image unchanged | 76% | Closest Indo-Chinese dry chicken image was not distinct enough from chilli chicken to confirm. |
| Mutton Sukha | Current image unchanged | 22% | No mutton sukha image found; fallback suggestions were unrelated or too uncertain. |
| Paneer Tikka | `/images/menu/paneer-tikka.jpg` from `14.png` | 97% | - |
| Mirchi Bajji (3) | Current image unchanged | 0% | Requested `Mirchi_20Bajji.jpg` was not present and no exact mirchi bajji image was found. |
| Egg Bonda (4) | Current image unchanged | 0% | Requested `Mysore_20Bonda.jpg` was not present and no exact egg bonda image was found. |
| Aloo Samosa Big (2) | Current image unchanged | 0% | `25.png` was chicken lollipop, not samosa. |
| Meat Samosa (5) | Current image unchanged | 0% | `25.png` was chicken lollipop, not samosa. |
| Veg Spring Rolls (5) | Current image unchanged | 0% | `26.png` was a grilled chicken dish, not spring rolls. |
| Meat Spring Rolls (5) | Current image unchanged | 0% | `26.png` was a grilled chicken dish, not spring rolls. |
| Veg Fried Rice | Current image unchanged | 0% | `33.png` showed a biryani-style rice dish, not veg fried rice. |
| Mushroom Fried Rice | Current image unchanged | 0% | `34.png` showed a chicken rice dish, not mushroom fried rice. |
| Paneer Fried Rice | Current image unchanged | 18% | `35.png` showed paneer over biryani-style rice, not paneer fried rice. |
| Egg Fried Rice | Current image unchanged | 0% | Requested `Egg_20Biryani.jpg` was not present and no egg fried rice image was found. |
| Chicken Egg Fried Rice | Current image unchanged | 0% | `39.png` showed egg biryani, not chicken egg fried rice. |
| Schezwan Veg Fried Rice | Current image unchanged | 0% | `40.png` showed a biryani-style rice dish, not Schezwan veg fried rice. |
| Schezwan Egg Fried Rice | Current image unchanged | 0% | `41.png` showed mutton curry over rice, not Schezwan egg fried rice. |
| Schezwan Chicken Fried Rice | Current image unchanged | 0% | `42.png` showed a curry-topped rice dish, not Schezwan chicken fried rice. |
| Keema Rice | Current image unchanged | 0% | `43.png` showed paneer curry over rice, not keema rice. |
| Gulab Jamun | Current image unchanged | 0% | Requested `Gulab_20Jamun.jpg` was not present and no exact gulab jamun image was found. |
| Gajar Ka Halwa | `/images/menu/gajar-halwa.jpg` from `GAJAR-KA-HALWA.png` | 98% | - |
| Mango Lassi | `/images/menu/mango-lassi.jpg` from `MANGO-LASSI.png` | 99% | - |
| Oreo Milk Shake | Current image unchanged | 0% | `11.png` showed a pale dessert bowl, not an Oreo milkshake. |
| Snicker Milkshake | Current image unchanged | 0% | `12.png` showed gajar halwa, not a Snicker milkshake. |
| Biscoff Milkshake | Current image unchanged | 0% | `10.png` showed a syrup dessert bowl, not a Biscoff milkshake. |
| Kinder Bueno Milkshake | Current image unchanged | 0% | `9.png` showed an ice cream sundae, not a milkshake. |
| Ferrero Rocher Milkshake | Current image unchanged | 0% | `8.png` showed an ice cream sundae, not a milkshake. |
| Strawberry Milkshake | Current image unchanged | 0% | `7.png` showed an ice cream sundae, not a strawberry milkshake. |

Additional site image update:

| Menu Item | Assigned Image | Confidence Level | Missing Matches |
| --- | --- | --- | --- |
| Chicken Fry + Hyderabad Dum Biryani Combo image part | `/images/menu/chicken-fry.jpg` from `CHICKEN-FRY.png` | 95% | - |

Notes:

- Lazy loading was already enabled in the shared `ImageWithFallback` component, so no code change was required for that rule.
- Menu category tabs in this checkout do not render separate category images, so the requested category-image replacements were not applicable in the current UI.
- Ignored non-food assets included logos, banners, mojitos, bread images, icons, and SVGs from `/newmenu`.
