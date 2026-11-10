import * as THREE from 'three';

export const colliders = [];
export const mapItems = [];
const mats = {};
const mat = (c) => mats[c] || (mats[c] = new THREE.MeshLambertMaterial({ color: c }));

export function addMesh(scene, geo, color, x, y, z, cast = true, receive = true) {
  const m = new THREE.Mesh(geo, mat(color));
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  scene.add(m);
  return m;
}

export function box(scene, w, h, d, c, x, y, z) {
  return addMesh(scene, new THREE.BoxGeometry(w, h, d), c, x, y + h / 2, z);
}

export function cyl(scene, rt, rb, h, c, x, y, z, seg = 16) {
  return addMesh(scene, new THREE.CylinderGeometry(rt, rb, h, seg), c, x, y + h / 2, z);
}

export function solid(x, z, w, d, mapColor) {
  colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
  if (mapColor) mapItems.push({ x, z, w, d, c: mapColor });
}

export function path(scene, x, z, w, d, c = '#e9dcc0') {
  box(scene, w, 0.04, d, c, x, 0, z).receiveShadow = true;
  mapItems.push({ x, z, w, d, c });
}

export function roof(scene, w, d, h, c, x, y, z) {
  const g = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4);
  g.rotateY(Math.PI / 4);
  const m = addMesh(scene, g, c, x, y + h / 2, z);
  m.scale.set(w, h, d);
  return m;
}

export function label(scene, text, x, y, z, bg = '#e85d04') {
  const c = document.createElement('canvas');
  const g = c.getContext('2d');
  g.font = '48px Itim, sans-serif';
  const w = Math.ceil(g.measureText(text).width) + 50;
  c.width = w; c.height = 80;
  g.font = '48px Itim, sans-serif';
  g.fillStyle = bg;
  g.beginPath();
  if (g.roundRect) g.roundRect(0, 0, w, 80, 24);
  else g.rect(0, 0, w, 80);
  g.fill();
  g.fillStyle = '#fff';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, 44);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex }));
  s.scale.set(w / 80 * 1.3, 1.3, 1);
  s.position.set(x, y, z);
  scene.add(s);
  return s;
}