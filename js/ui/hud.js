export function setupHud(game) {
  document.getElementById('startBtn').onclick = () => {
    document.getElementById('start').style.display = 'none';
    game.startAudio();
  };
}
