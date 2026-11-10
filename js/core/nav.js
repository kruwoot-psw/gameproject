import { colliders } from './builder.js';

export class Navigator {
  constructor() {
    this.path = [];
    this.target = null;
  }

  setTarget(startX, startZ, targetX, targetZ) {
    this.target = { x: targetX, z: targetZ };
    // จำลองเส้นทางตรงหรือจุดแวะง่าย ๆ สำหรับเดโม
    this.path = [{ x: targetX, z: targetZ }];
  }

  clear() {
    this.path = [];
    this.target = null;
  }

  update(player, dt, speed, tryMoveCb) {
    if (this.path.length === 0) return false;
    const currentTarget = this.path[0];
    const dx = currentTarget.x - player.position.x;
    const dz = currentTarget.z - player.position.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 0.5) {
      this.path.shift();
      if (this.path.length === 0) this.target = null;
      return false;
    }

    const vx = (dx / dist) * speed * dt;
    const vz = (dz / dist) * speed * dt;
    tryMoveCb(vx, vz);
    player.rotation.y = Math.atan2(dx, dz);
    return true;
  }
}