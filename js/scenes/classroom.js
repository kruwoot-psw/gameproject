import * as base from '../core/builder.js';
export function buildClassroom(scene) {
  base.box(scene, 14, 8, 8, 0xf1e3d3, 18, 0, -17);
  base.roof(scene, 15, 9, 2, 0xc0392b, 18, 8, -17);
  base.label(scene, 'อาคารเรียน', 18, 11, -17); base.solid(18, -17, 14, 8);
}
