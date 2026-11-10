import * as THREE from 'three';
import { makePerson } from './entities/person.js';
import { places } from './data/places.js';
import { Navigator } from './core/nav.js';
import { sfx } from './core/audio.js';
import { speak, toggleVoice } from './core/voice.js';
import { buildCampus } from './scenes/campus.js';
import { buildShrine } from './scenes/shrine.js';
import { buildLibrary } from './scenes/library.js';
import { buildClassroom } from './scenes/classroom.js';
import { buildCanteen } from './scenes/canteen.js';
import { buildDrinkShop } from './scenes/drinkshop.js';
import { setupHud } from './ui/hud.js';
import { setupMap } from './ui/map.js';

class SchoolGame {
  constructor() {
    this.coins = 20;
    this.merit = 0;
    this.boostUntil = 0;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.prepend(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaee0ff);
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 300);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x7fae6a, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(20, 40, 20);
    sun.castShadow = true;
    this.scene.add(sun);

    this.navigator = new Navigator();
    this.initScenes();
    this.player = makePerson(this.scene, 0xffffff, 0x1d3557, 0x222222);
    this.player.position.set(0, 0, 15);

    setupHud(this);
    setupMap(this);
    this.initEvents();
    this.clock = new THREE.Clock();
    this.animate();
  }

  initScenes() {
    buildCampus(this.scene);
    buildShrine(this.scene);
    buildLibrary(this.scene);
    buildClassroom(this.scene);
    buildCanteen(this.scene);
    buildDrinkShop(this.scene);
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.getElementById('btnVoice').onclick = (e) => {
      const state = toggleVoice();
      e.target.textContent = `เสียงพากย์: ${state ? 'เปิด' : 'ปิด'}`;
    };
  }

  startAudio() {
    sfx.pop();
  }

  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  }

  updateHud() {
    document.getElementById('coins').textContent = `🪙 ${this.coins}`;
    document.getElementById('merit').textContent = `🙏 ${this.merit}`;
  }

  openQuiz() {
    document.getElementById('dTitle').textContent = 'คำถามทดสอบความรู้';
    document.getElementById('dText').textContent = 'ประเทศไทยมีกี่จังหวัด?';
    const btns = document.getElementById('dBtns');
    btns.innerHTML = '';
    ['76 จังหวัด', '77 จังหวัด'].forEach((txt, idx) => {
      const b = document.createElement('button');
      b.textContent = txt;
      b.style.background = '#2a9d8f';
      b.onclick = () => {
        if (idx === 1) {
          this.coins += 10;
          this.toast('ถูกต้อง! +10 เหรียญ');
        } else {
          this.toast('ผิด ลองใหม่นะ');
        }
        this.updateHud();
        document.getElementById('dialog').classList.remove('show');
      };
      btns.appendChild(b);
    });
    document.getElementById('dialog').classList.add('show');
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const dt = Math.min(this.clock.getDelta(), 0.05);

    // อัปเดตการเคลื่อนที่อัตโนมัติหากกดพาไป
    this.navigator.update(this.player, dt, 5, (vx, vz) => {
      this.player.position.x += vx;
      this.player.position.z += vz;
    });

    // กล้องติดตามตัวละคร
    const p = this.player.position;
    this.camera.position.set(p.x, p.y + 8, p.z + 12);
    this.camera.lookAt(p.x, p.y + 1, p.z);

    this.renderer.render(this.scene, this.camera);
  }
}

new SchoolGame();