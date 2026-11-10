// js/scenes/campus.js
import * as base from '../core/builder.js';
import { createFlagTexture } from '../core/textures.js';
import * as THREE from 'three';

export function buildCampus(scene) {
  // พื้นหญ้า
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshLambertMaterial({ color: 0x8fd16f }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // ทางเดินหลัก
  base.path(scene, 0, 0, 4, 80);
  base.path(scene, 0, 0, 80, 4);

  // เสาธง
  base.box(scene, 3, 0.4, 3, 0xffffff, 0, 0, 0);
  base.cyl(scene, 0.08, 0.1, 9, 0xf5f5f5, 0, 0.4, 0);
  base.label(scene, 'เสาธง', 0, 11, 0);
  base.solid(0, 0, 3, 3);

  const flagMat = new THREE.MeshLambertMaterial({ map: createFlagTexture(), side: THREE.DoubleSide });
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(3, 2, 10, 4), flagMat);
  flag.position.set(0.08, 8.6, 0);
  scene.add(flag);
}