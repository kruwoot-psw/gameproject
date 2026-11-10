import { sfx } from '../core/audio.js';
import { speak } from '../core/voice.js';

export const places = [
  { id: 'flag', name: 'เสาธง', icon: '🇹🇭', x: 0, z: 0, r: 4.5,
    text: 'ลานเข้าแถวเคารพธงชาติทุกเช้าเวลา 8:00 น.',
    actions: [{ label: 'เคารพธง 🇹🇭', fn: () => { sfx.pop(); speak('ยืนตรงเคารพธงชาติ'); } }] },
  { id: 'shrine', name: 'หอพระ', icon: '🙏', x: 0, z: -18.5, r: 3.5,
    text: 'หอพระประจำโรงเรียน สำหรับไหว้พระขอพร',
    actions: [{ label: 'ไหว้พระ 🙏', fn: (game) => { game.player.userData.poseUntil = performance.now()/1000 + 2; sfx.bell(); speak('สาธุ ขอให้โชคดี'); } }] },
  { id: 'drink', name: 'ร้านน้ำ', icon: '🧋', x: -16, z: 5.4, r: 3.2,
    text: 'ร้านน้ำป้าแดง สดชื่นคลายร้อน',
    actions: [{ label: 'ซื้อน้ำ (5 เหรียญ)', fn: (game) => {
      if (game.coins < 5) return game.toast('เหรียญไม่พอ');
      game.coins -= 5; game.boostUntil = performance.now()/1000 + 10; sfx.coin(); game.updateHud(); game.toast('สดชื่น เดินเร็วขึ้น!');
    } }] },
  { id: 'canteen', name: 'โรงอาหาร', icon: '🍜', x: 18, z: 0.5, r: 6,
    text: 'โรงอาหารกลาง อิ่มอร่อยราคานักเรียน',
    actions: [{ label: 'ซื้อข้าว (10 เหรียญ)', fn: (game) => {
      if (game.coins < 10) return game.toast('เหรียญไม่พอ');
      game.coins -= 10; sfx.coin(); game.updateHud(); game.toast('อิ่มอร่อยมาก!');
    } }] },
  { id: 'library', name: 'ห้องสมุด', icon: '📚', x: -18, z: -7.8, r: 3.5,
    text: 'แหล่งค้นคว้าหาความรู้ เงียบสงบ',
    actions: [{ label: 'ยืมหนังสือ 📖', fn: (game) => { sfx.pop(); game.toast('ยืมหนังสือสำเร็จ'); } }] },
  { id: 'classroom', name: 'อาคารเรียน', icon: '🏫', x: 18, z: -17, r: 5,
    text: 'ตึกเรียนรวม 3 ชั้น บรรยากาศวิชาการ',
    actions: [{ label: 'เข้าห้องเรียน 📝', fn: (game) => { game.openQuiz(); } }] },
  { id: 'sport', name: 'สนามฟุตบอล', icon: '⚽', x: -22, z: -22, r: 8,
    text: 'สนามหญ้ากว้างขวางสำหรับเล่นกีฬา',
    actions: [{ label: 'เตะบอล ⚽', fn: (game) => { sfx.pop(); game.toast('โกล! ยิงเข้าแล้ว'); } }] },
  { id: 'science', name: 'ตึกวิทยาศาสตร์', icon: '🧪', x: -22, z: 18, r: 5,
    text: 'ห้องทดลองและโครงงานวิทย์',
    actions: [{ label: 'ทดลองวิทย์ 🔬', fn: (game) => { sfx.pop(); game.toast('สนุกจังเลย'); } }] },
  { id: 'art', name: 'ตึกศิลปะ', icon: '🎨', x: 18, z: 18, r: 5,
    text: 'ห้องวาดภาพและงานประดิษฐ์',
    actions: [{ label: 'วาดรูป 🖌️', fn: (game) => { sfx.pop(); game.toast('ผลงานสวยงามมาก'); } }] },
  { id: 'music', name: 'ห้องดนตรี', icon: '🎵', x: 0, z: 22, r: 4,
    text: 'ห้องซ้อมดนตรีไทยและสากล',
    actions: [{ label: 'ฟังเพลง 🎶', fn: (game) => { sfx.pop(); game.toast('เพลิดเพลินเสียงดนตรี'); } }] },
  { id: 'garden', name: 'สวนพฤกษศาสตร์', icon: '🌳', x: -8, z: -28, r: 5,
    text: 'ร่มรื่นเต็มไปด้วยพรรณไม้นานาชนิด',
    actions: [{ label: 'พักผ่อน 🌿', fn: (game) => { sfx.pop(); game.toast('สูดอากาศบริสุทธิ์'); } }] },
  { id: 'parking', name: 'ลานจอดรถ', icon: '🚲', x: 25, z: -28, r: 5,
    text: 'ที่จอดจักรยานและรถจักรยานยนต์',
    actions: [{ label: 'ตรวจรถ 🚲', fn: (game) => { sfx.pop(); game.toast('เรียบร้อยดี'); } }] }
];