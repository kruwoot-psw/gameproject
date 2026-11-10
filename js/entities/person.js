import * as THREE from 'three';

const mats = {};
const mat = (c) => mats[c] || (mats[c] = new THREE.MeshLambertMaterial({ color: c }));

export function makePerson(scene, shirt, pants, hair, skin = 0xf1c27d) {
  const g = new THREE.Group();
  const part = (w, h, d, c, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
    m.position.set(x, y, z);
    m.castShadow = true;
    g.add(m);
    return m;
  };

  const limb = (w, h, d, c, x, y) => {
    const p = new THREE.Group();
    p.position.set(x, y, 0);
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
    m.position.y = -h / 2;
    m.castShadow = true;
    p.add(m);
    g.add(p);
    return p;
  };

  const legL = limb(0.32, 0.7, 0.32, pants, -0.18, 0.7);
  const legR = limb(0.32, 0.7, 0.32, pants, 0.18, 0.7);
  part(0.8, 0.8, 0.45, shirt, 0, 1.1, 0);
  const armL = limb(0.22, 0.7, 0.22, shirt, -0.52, 1.45);
  const armR = limb(0.22, 0.7, 0.22, shirt, 0.52, 1.45);
  part(0.62, 0.6, 0.58, skin, 0, 1.82, 0);
  part(0.66, 0.2, 0.62, hair, 0, 2.17, 0);
  part(0.66, 0.4, 0.12, hair, 0, 1.97, -0.29);

  g.userData = { legL, legR, armL, armR, poseUntil: 0 };
  scene.add(g);
  return g;
}