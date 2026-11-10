import * as base from '../core/builder.js';
export function buildLibrary(scene) {
  base.box(scene, 12, 5, 8, 0xf6e7c1, -18, 0, -7.8);
  base.roof(scene, 13, 9, 2, 0x3a6ea5, -18, 5, -7.8);
  base.label(scene, 'ห้องสมุด', -18, 8, -7.8); base.solid(-18, -7.8, 12, 8);
}
