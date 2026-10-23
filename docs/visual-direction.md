# Visual direction


Selected references:

- Engine/theming principles, https://dithercn.dev/docs

Use their relevant principles rather than the whole catalog: a shared ordered Bayer cell grid, restrained two-tone globe shading, crisp density/hatched grade graphics, and selectable real ASCII characters. Keep labels and evidence as real accessible HTML. Use Hermes theme tokens instead of a hardcoded dark palette. Hide/unmount must stop work; reduced motion must preserve all information.

Implementation direction:

- A custom compact Three.js globe with geographic land dots, ordered-dither spherical shading, country clusters, and country/site selection.
- A real ASCII world projection generated from Natural Earth geography. Grade glyphs and a nearby textual list make it functional without WebGL.
- A terminal command strip with only declared local commands. It never evaluates shell or JavaScript.
- Registration marks, boxed source labels, thin rule grid, readable monospace headings, and dither density bars. No decorative fake detections, random counters, or a scanline filter over text.
- Theme-aware native controls. Restrained semantic grade colors, explicitly labeled public/private contexts, and visible DB-IP attribution.

Do not import Pixi, a second postprocessing engine, or a gallery of GPU effects. The library survey informs a deliberate interface, not a dependency collection. This project uses Three.js under its MIT license. No source code from the reference catalog or proprietary design assets is copied.
