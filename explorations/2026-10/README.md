# Six directions explore a new CBT homepage

Open [the comparison page](index.html) directly in a browser.
Each direction has a desktop JPG at 1440 px wide and a mobile JPG at 390 px wide.
The desktop images show the page structure. The mobile images show the opening viewport.
The mobile pages continue below the captured view.

| Direction | Visual idea |
|---|---|
| Foundation Journal | Ivory, navy and serif typography give the nonprofit an established presence. |
| Civic Signal | A precise cobalt grid presents the community as a modern network of builders. |
| Volunteer Comics | Hand-inked panels and bright colours express the energy of volunteering. |
| Open Stage | Oversized type and cultural poster compositions give the programme a bold voice. |
| Paper & People | Cinnabar paper cuts and open space give Chinese festivities a contemporary form. |
| Community Editorial | Large photographs and magazine typography put people at the centre. |

## The images use the built-in imagegen tool

The prompts define the complete webpage composition, typography, colour and imagery.
The tool generated the complete webpage images directly.
No HTML screenshot renderer or external image API created the mockups.
JPEG export only resizes and compresses the generated output.
Each JPG stays below 600,000 bytes.
[prompts.json](prompts.json) records the prompts and reference assets.

The initial decorative-background approach was rejected during review.
The selected images use new prompts for complete website designs.
The mobile viewport scope follows that review: readable text takes priority over a compressed full-page thumbnail.

## The source copy comes from the repository homepage

The source revision is `7952c83` on `origin/master`.
The desktop sequence remains hero, communities, builders, sponsors, toolbox and join.
The drafts use public introductory text and omit contract details, financial material and legal downloads.
The drafts show the six communities with Latin-script names to avoid generated Chinese lettering errors:

| Draft name | Community |
|---|---|
| ZaiGeZaiGu | 载歌在谷 |
| SMILE | SMILE 亚马逊华人协会 |
| Startup Band | 走起乐队 |
| Googirl | 谷妹艺术团 |
| DotLift (formerly Haoshiyou) | 点翼 DotLift（前身好室友） |
| T-Group Oneness | T-Group Oneness |

The reference assets are the original CBT logo, 2018 gala cast photograph,
2022 singing contest group photograph and 2019 gala audience photograph.
The model renders those references inside the concepts; the mockups do not establish pixel identity.
The production implementation must use the original image files directly to preserve faces and the logo exactly.
These files are visual concepts for review, not production assets or a final copy proof.

## The exploration stays separate from the live website

The `visual-explorations` branch contains the exploration files.
The production homepage, Chinese homepage and site stylesheet remain unchanged.
The comparison page needs no build step, remote font or network request.
Each preview scrolls independently and links to its full-size JPG.

```
2026-10/
├── index.html
├── README.md
├── prompts.json
├── manifest.json
└── <direction>/
    ├── desktop.jpg
    └── mobile.jpg
```
