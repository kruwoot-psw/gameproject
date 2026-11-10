import * as base from '../core/builder.js';
export function buildCanteen(scene) {
  base.box(scene, 12, 4, 10, 0xf4a261, 18, 0, 0.5);
  base.roof(scene, 13, 11, 2, 0xe76f51, 18, 4, 0.5);
  base.label(scene, 'โรงอาหาร', 18, 7, 0.5); base.solid(18, 0.5, 12, 10);
}
