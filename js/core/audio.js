let actx;
function getAudio() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === 'suspended') actx.resume();
  return actx;
}

function tone(freq, dur, type = 'sine', vol = 0.2, delay = 0) {
  const a = getAudio();
  const t = a.currentTime + delay;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur);
}

export const sfx = {
  coin() { tone(988, 0.1, 'square', 0.07); tone(1319, 0.25, 'square', 0.07, 0.08); },
  bell() { [520, 1300, 2100].forEach((f, i) => tone(f, 2.5, 'sine', 0.25 / (i + 1))); },
  pop() { tone(660, 0.12, 'triangle', 0.15); },
  fanfare() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.35, 'triangle', 0.15, i * 0.15)); }
};