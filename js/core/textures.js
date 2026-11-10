import * as THREE from 'three';

export function createFlagTexture() {
  const fc = document.createElement('canvas');
  fc.width = 300; fc.height = 200;
  const fx = fc.getContext('2d');
  [['#A51931', 0, 1], ['#F4F5F8', 1, 1], ['#2D2A4A', 2, 2], ['#F4F5F8', 4, 1], ['#A51931', 5, 1]]
    .forEach(([c, s, n]) => {
      fx.fillStyle = c;
      fx.fillRect(0, s * 200 / 6, 300, n * 200 / 6);
    });
  const tex = new THREE.CanvasTexture(fc);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}