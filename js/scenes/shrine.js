import * as base from '../core/builder.js';
export function buildShrine(scene) {
  base.box(scene, 10, 0.6, 8, 0xf5f0e6, 0, 0, -18.5);
  base.roof(scene, 9, 7, 2, 0xc0392b, 0, 3, -18.5);
  base.label(scene, 'หอพระ', 0, 6, -18.5); base.solid(0, -18.5, 10, 8);
}
