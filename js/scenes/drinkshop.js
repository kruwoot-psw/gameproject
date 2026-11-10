import * as base from '../core/builder.js';
export function buildDrinkShop(scene) {
  base.box(scene, 6, 3, 4, 0xf1faee, -16, 0, 5.4);
  base.label(scene, 'ร้านน้ำ', -16, 4, 5.4); base.solid(-16, 5.4, 6, 4);
}
