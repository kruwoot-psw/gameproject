// พื้นผิวทั้งหมดวาดด้วย Canvas 2D — ไม่ต้องโหลดไฟล์รูป
import * as THREE from 'three';

const rnd = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function canvas(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  return c;
}
function speckle(g, w, h, n, colors, min, max) {
  for (let i = 0; i < n; i++) {
    g.globalAlpha = rnd(0.15, 0.5);
    g.fillStyle = pick(colors
